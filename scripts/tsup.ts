import { Options } from 'tsup'

export const tsupConfigCreator = (globalName: string) => {
  const createCommonConfig = (options: Options): Options => {
    return {
      entry: ['./index.ts'],
      sourcemap: !!options.watch,
      clean: true,
    }
  }

  return (options: Options): Options[] => {
    const commonConfig = createCommonConfig(options)
    return [
      {
        ...commonConfig,
        format: 'iife',
        globalName,
      },
      {
        ...commonConfig,
        dts: true,
        format: 'esm',
      },
      {
        ...commonConfig,
        format: 'cjs',
      },
    ]
  }
}
