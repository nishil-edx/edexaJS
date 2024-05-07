# edeXa js

This repository contains the `edexa.js` client library. `edexa.js` makes it easy for developers, who may not be deeply familiar with smart contract development, to interact with the various components of Edexa Network.

## Docs

[https://developer.edexa.network/docs/category/edexajs/](https://developer.edexa.network/docs/category/edexajs/)

## Support

Our [Discord](https://discord.com/invite/TKBQS9tZJY) is the best way to reach us ✨.

## Contributors

You are very welcome to contribute, please see contributing guidelines - [Contribute](CONTRIBUTING.md).

Thank you to all the people who already contributed to `edexa.js`!

<a href="https://github.com/devEdexa/edexa.js/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=devEdexa/edexa.js" />
</a>

[![Made with contributors-img](https://img.shields.io/badge/Made%20with-contributors--img-green)](https://contributors-img.web.app/)

## Development

## Compatibility

This SDK is compatible with Node.js version 18.13.0.

### Setup

```bash
npm ci
```

### NPM publish

Before running the publish script, make sure you have updated the version properly.

Note that the `prepublishOnly` script will be automatically called while publishing. It will check lint, clean `dist/lib` folders, and build fresh distribution files before executing `npm publish`.

```bash
npm publish
```

## License

MIT
