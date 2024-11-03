import { defineConfig } from 'tsup'
import { tsupConfigCreator } from '../../scripts/tsup'

export default defineConfig(tsupConfigCreator('__MonitorReact__'))
