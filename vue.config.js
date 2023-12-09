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
};
