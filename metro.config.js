const { getSentryExpoConfig } = require("@sentry/react-native/metro");
const config = getSentryExpoConfig(__dirname);
// const config = getSentryExpoConfig(__dirname);
config.resolver.sourceExts.push('sql'); // <--- add this
module.exports = config;
