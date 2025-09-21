module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./", // හෝ './src' නම් src folder එකේ components තියෙනව නම්
          },
        },
      ],
    ],
  };
};
