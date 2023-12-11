import { BynderDiff } from '../components/BynderDiff';
import { defineType, ObjectDefinition, ObjectOptions } from 'sanity';

const bynderAssetSchemaName = 'bynder.asset' as const;

export interface BynderAssetOptions extends ObjectOptions {
  assetTypes?: ('image' | 'video' | 'audio' | string)[];
}

/**
 * @public
 */
export interface BynderAssetDefinition
  extends Omit<ObjectDefinition, 'type' | 'fields' | 'options'> {
  type: typeof bynderAssetSchemaName;
  options?: BynderAssetOptions;
}

declare module 'sanity' {
  // makes type: 'bynder.asset' narrow correctly when using defineType/defineField/defineArrayMember
  export interface IntrinsicDefinitions {
    'bynder.asset': BynderAssetDefinition;
  }
}

export interface BynderAssetValue {
  _type: typeof bynderAssetSchemaName;
  _key?: string;
  id?: string;
  name?: string;
  databaseId?: string;
  type?: string;
  previewUrl?: string;
  previewImg?: string;
  datUrl?: string;
  description?: string;
  aspectRatio?: number;
  videoUrl?: string;
  url?: string;
}

export const bynderAssetSchema = defineType({
  name: bynderAssetSchemaName,
  type: 'object',
  title: 'Bynder Asset',
  fields: [
    {
      type: 'string',
      name: 'id',
    },
    {
      type: 'string',
      name: 'name',
    },
    {
      type: 'string',
      name: 'databaseId',
    },
    {
      type: 'string',
      name: 'type',
    },
    {
      type: 'string',
      name: 'previewUrl',
    },
    {
      type: 'string',
      name: 'previewImg',
    },
    {
      type: 'string',
      name: 'datUrl',
    },
    {
      type: 'string',
      name: 'description',
    },
    {
      type: 'number',
      name: 'aspectRatio',
    },
    {
      type: 'string',
      name: 'videoUrl',
    },
    {
      type: 'string',
      name: 'url',
    },
  ],
  components: {
    diff: BynderDiff,
  },
});
