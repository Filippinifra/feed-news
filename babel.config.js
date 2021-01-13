module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            components: "./src/components",
            constants: "./src/constants",
            hook: "./src/hook",
            images: "./src/images",
            screen: "./src/screen",
            utils: "./src/utils",
          },
        },
      ],
    ],
  };
};
