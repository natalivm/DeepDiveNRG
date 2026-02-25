module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('icons');
  eleventyConfig.addPassthroughCopy('manifest.json');
  eleventyConfig.addPassthroughCopy('styles.css');
  eleventyConfig.addPassthroughCopy('app.js');
  eleventyConfig.addPassthroughCopy('config.js');
  eleventyConfig.addPassthroughCopy('sw.js');
  eleventyConfig.addPassthroughCopy('_config.yml');
  eleventyConfig.addPassthroughCopy('.nojekyll');

  return {
    dir: {
      input: '.',
      output: '_site',
      includes: '_includes'
    },
    htmlTemplateEngine: false
  };
};
