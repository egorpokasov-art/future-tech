
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const inputDir = path.resolve('images')
const outputDir = path.resolve('images-optimized')

const supportedExtensions = ['.jpg', '.jpeg', '.png']

async function optimizeImages(directory) {
  const entries = await fs.readdir(directory, {
    withFileTypes: true,
  })

  for (const entry of entries) {
    const inputPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      await optimizeImages(inputPath)
      continue
    }

    const extension = path.extname(entry.name).toLowerCase()

    if (!supportedExtensions.includes(extension)) continue

    const relativePath = path.relative(inputDir, inputPath)
    const outputPath = path.join(
      outputDir,
      relativePath.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    )

    await fs.mkdir(path.dirname(outputPath), {
      recursive: true,
    })

    await sharp(inputPath)
      .webp({ quality: 82, effort: 5 })
      .toFile(outputPath)

    console.log(`Optimized: ${relativePath}`)
  }
}

await optimizeImages(inputDir)

console.log('Image optimization completed!')
