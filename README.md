# Sanity + Bynder = 🌁

![bynder demo](https://user-images.githubusercontent.com/38528/120554854-1ee5c580-c3af-11eb-9b05-0b35c6810497.gif)


This is a custom input component enabling your familiar Bynder user inferface in Sanity Studio, letting you pick any asset you are managing on Bynder and still serve it from Bynder in your frontends.

## Installation

```bash
sanity install bynder-input
```

This adds `bynder-input` to the plugins array of your sanity.json config and installs this npm module. You can also do those steps manually.

## Configuration

Edit or create `config/bynder-input.json` in your Studio folder and add your Bynder portal domain. You can also specify which language you want the Bynder widget UI to render.

```json
{
  "portalDomain": "https://wave-trial.getbynder.com/",
  "language": "en_US"
}
```

## Specifying asset types
The default selectable asset types are `image`, `audio`, `video` and `document`. You can restrict a field to one or more types with the `assetTypes` option in your schema. If you do not specify options all asset types will be available for selection.

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
