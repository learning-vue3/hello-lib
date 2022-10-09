import { writeFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { generateDtsBundle } from 'dts-bundle-generator'

async function run() {
  // 默认情况下 `.mjs` 文件需要自己声明 __dirname 变量
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)

  // 获取项目的根目录路径
  const rootPath = resolve(__dirname, '..')

  // 添加构建选项
  // 插件要求是一个数组选项，支持多个入口文件
  const options = [
    {
      filePath: resolve(rootPath, `./src/index.ts`),
      output: {
        noBanner: true,
      },
    },
  ]

  // 生成 DTS 文件内容
  // 插件返回一个数组，返回的文件内容顺序同选项顺序
  const dtses = generateDtsBundle(options, {
    preferredConfigPath: resolve(rootPath, `./tsconfig.json`),
  })
  if (!Array.isArray(dtses) || !dtses.length) return

  // 将 DTS Bundle 的内容输出成 `.d.ts` 文件保存到 dist 目录下
  // 当前只有一个文件要保存，所以只取第一个下标的数据
  const dts = dtses[0]
  const output = resolve(rootPath, `./dist/index.d.ts`)
  writeFileSync(output, dts)
}
run().catch((e) => {
  console.log(e)
})
