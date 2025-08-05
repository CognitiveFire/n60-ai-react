const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssFlexbugsFixes(),
    postcssPresetEnv({
      stage: 0,
      features: {
        'gap-properties': true,
      },
      browsers: 'last 2 versions',
      autoprefixer: { flexbox: 'no-2009' },
    }),
  ],
};