'use client'

import React, { useState } from 'react'
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  History,
  FileKey,
  Trash2
} from 'lucide-react'

export interface ProviderItem {
  id: string
  label: string
  status: 'connected' | 'not_connected' | 'reauth_required'
  description: string
  scopes: string[]
  encryption: string
  connectedAt?: string
  lastAudit?: string
}

const INITIAL_PROVIDERS: ProviderItem[] = [
  {
    id: 'google',
    label: 'Google & YouTube Creator',
    status: 'connected',
    description: 'Xác thực định danh và theo dõi chỉ số video YouTube Shorts.',
    scopes: ['openid', 'email', 'youtube.readonly'],
    encryption: 'AES-256-GCM Envelope',
    connectedAt: '2026-03-01 10:20',
    lastAudit: 'Token refreshed via PKCE',
  },
  {
    id: 'instagram',
    label: 'Instagram Professional',
    status: 'connected',
    description: 'Lên lịch Reels và tự động lấy số liệu tương tác bài viết.',
    scopes: ['instagram_basic', 'instagram_content_publish'],
    encryption: 'AES-256-GCM Envelope',
    connectedAt: '2026-03-05 14:15',
    lastAudit: 'Approval grant active',
  },
  {
    id: 'tiktok',
    label: 'TikTok Login Kit & Creator',
    status: 'not_connected',
    description: 'Đăng video lên kênh TikTok (Chế độ Private review an toàn).',
    scopes: ['user.info.basic', 'video.upload'],
    encryption: 'AES-256-GCM Envelope',
    lastAudit: 'Consent required',
  },
  {
    id: 'facebook',
    label: 'Meta Business & Fanpage',
    status: 'reauth_required',
    description: 'Quản lý bài đăng trang cộng đồng và liên kết Bio Link.',
    scopes: ['pages_show_list', 'pages_read_engagement'],
    encryption: 'AES-256-GCM Envelope',
    connectedAt: '2026-02-12 09:00',
    lastAudit: 'Token expired, reauth needed',
  },
  {
    id: 'github',
    label: 'GitHub Developer',
    status: 'not_connected',
    description: 'Đăng nhập nhà phát triển mã nguồn mở và đóng góp dự án.',
    scopes: ['read:user'],
    encryption: 'AES-256-GCM Envelope',
    lastAudit: 'Optional connector',
  },
]

export function ConnectionsVault() {
  const [providers, setProviders] = useState<ProviderItem[]>(INITIAL_PROVIDERS)
  const [auditLogs, setAuditLogs] = useState<string[]>([
    '[2026-09-20 21:00:12] Token refresh: Google YouTube OAuth refreshed successfully (status 200).',
    '[2026-09-20 18:45:00] Audit verified: AES-256-GCM keys integrity check passed.',
    '[2026-09-20 12:30:19] Content check: IdempotencyKey valid, no duplicate publishing detected.',
  ])

  const handleToggleConnect = (id: string) => {
    setProviders((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const isCurrentlyConnected = p.status === 'connected'
          const newStatus = isCurrentlyConnected ? 'not_connected' : 'connected'
          const logMsg = isCurrentlyConnected
            ? `[${new Date().toISOString()}] Quyền truy cập cho ${p.label} đã được THU HỒI (Revoked).`
            : `[${new Date().toISOString()}] Kết nối OAuth thành công cho ${p.label} qua mã hóa AES-256-GCM.`
          setAuditLogs((prevLogs) => [logMsg, ...prevLogs])

          return {
            ...p,
            status: newStatus,
            connectedAt: newStatus === 'connected' ? 'Vừa kết nối' : undefined,
          }
        }
        return p
      })
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-xl bg-gradient-to-br from-brand-emerald to-brand-cyan text-dark-950 shadow-glow-emerald">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-white">Trạm Kết Nối & Két Bảo Mật (OAuth Vault)</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Kế thừa nguyên tắc Data Sovereignty của WeKnora: 100% Token được mã hóa AES-256-GCM, không lưu mật khẩu
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-lg bg-dark-900 border border-white/10 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-brand-emerald" />
            <span className="text-slate-300">Envelope Encryption:</span>
            <strong className="text-brand-emerald">AES-256-GCM</strong>
          </div>
        </div>
      </div>

      {/* Safety Manifesto Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl glass-panel border border-white/10 space-y-1">
          <div className="flex items-center gap-2 text-brand-emerald text-xs font-bold">
            <Lock className="w-4 h-4" /> Không Lưu Mật Khẩu
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Hệ thống chỉ giao tiếp qua giao thức OAuth 2.0 PKCE. Mật khẩu mạng xã hội của bạn hoàn toàn không được gửi qua máy chủ.
          </p>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-white/10 space-y-1">
          <div className="flex items-center gap-2 text-brand-cyan text-xs font-bold">
            <FileKey className="w-4 h-4" /> Phân Quyền Tối Thiểu
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Chỉ yêu cầu đúng các scope cần thiết (Least Privilege Scope) để đọc báo cáo hoặc lên lịch bài viết đã duyệt.
          </p>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-white/10 space-y-1">
          <div className="flex items-center gap-2 text-brand-violet text-xs font-bold">
            <History className="w-4 h-4" /> Thu Hồi Quyền 1-Chạm
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Bất kỳ lúc nào bạn cũng có thể bấm "Rút Quyền", hệ thống sẽ lập tức hủy mã token và xóa bỏ khỏi database.
          </p>
        </div>
      </div>

      {/* Providers Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span>Danh Sách Nền Tảng Hỗ Trợ</span>
        </h3>

        {providers.map((p) => {
          const isConnected = p.status === 'connected'
          const isReauth = p.status === 'reauth_required'

          return (
            <div
              key={p.id}
              className={`glass-panel rounded-xl p-5 border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                isConnected ? 'border-brand-emerald/30 bg-dark-900/80' : 'border-white/10'
              }`}
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-extrabold text-white">{p.label}</h4>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded font-mono ${
                      isConnected
                        ? 'bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/30'
                        : isReauth
                        ? 'bg-brand-amber/20 text-brand-amber border border-brand-amber/30'
                        : 'bg-dark-850 text-slate-400 border border-white/10'
                    }`}
                  >
                    {isConnected ? 'ĐÃ KẾT NỐI' : isReauth ? 'CẦN XÁC THỰC LẠI' : 'CHƯA KẾT NỐI'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{p.description}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1 font-mono">
                  <span>Scopes: <strong className="text-slate-200">{p.scopes.join(', ')}</strong></span>
                  <span>•</span>
                  <span>Mã hóa: <strong className="text-brand-emerald">{p.encryption}</strong></span>
                  {p.connectedAt && (
                    <>
                      <span>•</span>
                      <span>Kết nối: {p.connectedAt}</span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleToggleConnect(p.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isConnected
                      ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30'
                      : isReauth
                      ? 'bg-brand-amber text-dark-950 font-bold hover:opacity-90'
                      : 'bg-brand-emerald text-dark-950 font-bold hover:opacity-90 shadow-glow-emerald'
                  }`}
                >
                  {isConnected ? (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Rút Quyền (Revoke)</span>
                    </>
                  ) : isReauth ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Xác Thực Lại</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Kết Nối An Toàn</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Audit Log Panel */}
      <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <History className="w-4 h-4 text-brand-cyan" />
            Nhật Ký Kiểm Toán Bất Biến (Immutable Audit Log)
          </h4>
          <span className="text-[10px] text-brand-emerald font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-ping inline-block"></span>
            Realtime Guard
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-dark-950 border border-white/5 font-mono text-[11px] text-slate-300 space-y-1.5 max-h-40 overflow-y-auto">
          {auditLogs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-slate-600">›</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
