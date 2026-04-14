import React, { useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

interface ToastMessage {
  id: string
  type: ToastType
  message: string
}

interface ToastProps {
  toasts: ToastMessage[]
  onRemove: (id: string) => void
}

export const Toast: React.FC<ToastProps> = ({ toasts, onRemove }) => {
  useEffect(() => {
    toasts.forEach((toast) => {
      const timer = setTimeout(() => {
        onRemove(toast.id)
      }, 3000)
      return () => clearTimeout(timer)
    })
  }, [toasts, onRemove])

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <AlertCircle className="w-5 h-5" />
  }

  const colors = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white'
  }

  return (
    <div className="fixed top-20 right-4 z-[200] space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${colors[toast.type]} animate-slide-up`}
        >
          {icons[toast.type]}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
