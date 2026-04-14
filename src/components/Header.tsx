import React from 'react'
import { Sparkles, LogOut, Coins, Gift } from 'lucide-react'
import { UserState } from '../lib/utils'

interface HeaderProps {
  user: UserState
  onLogout: () => void
  onRedeem: () => void
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, onRedeem }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              米线AI
            </span>
          </div>

          {/* User Info */}
          {user.isLoggedIn && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
                <Coins className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">可用积分: {user.points}</span>
              </div>
              
              <button
                onClick={onRedeem}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Gift className="w-4 h-4" />
                兑换积分
              </button>
              
              <div className="flex items-center gap-2 px-3 py-1.5">
                <span className="text-sm text-muted-foreground">当前账号: {user.username}</span>
              </div>
              
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                退出登录
              </button>
            </div>
          )}
          
          {!user.isLoggedIn && (
            <button className="btn-primary">
              请先登录
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
