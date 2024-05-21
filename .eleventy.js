const CleanCSS = require("clean-css");

module.exports = function (config) {
  config.addPassthroughCopy({ public: './' });

  config.setBrowserSyncConfig({
    files: ['build/**/*'],
  });

  module.exports = function (eleventyConfig) {
	eleventyConfig.setLiquidOptions({
		jsTruthy: true,
	});
  };

  config.addFilter('cssmin', (code) => new CleanCSS({}).minify(code).styles);

  config.addPassthroughCopy('assets');

  return {
    templateFormats: ['njk', 'jpg', 'png', 'gif'],
    dir: {
      input: 'src',
      output: 'build',
    }
  }
}