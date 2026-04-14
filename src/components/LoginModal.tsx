import React, { useState } from 'react'
import { X } from 'lucide-react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (username: string, password: string) => boolean
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const success = onLogin(username, password)
      if (success) {
        setUsername('')
        setPassword('')
        onClose()
      } else {
        setError('账号或密码错误')
      }
    } catch {
      setError('登录失败，请重试')
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

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">欢迎来到米线AI</h2>
          </div>

          <div className="flex gap-6">
            <form onSubmit={handleSubmit} className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  账号
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-primary"
                  placeholder="请输入账号"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  密码
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-primary"
                  placeholder="请输入密码"
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? '登录中...' : '登录'}
              </button>
            </form>

            <div className="flex flex-col items-center justify-center">
              <img 
                src="/qrcode.png" 
                alt="联系客服二维码" 
                className="w-40 h-40 rounded-2xl object-cover"
              />
              <p className="text-xs text-muted-foreground mt-3 text-center">
                还没有账号？扫码联系客服获取
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
