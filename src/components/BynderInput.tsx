import React from 'react';
import { loadBynder } from '../utils';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';
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

  const getPreviewUrl = (asset: Record<string, any>) => {
    switch (asset.type) {
      case 'VIDEO':
        return asset.previewUrls[0];
      default:
        return asset.files.webImage.url;
    }
  };

  const openMediaSelector = () => {
    const { onChange, type } = props;
    const onSuccess = (assets: any[], additionalInfo: Record<string, any>) => {
      console.log(additionalInfo);
      const asset = assets[0];
      const previewUrl = getPreviewUrl(asset);
      onChange(
        PatchEvent.from([
          set({
            _type: type.name,
            id: asset.id,
            name: asset.name,
            databaseId: asset.databaseId,
            type: asset.type,
            previewUrl,
            previewImg: asset.files.webImage.url,
            datUrl: asset.files.transformBaseUrl?.url,
            description: asset.description,
          }),
        ])
      );
    };

    const options: Record<string, any> = {
      language: pluginConfig.language || 'en_US',
      defaultDomain: pluginConfig.portalDomain,
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
    } else {
      preview = (
        <img
          alt="preview"
          src={value.previewUrl}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      );
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
