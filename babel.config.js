module.exports = {
  plugins: [
    'babel-plugin-transform-es2015-modules-simple-commonjs',
    // '@babel/plugin-transform-classes',
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    // '@babel/preset-typescript',
  ],
};
