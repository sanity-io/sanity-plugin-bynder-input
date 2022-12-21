> This is a **Sanity Studio v3** plugin.
> For the v2 version, please refer to the [v2 version](https://github.com/sanity-io/sanity-plugin-bynder-input/tree/studio-v2).

# Sanity + Bynder = 🌁

![bynder demo](https://user-images.githubusercontent.com/38528/120554854-1ee5c580-c3af-11eb-9b05-0b35c6810497.gif)


This plugin adds your familiar Bynder user inferface in the Sanity Studio, letting you pick any asset you are managing on Bynder and still serve it from Bynder in your frontends.

## Installation

```bash
npm install bynder-input
```

## Usage

Add `bynderInputPlugin` to `plugins` in `sanity.config.ts` (or.js) and specify your Bynder portal domain. 
You can also specify which language you want the Bynder widget UI to render.

```
 import {defineConfig} from 'sanity'
 import {bynderInputPlugin} from 'sanity-plugin-bynder-input'

 export const defineConfig({
    // ... other config
    plugins: [
      bynderInputPlugin(
        {
          portalDomain: "https://wave-trial.getbynder.com/",
          language: "en_US"
        }
      )
    ]
 })
```

## Specifying asset types
The default selectable asset types are `image`, `audio`, `video` and `document`. 
You can restrict a field to one or more types with the `assetTypes` option in your schema. 
If you do not specify options all asset types will be available for selection.

Here is an example of a document that has one Bynder asset field restricted to only images, and another which can be either a video or an audio file.

```javascript
 import {defineType, defineField} from 'sanity'

export const myDocumentSchema = defineType({
  type: "document",
  name: "article",
  fields: [
    defineField({
      type: "bynder.asset",
      name: "image",
      options: {
        assetTypes: ["image"]
      }
    }),
    defineField({
      type: "bynder.asset",
      name: "temporalMedia",
      options: {
        assetTypes: ["video", "audio"]
      }
    })
  ]
})
```


## License

[MIT](LICENSE) © Sanity.io


## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

### Release new version

Run ["CI & Release" workflow](https://github.com/sanity-io/sanity-plugin-bynder-input/actions/workflows/main.yml).
Make sure to select the main branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.
