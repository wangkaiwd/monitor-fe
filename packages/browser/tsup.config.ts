import { defineConfig, Options } from 'tsup'

const createCommonConfig = (options: Options): Options => {
  return {
    entry: ['./index.ts'],
    sourcemap: !!options.watch,
    clean: true,
    outExtension({ format }) {
      return {
        js: `.${format}.js`,
      }
    },
  }
}

export default defineConfig((options) => {
  const commonConfig = createCommonConfig(options)
  return [
    {
      ...commonConfig,
      format: 'iife',
      globalName: '__MonitorCore__',
    },
    {
      ...commonConfig,
      dts: true,
      format: 'esm'
    },
    {
      ...commonConfig,
      format: 'cjs'
    }
  ]
})
