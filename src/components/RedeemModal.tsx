import React, { useState } from 'react'
import { X } from 'lucide-react'

interface RedeemModalProps {
  isOpen: boolean
  onClose: () => void
  onRedeem: (code: string) => boolean
}

export const RedeemModal: React.FC<RedeemModalProps> = ({ isOpen, onClose, onRedeem }) => {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const success = onRedeem(code)
      if (success) {
        setCode('')
        onClose()
      } else {
        setError('兑换码无效或已使用')
      }
    } catch {
      setError('兑换失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-elegant w-full max-w-md animate-scale-in">
        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground">兑换积分</h2>
          </div>

          <div className="flex gap-6">
            <form onSubmit={handleSubmit} className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  兑换码
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="input-primary"
                  placeholder="请输入兑换码"
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">
                  示例格式: AIVORA-XXXXXXXX
                </p>
              </div>

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? '兑换中...' : '兑换'}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                没有兑换码？扫码联系客服获取
              </p>
            </form>

            <div className="flex flex-col items-center justify-center">
              <img 
                src="/qrcode.png" 
                alt="联系客服二维码" 
                className="w-40 h-40 rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
