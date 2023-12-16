/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/import.scss";
        `,
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/artline/' : '/',
};
