import { BynderDiff } from '../components/BynderDiff';
import { defineType } from 'sanity';

export const bynderAssetSchema = defineType({
  name: 'bynder.asset',
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
  ],
  components: {
    diff: BynderDiff,
  },
});
