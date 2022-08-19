import React from 'react';
import { loadBynder } from '../utils';
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent';
import pluginConfig from 'config:bynder-input';
import ButtonGrid from 'part:@sanity/components/buttons/button-grid';
import Button from 'part:@sanity/components/buttons/default';
import Fieldset from 'part:@sanity/components/fieldsets/default';
import VideoPlayer from './VideoPlayer';

declare global {
  interface Window {
    BynderCompactView: any;
  }
}

type Props = {
  type: Record<string, any>;
  onChange: any;
  value: Record<string, any>;
  level: number;
  readOnly: boolean;
  markers: any[];
};

const BynderInput = (props: Props) => {
  const removeValue = () => {
    const { onChange } = props;
    onChange(PatchEvent.from([unset()]));
  };

  const getPreviewUrl = (asset: Props['type']) => {
    switch (asset.type) {
      case 'VIDEO':
        return asset.previewUrls[0];
      default:
        return asset.files.webImage.url;
    }
  };

  const getVideoUrl = (asset: Props['type']) => {
    if (asset.type === 'VIDEO') {
      // if original asset is available (public videos only) use that if not fall back to the preview url
      return asset.files?.original?.url ?? asset.previewUrls[0];
    }
    return null;
  };

  const getAspectRatio = (dimensions: {
    width: number;
    height: number;
  }): number => dimensions.height / dimensions.width;

  const openMediaSelector = () => {
    const { onChange, type, value } = props;
    const onSuccess = (assets: any[]) => {
      const asset = assets[0];
      const webImage = asset.files.webImage;

      const aspectRatio = getAspectRatio({
        width: webImage.width,
        height: webImage.height,
      });
      onChange(
        PatchEvent.from([
          set({
            _key: value?._key,
            _type: type.name,
            id: asset.id,
            name: asset.name,
            databaseId: asset.databaseId,
            type: asset.type,
            previewUrl: getPreviewUrl(asset),
            previewImg: webImage.url,
            datUrl: asset.files.transformBaseUrl?.url,
            videoUrl: getVideoUrl(asset),
            description: asset.description,
            aspectRatio,
          }),
        ])
      );
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

    const { assetTypes } = type.options;
    if (assetTypes) {
      options.assetTypes = assetTypes;
    }

    loadBynder(() => {
      window.BynderCompactView.open(options);
    });
  };

  const { value, type, markers, level, readOnly } = props;

  let preview;
  if (value) {
    if (value.type === 'VIDEO') {
      preview = (
        <VideoPlayer
          controls
          poster={value.previewImg}
          sources={[{ src: value.previewUrl }]}
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
      // TODO: Add preview for document / audio types and empty state
    }
  }

  return (
    <Fieldset
      markers={markers}
      //presence={presence.filter(item => item.path[0] === '$' || isInside.includes(item.identity))}
      legend={type.title}
      description={type.description}
      level={level}
    >
      <div style={{ textAlign: 'center' }}>{preview}</div>

      <ButtonGrid align="start">
        <Button
          disabled={readOnly}
          inverted
          title="Select an asset"
          kind="default"
          onClick={openMediaSelector}
        >
          Browse
        </Button>
        <Button
          disabled={readOnly || !value}
          color="danger"
          inverted
          title="Remove asset"
          onClick={removeValue}
        >
          Remove
        </Button>
      </ButtonGrid>
    </Fieldset>
  );
};

export default BynderInput;
