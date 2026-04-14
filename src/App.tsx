import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { LoginModal } from './components/LoginModal'
import { RedeemModal } from './components/RedeemModal'
import { ImageInput } from './components/ImageInput'
import { ImageHistory } from './components/ImageHistory'
import { ImageViewModal } from './components/ImageViewModal'
import { Toast } from './components/Toast'
import { generateImage } from './lib/api'
import { ImageHistoryItem, UserState, loadFromLocalStorage, saveToLocalStorage } from './lib/utils'

function App() {
  // User state
  const [user, setUser] = useState<UserState>(() => {
    return loadFromLocalStorage('user', {
      isLoggedIn: false,
      username: '',
      points: 0
    })
  })

  // Modals state
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRedeemModal, setShowRedeemModal] = useState(false)
  const [showImageViewModal, setShowImageViewModal] = useState(false)
  const [viewingImage, setViewingImage] = useState<ImageHistoryItem | null>(null)

  // Images state
  const [images, setImages] = useState<ImageHistoryItem[]>(() => {
    return loadFromLocalStorage('images', [])
  })

  // Loading state
  const [isGenerating, setIsGenerating] = useState(false)

  // Toast state
  const [toasts, setToasts] = useState<Array<{ id: string, type: 'success' | 'error' | 'info', message: string }>>([])

  // Save state to localStorage
  useEffect(() => {
    saveToLocalStorage('user', user)
  }, [user])

  useEffect(() => {
    saveToLocalStorage('images', images)
  }, [images])

  // Toast helpers
  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, type, message }])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  // Login handler
  const handleLogin = (username: string, password: string): boolean => {
    // Test account: mixian0816 / 666666
    if (username === 'mixian0816' && password === '666666') {
      setUser({
        isLoggedIn: true,
        username: username,
        points: 100 // Default points
      })
      addToast('success', '登录成功')
      return true
    }
    return false
  }

  // Logout handler
  const handleLogout = () => {
    setUser({
      isLoggedIn: false,
      username: '',
      points: 0
    })
    addToast('info', '已退出登录')
  }

  // Redeem handler
  const handleRedeem = (code: string): boolean => {
    // Test code: AIVORA-1a5s495n
    if (code.toUpperCase() === 'AIVORA-1A5S495N') {
      setUser(prev => ({
        ...prev,
        points: prev.points + 100
      }))
      addToast('success', '兑换成功，获得100积分')
      return true
    }
    return false
  }

  // Generate image handler
  const handleGenerate = async (prompt: string, model: string, size: string) => {
    if (!user.isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    if (user.points < 10) {
      addToast('error', '积分不足，请兑换积分')
      return
    }

    setIsGenerating(true)

    try {
      const imageUrl = await generateImage({ prompt, model, size })
      
      const newImage: ImageHistoryItem = {
        id: Date.now().toString(),
        prompt,
        imageUrl,
        createdAt: new Date().toISOString(),
        model,
        size
      }

      setImages(prev => [newImage, ...prev])
      setUser(prev => ({
        ...prev,
        points: prev.points - 10
      }))
      
      addToast('success', '图片生成成功')
    } catch (error) {
      addToast('error', error instanceof Error ? error.message : '生成失败')
    } finally {
      setIsGenerating(false)
    }
  }

  // Delete image handler
  const handleDeleteImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id))
    addToast('info', '图片已删除')
  }

  // View image handler
  const handleViewImage = (image: ImageHistoryItem) => {
    setViewingImage(image)
    setShowImageViewModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <Header
        user={user}
        onLogout={handleLogout}
        onRedeem={() => setShowRedeemModal(true)}
      />

      {/* Main Content */}
      <main className="pt-16">
        {user.isLoggedIn ? (
          <ImageHistory
            images={images}
            onView={handleViewImage}
            onDelete={handleDeleteImage}
          />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mb-6 shadow-glow">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">欢迎来到米线AI</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              基于豆包Seedream 5.0的AI智能生图平台，输入描述即可生成精美图片
            </p>
            <button
              onClick={() => setShowLoginModal(true)}
              className="btn-primary px-8 py-3 text-base"
            >
              立即登录
            </button>
          </div>
        )}
      </main>

      {/* Image Input */}
      {user.isLoggedIn && (
        <ImageInput
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
      )}

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      <RedeemModal
        isOpen={showRedeemModal}
        onClose={() => setShowRedeemModal(false)}
        onRedeem={handleRedeem}
      />

      <ImageViewModal
        isOpen={showImageViewModal}
        image={viewingImage}
        onClose={() => {
          setShowImageViewModal(false)
          setViewingImage(null)
        }}
        onDelete={handleDeleteImage}
      />

      {/* Toast */}
      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  )
}

export default App
