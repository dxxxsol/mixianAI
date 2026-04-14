import React from 'react'
import { Download, Trash2, ZoomIn } from 'lucide-react'
import { ImageHistoryItem } from '../lib/utils'

interface ImageHistoryProps {
  images: ImageHistoryItem[]
  onView: (image: ImageHistoryItem) => void
  onDelete: (id: string) => void
}

export const ImageHistory: React.FC<ImageHistoryProps> = ({ images, onView, onDelete }) => {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-lg font-medium text-foreground mb-2">还没有生成的图片</p>
        <p className="text-sm text-muted-foreground">在下方输入描述开始生成你的第一张图片吧</p>
      </div>
    )
  }

  const groupedImages = images.reduce((groups, image) => {
    const date = new Date(image.createdAt).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(image)
    return groups
  }, {} as Record<string, ImageHistoryItem[]>)

  const sortedDates = Object.keys(groupedImages).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime()
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
      {sortedDates.map((date) => (
        <div key={date} className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">{date}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {groupedImages[date].map((image) => (
              <div key={image.id} className="group relative aspect-square rounded-xl overflow-hidden bg-muted animate-fade-in">
                <img
                  src={image.imageUrl}
                  alt={image.prompt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button
                    onClick={() => onView(image)}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                    title="查看"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = image.imageUrl
                      link.download = `image-${image.id}.png`
                      link.click()
                    }}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                    title="下载"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(image.id)}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-red-500 transition-colors"
                    title="删除"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/50 text-white text-xs">
                  {new Date(image.createdAt).toLocaleTimeString('zh-CN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
