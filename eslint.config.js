const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
  baseDirectory: __dirname
})

module.exports = [
  {
    ignores: [
      'eslint.config.js',
      'commitlint.config.js',
      'lib/**',
      'lint-staged.config.js',
      'package.config.ts',
      'dist/**',
      '*.css'
    ]
  },
  ...compat.extends(
    'sanity',
    'sanity/typescript',
    'sanity/react',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: {
        browser: true,
        node: true
      }
    }
  }
]