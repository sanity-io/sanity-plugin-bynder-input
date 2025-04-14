import React from 'react';
import { loadBynder } from '../utils';
import { ObjectInputProps, PatchEvent, set, unset } from 'sanity';
import VideoPlayer from './VideoPlayer';
import { Box, Button, Flex } from '@sanity/ui';
import { BynderAssetValue } from '../schema/bynder.asset';
import RiveAnimationPreview from './RiveAnimationPreview';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    BynderCompactView: any;
  }
}

export interface BynderConfig {
  portalDomain: string;
  language: 'en_US' | string;
}

export interface BynderInputProps extends ObjectInputProps<BynderAssetValue> {
  pluginConfig: BynderConfig;
}

export function BynderInput(props: BynderInputProps) {
  const { value, readOnly, schemaType, pluginConfig, onChange } = props;
  const removeValue = () => {
    onChange(PatchEvent.from([unset()]));
  };

  const getPreviewUrl = (asset: Record<string, any>) => {
    switch (asset.type) {
      case 'VIDEO':
        return asset.previewUrls[0];
      default:
        return asset.files.webImage ? asset.files.webImage.url : null;
    }
  };

  const getVideoUrl = (asset: Record<string, any>) => {
    if (asset.type === 'VIDEO') {
      // if original asset is available (public videos only) use that if not fall back to the preview url
      return asset.files?.original?.url ?? asset.previewUrls[0];
    }
    return null;
  };

  const getImageAspectRatio = (dimensions: {
    width: number;
    height: number;
  }): number => dimensions.height / dimensions.width;

  const getAspectRatio = (previewImageUrl: string) =>
    new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        resolve(
          getImageAspectRatio({
            width: img.width,
            height: img.height,
          })
        );
      };
      img.onerror = (err) => reject(err);

      img.src = previewImageUrl;
    });

  const openMediaSelector = () => {
    const onSuccess = (assets: Record<string, any>[]) => {
      const asset = assets[0];
      const webImage = asset.files.webImage;
      const aspectRatio = webImage
        ? getImageAspectRatio({
            width: webImage.width,
            height: webImage.height,
          })
        : null;
      const mediaData = {
        _key: value?._key,
        _type: schemaType.name,
        id: asset.id,
        name: asset.name,
        databaseId: asset.databaseId,
        type: asset.type,
        previewUrl: getPreviewUrl(asset),
        previewImg: webImage ? webImage.url : null,
        datUrl: asset.files.transformBaseUrl
          ? asset.files.transformBaseUrl.url
          : null,
        originalUrl: asset.originalUrl,
        videoUrl: getVideoUrl(asset),
        description: asset.description,
        thumbnailUrl: asset.files.thumbnail ? asset.files.thumbnail.url : null,
        aspectRatio,
        width: webImage.width,
        height: webImage.height,
        // If Bynder supported mimeType in the schema, we could set it here
        //mimeType: webImage.mimeType,
      };
      if (
        (asset.type === 'VIDEO' ||
          (asset.type === 'DOCUMENT' && asset.type.endsWith('.riv'))) &&
        !!webImage
      ) {
        getAspectRatio(webImage.url)
          .then((ratio) => {
            onChange(
              PatchEvent.from([set({ ...mediaData, aspectRatio: ratio })])
            );
          })
          .catch((err) => {
            // aspect ratio couldn't be set, but should still set the rest of the data
            // eslint-disable-next-line no-console
            console.error('Error setting video aspect ratio:', err);
            onChange(PatchEvent.from([set(mediaData)]));
          });
      } else {
        onChange(PatchEvent.from([set(mediaData)]));
      }
    };
    const options: Record<string, any> = {
      language: pluginConfig.language || 'en_US',
      portal: {
        url: pluginConfig.portalDomain,
      },
      theme: {
        colorPrimary: '#156dff',
        colorButtonPrimary: '#156dff',
      },
      mode: 'SingleSelectFile',
      onSuccess,
    };

    const { assetTypes, assetFilter } = schemaType.options;
    if (assetTypes) {
      options.assetTypes = assetTypes;
    }

    if (assetFilter) {
      options.assetFilter = assetFilter;
    }

    loadBynder(() => {
      window.BynderCompactView.open(options);
    });
  };

  let preview;
  if (value) {
    if (value.type === 'VIDEO') {
      preview = (
        <VideoPlayer
          controls
          poster={value.previewImg}
          sources={[{ src: value.previewUrl ?? '' }]}
        />
      );
    }
    if (value.type === 'IMAGE') {
      preview = (
        <img
          alt="preview"
          src={value.previewUrl}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      );
    }
    if (
      value.type === 'DOCUMENT' &&
      value.originalUrl &&
      value.originalUrl?.endsWith('.riv')
    ) {
      if (value.previewUrl && value.aspectRatio) {
        preview = (
          <RiveAnimationPreview
            riveUrl={value.originalUrl}
            previewImg={value.previewUrl}
            aspectRatio={value.aspectRatio}
          />
        );
      }
    }
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>{preview}</div>
      <Flex gap={2} style={{ width: '100%' }}>
        <Box flex={1}>
          <Button
            style={{ width: '100%' }}
            disabled={readOnly}
            mode="ghost"
            text={'Browse'}
            title="Select an asset"
            onClick={openMediaSelector}
          />
        </Box>
        <Box flex={1}>
          <Button
            style={{ width: '100%' }}
            disabled={readOnly || !value}
            tone="critical"
            mode="ghost"
            text={'Remove'}
            title="Remove asset"
            onClick={removeValue}
          />
        </Box>
      </Flex>
    </>
  );
}
