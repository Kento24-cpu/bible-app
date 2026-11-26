const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = getDefaultConfig(__dirname);

// The bible text is loaded at runtime, so Metro must ship it as a file instead of a module.
config.resolver.assetExts.push('bible');

module.exports = withUniwindConfig(config, {
  cssEntryFile: './global.css',
});
