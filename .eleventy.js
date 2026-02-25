module.exports = function (eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy({ 'src/assets/icons': 'icons' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/manifest.json': 'manifest.json' });
  eleventyConfig.addPassthroughCopy({ 'src/js/sw.js': 'sw.js' });
  eleventyConfig.addPassthroughCopy({ 'src/js/app.js': 'js/app.js' });
  eleventyConfig.addPassthroughCopy({ 'src/js/config.js': 'js/config.js' });
  eleventyConfig.addPassthroughCopy({ 'src/css': 'css' });
  eleventyConfig.addPassthroughCopy({ '_config.yml': '_config.yml' });
  eleventyConfig.addPassthroughCopy({ '.nojekyll': '.nojekyll' });

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data',
    },
    templateFormats: ['njk', 'html', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
