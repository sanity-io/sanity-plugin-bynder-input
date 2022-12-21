import React from 'react';
import { definePlugin, isObjectInputProps, SchemaType } from 'sanity';
import { BynderConfig, BynderInput } from './components/BynderInput';
import { bynderAssetSchema, BynderAssetValue } from './schema/bynder.asset';

export const bynderInputPlugin = definePlugin(
  (config: Partial<BynderConfig>) => {
    const reqConfig: BynderConfig = {
      portalDomain: '',
      language: 'en_US',
      ...config,
    };

    return {
      name: 'bynder-assets',
      schema: {
        types: [bynderAssetSchema],
      },
      form: {
        components: {
          input: (props) => {
            if (
              isObjectInputProps(props) &&
              isType(props.schemaType, bynderAssetSchema.name)
            ) {
              return (
                <BynderInput
                  {...props}
                  value={props.value as BynderAssetValue}
                  pluginConfig={reqConfig}
                />
              );
            }
            return props.renderDefault(props);
          },
        },
      },
    };
  }
);

function isType(schemaType: SchemaType, name: string): boolean {
  if (schemaType.name === name) {
    return true;
  }
  if (schemaType.type) {
    return isType(schemaType.type, name);
  }
  return false;
}
