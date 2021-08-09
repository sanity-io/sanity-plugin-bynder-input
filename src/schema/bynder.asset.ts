import BynderInput from '../components/BynderInput';
import BynderDiff from '../components/BynderDiff';

export default {
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
  ],
  inputComponent: BynderInput,
  diffComponent: BynderDiff,
  /*
  preview: {
    select: {
      playbackId: 'asset.playbackId',
      status: 'asset.status',
      duration: 'asset.data.duration',
      thumbTime: 'asset.thumbTime',
      filename: 'asset.filename'
    },
    component: Preview
  }
  */
};
