const { getDefaultConfig } = require('expo/metro-config');
// const { getSentryExpoConfig } = require('@sentry/react-native/metro');

const config = getDefaultConfig(__dirname);
// const config = getSentryExpoConfig(__dirname);
config.resolver.sourceExts.push('sql'); // <--- add this
module.exports = config;
