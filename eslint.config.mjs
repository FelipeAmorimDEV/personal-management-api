import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ['**/dist', '**/node_modules'],
  },
  ...compat.extends('@rocketseat/eslint-config/node'),
  {
    rules: {
      'no-useless-constructor': 'off',
      'no-new': 'off',
      'camelcase': 'off'
    },
  },
]
