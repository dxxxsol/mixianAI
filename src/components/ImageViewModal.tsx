import React from 'react'
import { X, Download, Trash2 } from 'lucide-react'
import { ImageHistoryItem } from '../lib/utils'

interface ImageViewModalProps {
  isOpen: boolean
  image: ImageHistoryItem | null
  onClose: () => void
  onDelete: (id: string) => void
}

export const ImageViewModal: React.FC<ImageViewModalProps> = ({ 
  isOpen, 
  image, 
  onClose, 
  onDelete 
}) => {
  if (!isOpen || !image) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-elegant w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">查看图片</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const link = document.createElement('a')
                link.href = image.imageUrl
                link.download = `image-${image.id}.png`
                link.click()
              }}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              title="下载"
            >
              <Download className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={() => {
                onDelete(image.id)
                onClose()
              }}
              className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
              title="删除"
            >
              <Trash2 className="w-5 h-5 text-destructive" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
          <img
            src={image.imageUrl}
            alt={image.prompt}
            className="w-full h-auto rounded-xl"
          />
          <div className="mt-4 p-4 bg-muted rounded-xl">
            <p className="text-sm text-muted-foreground mb-2">提示词</p>
            <p className="text-sm text-foreground">{image.prompt}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
