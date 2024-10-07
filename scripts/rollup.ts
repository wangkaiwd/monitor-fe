import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import esbuild from 'rollup-plugin-esbuild'
import { ModuleFormat, OutputOptions, RollupOptions } from 'rollup'
import path from 'path'

interface OutputConfig {
  isDev: boolean
  iifeName?: string
}

const defaultIifeName = '__MonitorCore__'

export const createPlugins = (isDev: boolean) => {
  return [
    nodeResolve(),
    commonjs(),
    json(),
    esbuild({ sourceMap: isDev }),
  ]
}

export const createOutput = (format: ModuleFormat, config: OutputConfig) => {
  const { isDev, iifeName = defaultIifeName } = config
  const outputMap: Record<string, OutputOptions> = {
    es: {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: isDev,
    },
    cjs: {
      file: 'dist/index.cjs.js',
      exports: 'named',
      format: 'cjs',
      sourcemap: isDev,
    },
    iife: {
      file: 'dist/index.global.js',
      name: iifeName,
      format: 'iife',
      sourcemap: isDev,
    },
  }
  return outputMap[format]
}

export const createRollupOptions = (dirname: string, externalKeys: string[], iifeName: string) => {
  return (commandArgs: any): RollupOptions[] => {
    const isDev = !!commandArgs.watch
    return [
      {
        external: externalKeys,
        input: path.resolve(dirname, './index.ts'),
        output: [
          createOutput('es', { isDev }),
          createOutput('cjs', { isDev }),
        ],
        plugins: createPlugins(isDev),
      },
      {
        input: path.resolve(dirname, './index.ts'),
        output: createOutput('iife', { isDev, iifeName }),
        plugins: createPlugins(isDev),
      },
    ]
  }
}
