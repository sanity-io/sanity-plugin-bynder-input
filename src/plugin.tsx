import React from 'react';
import { definePlugin, isObjectInputProps, SchemaType } from 'sanity';
import { BynderConfig, BynderInput } from './components/BynderInput';
import { bynderAssetSchema } from './schema/bynder.asset';

export const bynderAssets = definePlugin((config: BynderConfig) => {
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
            return <BynderInput {...props} pluginConfig={config} />;
          }
          return props.renderDefault(props);
        },
      },
    },
  };
});

function isType(schemaType: SchemaType, name: string): boolean {
  if (schemaType.name === name) {
    return true;
  }
  if (schemaType.type) {
    return isType(schemaType.type, name);
  }
  return false;
}
