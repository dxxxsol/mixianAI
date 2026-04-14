import React, { useState } from 'react'
import { Sparkles } from 'lucide-react'

interface ImageInputProps {
  onGenerate: (prompt: string, model: string, size: string) => void
  isGenerating: boolean
}

export const ImageInput: React.FC<ImageInputProps> = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState('doubao-seedream-5-0-260128')
  const [size, setSize] = useState('2K')
  const [showModelSelect, setShowModelSelect] = useState(false)
  const [showSizeSelect, setShowSizeSelect] = useState(false)

  const models = [
    { value: 'doubao-seedream-5-0-260128', label: 'doubao-seedream-5.0' }
  ]

  const sizes = ['1K', '2K', '4K']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || isGenerating) return
    onGenerate(prompt.trim(), model, size)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-t border-border">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="bg-card rounded-2xl border border-border shadow-elegant p-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="描述你想要的画面，可直接粘贴创意想法或设计需求..."
              className="w-full min-h-[100px] resize-none bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
              required
            />
            
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="flex items-center gap-3">
                {/* Model Select */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowModelSelect(!showModelSelect)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>{models.find(m => m.value === model)?.label}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showModelSelect && (
                    <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-xl border border-border py-2 min-w-[200px] animate-scale-in">
                      {models.map((m) => (
                        <button
                          key={m.value}
                          type="button"
                          onClick={() => { setModel(m.value); setShowModelSelect(false) }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors"
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Size Select */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowSizeSelect(!showSizeSelect)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>{size}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showSizeSelect && (
                    <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-xl border border-border py-2 min-w-[120px] animate-scale-in">
                      {sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => { setSize(s); setShowSizeSelect(false) }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="btn-primary flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {isGenerating ? '生成中...' : '生成图片'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
