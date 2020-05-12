module.exports = {
  parser: '@typescript-eslint/parser',
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier/@typescript-eslint',
    'eslint-config-prettier'
  ],
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'import'
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true
      }
    ],
    'react/display-name': [
      0
    ],
    'react/no-find-dom-node': [
      0
    ],
    'react/prop-types': [
      0
    ],
    'react/no-children-prop': [
      0
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 0,
    'import/order': [
      'error',
      {
        groups: [
          [
            'external',
            'builtin'
          ],
          'internal',
          [
            'parent',
            'sibling',
            'index'
          ]
        ]
      }
    ],
    'import/export': [
      0
    ],
    'import/no-unresolved': [
      0
    ],
    'import/no-duplicates': [
      0
    ],
    'import/no-named-as-default': [
      0
    ],
    'import/namespace': [
      0
    ],
    'no-prototype-builtins': [
      0
    ],
    'no-useless-escape': [
      0
    ],
    'no-unused-vars': [
      0
    ],
    'no-console': 2,
    'prefer-arrow-callback': [
      'error'
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'no-useless-catch': [
      0
    ]
  },
  env: {
    es6: true,
    browser: true,
    jasmine: true,
    jest: true,
    node: true
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
}
