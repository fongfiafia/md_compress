import Compressor from 'compressorjs'

interface CompressOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
}

export function compressImage(file: File, options: CompressOptions = {}): Promise<File> {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.8,
  } = options

  console.log(`[压缩前] 文件大小: ${(file.size / 1024).toFixed(2)}KB`)

  return new Promise((resolve, reject) => {
    new Compressor(file, {
      maxWidth,
      maxHeight,
      quality,
      success(result) {
        const compressedFile = new File([result], file.name, { type: file.type })
        console.log(`[压缩后] 文件大小: ${(compressedFile.size / 1024).toFixed(2)}KB`)
        console.log(`[压缩率] ${((1 - compressedFile.size / file.size) * 100).toFixed(2)}%`)
        resolve(compressedFile)
      },
      error(err) {
        console.error(`[压缩失败]`, err)
        reject(err)
      },
    })
  })
}
