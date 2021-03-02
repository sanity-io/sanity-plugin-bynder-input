## Specifying asset types
The default selectable asset types are `image`, `audio`, `video` and `document`. You can restrict a field to one or more types with the `assetTypes` option in your schema.

Here is an example of a document that has one Bynder asset field restricted to only images, and another which can be either a video or an audio file.

```javascript
export default {
  type: "document",
  name: "article",
  fields: [
    {
      type: "bynder.asset",
      name: "image",
      options: {
        assetTypes: ["image"]
      }
    },
    {
      type: "bynder.asset",
      name: "temporalMedia",
      options: {
        assetTypes: ["video", "audio"]
      }
    }
  ]
}
```