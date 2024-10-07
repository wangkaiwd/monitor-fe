import path from 'path'
import { fileURLToPath } from 'node:url'
import { createRollupOptions } from '../../scripts/rollup'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url)).toString(),
)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const externalKeys = Object.keys(pkg.dependencies)

export default createRollupOptions(__dirname, externalKeys, '__MonitorReact__')
