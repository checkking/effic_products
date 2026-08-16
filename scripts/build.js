/**
 * Effic Online 构建脚本
 * 将所有静态文件拷贝到 dist/ 目录，供 nginx 部署使用
 */
import { cpSync, rmSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dist = join(root, 'dist')

// 需要拷贝的文件和目录
const items = [
  'css',
  'js',
  'en',
  'zh',
  'es',
  'de',
  'ja',
  'index.html',
  'favicon.svg',
  'robots.txt',
  'sitemap.xml',
]

// 清空旧的 dist 目录
if (existsSync(dist)) {
  rmSync(dist, { recursive: true, force: true })
}
mkdirSync(dist, { recursive: true })

// 拷贝文件
for (const item of items) {
  const src = join(root, item)
  if (existsSync(src)) {
    cpSync(src, join(dist, item), { recursive: true })
    console.log(`  ✓ ${item}`)
  } else {
    console.warn(`  ✗ ${item} (不存在，已跳过)`)
  }
}

console.log(`\n构建完成！输出目录: ${dist}`)
