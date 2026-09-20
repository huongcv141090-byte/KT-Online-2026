'use client'

import React, { useState } from 'react'
import { 
  CalendarClock, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Send, 
  ShieldCheck, 
  Lock, 
  Layers,
  Sparkles,
  Share2,
  Trash2,
  Filter
} from 'lucide-react'

export interface ContentItem {
  id: string
  title: string
  caption: string
  channels: ('tiktok' | 'instagram' | 'meta' | 'youtube')[]
  scheduledAt: string
  status: 'draft' | 'pending_approval' | 'approved' | 'published'
  affiliateProduct?: string
  commission: string
}

const INITIAL_POSTS: ContentItem[] = [
  {
    id: 'cnt_1',
    title: 'Review Mic Thu Âm K9 Pro Chống Ồn Quán Cafe',
    caption: 'Thử thách âm thanh ồn ào! 🎙️ Bật mic lên là êm ru. Giảm 30% tại giỏ hàng TikTok! #ReviewCongNghe #MicThuAm #ShopeeAffiliate',
    channels: ['tiktok', 'instagram'],
    scheduledAt: '2026-09-22 19:30',
    status: 'approved',
    affiliateProduct: 'Mic Không Dây K9 Pro',
    commission: '15% (45.000₫/đơn)',
  },
  {
    id: 'cnt_2',
    title: 'Top 3 Sai Lầm Mở Thẻ Tín Dụng Hoàn Tiền Sinh Viên',
    caption: 'Mở thẻ số VPBank nhận ngay 800k tiền mặt + miễn phí thường niên. Đăng ký link trong bio! #KiemTienOnline #FintechVN #AccessTrade',
    channels: ['meta', 'youtube'],
    scheduledAt: '2026-09-23 11:45',
    status: 'pending_approval',
    affiliateProduct: 'Thẻ Tín Dụng VPBank SuperCash',
    commission: '850.000₫/thẻ duyệt',
  },
  {
    id: 'cnt_3',
    title: 'Hướng Dẫn Dùng AI Tự Động Hóa Quản Lý Công Việc',
    caption: 'Bí kíp nhân bản năng suất x5 lần với Notion AI Template. Nhận miễn phí mẫu template tại link bio! #NotionAI #NangSuat #FreelancerVN',
    channels: ['instagram', 'youtube'],
    scheduledAt: '2026-09-24 08:00',
    status: 'draft',
    affiliateProduct: 'Gói Notion Ultimate Workspace',
    commission: '40% (240.000₫/bản)',
  },
]

export function ContentStudio() {
  const [posts, setPosts] = useState<ContentItem[]>(INITIAL_POSTS)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCaption, setNewCaption] = useState('')
  const [newProduct, setNewProduct] = useState('')
  const [newScheduled, setNewScheduled] = useState('2026-09-25 19:00')

  const handleApprove = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'approved' } : p))
    )
  }

  const handlePublish = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'published' } : p))
    )
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const newPost: ContentItem = {
      id: `cnt_${Date.now()}`,
      title: newTitle,
      caption: newCaption,
      channels: ['tiktok', 'instagram'],
      scheduledAt: newScheduled,
      status: 'pending_approval',
      affiliateProduct: newProduct || 'Sản phẩm tiếp thị',
      commission: '15% - 30%',
    }

    setPosts([newPost, ...posts])
    setNewTitle('')
    setNewCaption('')
    setNewProduct('')
    setIsModalOpen(false)
  }

  const filteredPosts = posts.filter((p) => {
    if (activeFilter === 'all') return true
    return p.status === activeFilter
  })

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-xl bg-gradient-to-br from-brand-amber to-brand-rose text-dark-950 shadow-sm">
              <CalendarClock className="w-5 h-5 stroke-[2.5]" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-white">Content Studio & Quy Trình Duyệt An Toàn</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Chính sách nghiêm ngặt: Tuyệt đối không tự động spam. Mọi nội dung bắt buộc phải duyệt trước khi đẩy vào Queue BullMQ.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-emerald to-brand-cyan text-dark-950 font-bold text-xs flex items-center gap-2 hover:opacity-90 shadow-glow-emerald transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Tạo Bài Viết Mới</span>
        </button>
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-xl bg-brand-emerald/10 border border-brand-emerald/25 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-brand-emerald shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-white font-semibold">Cơ Chế Bảo Vệ Chống Vi Phạm ToS:</strong> Hệ thống tự động kiểm tra khóa trùng lặp (`IdempotencyKey`), giới hạn tần suất đăng bài (Rate Limit), và đảm bảo có thẻ khai báo tiếp thị liên kết trước khi kết nối API mạng xã hội.
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Bộ lọc:
        </span>
        {[
          { id: 'all', label: 'Tất cả' },
          { id: 'draft', label: 'Bản nháp' },
          { id: 'pending_approval', label: 'Chờ phê duyệt' },
          { id: 'approved', label: 'Đã duyệt (Sẵn sàng)' },
          { id: 'published', label: 'Đã xuất bản' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeFilter === f.id
                ? 'bg-white/15 text-white font-bold border border-white/20'
                : 'bg-dark-850 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Post List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const statusBadge =
            post.status === 'published'
              ? { bg: 'bg-brand-emerald/20 text-brand-emerald border-brand-emerald/30', label: 'ĐÃ XUẤT BẢN' }
              : post.status === 'approved'
              ? { bg: 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30', label: 'ĐÃ PHÊ DUYỆT' }
              : post.status === 'pending_approval'
              ? { bg: 'bg-brand-amber/20 text-brand-amber border-brand-amber/30', label: 'CHỜ DUYỆT' }
              : { bg: 'bg-slate-700/40 text-slate-300 border-slate-600/30', label: 'BẢN NHÁP' }

          return (
            <div
              key={post.id}
              className="glass-panel rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border uppercase tracking-wider ${statusBadge.bg}`}>
                    {statusBadge.label}
                  </span>
                  <h4 className="text-sm font-extrabold text-white">{post.title}</h4>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-cyan" /> {post.scheduledAt}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-dark-900 border border-white/5 text-brand-emerald font-bold">
                    {post.commission}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 bg-dark-950/60 p-3 rounded-lg border border-white/5 leading-relaxed font-sans">
                {post.caption}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Kênh đích:</span>
                  <div className="flex items-center gap-1.5">
                    {post.channels.map((ch) => (
                      <span key={ch} className="px-2 py-0.5 rounded bg-dark-850 text-slate-200 border border-white/10 text-[10px] uppercase font-bold">
                        {ch}
                      </span>
                    ))}
                  </div>
                  <span className="text-slate-600">|</span>
                  <span>Sản phẩm: <strong className="text-white">{post.affiliateProduct}</strong></span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {post.status === 'pending_approval' && (
                    <button
                      onClick={() => handleApprove(post.id)}
                      className="px-3 py-1.5 rounded-lg bg-brand-cyan/20 hover:bg-brand-cyan/30 text-brand-cyan border border-brand-cyan/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Phê Duyệt Nội Dung</span>
                    </button>
                  )}

                  {post.status === 'approved' && (
                    <button
                      onClick={() => handlePublish(post.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-brand-emerald text-dark-950 font-bold text-xs flex items-center gap-1.5 hover:opacity-90 shadow-glow-emerald transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Đẩy Lên Queue Publish</span>
                    </button>
                  )}

                  {post.status === 'published' && (
                    <span className="text-xs text-brand-emerald flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-4 h-4" /> Đã đăng thành công
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Simple Modal Create */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel-glow bg-dark-900 rounded-2xl p-6 max-w-lg w-full border border-brand-emerald/30 shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-white">Soạn Thảo Bài Viết Mới & Lên Lịch</h3>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tiêu đề nội dung:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: Review Trải Nghiệm Mua Sắm Shopee..."
                  className="w-full bg-dark-950 p-2.5 rounded-lg border border-white/10 text-white focus:border-brand-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Sản phẩm / Chiến dịch Affiliate:</label>
                <input
                  type="text"
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  placeholder="Ví dụ: Bàn phím cơ không dây Bluetooth"
                  className="w-full bg-dark-950 p-2.5 rounded-lg border border-white/10 text-white focus:border-brand-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nội dung Caption & Hashtags:</label>
                <textarea
                  rows={4}
                  required
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Nhập caption hoặc dán kịch bản do AI Copilot tạo ra..."
                  className="w-full bg-dark-950 p-2.5 rounded-lg border border-white/10 text-white focus:border-brand-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Thời gian lên lịch xuất bản:</label>
                <input
                  type="text"
                  value={newScheduled}
                  onChange={(e) => setNewScheduled(e.target.value)}
                  className="w-full bg-dark-950 p-2.5 rounded-lg border border-white/10 text-white font-mono focus:border-brand-emerald focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-dark-850 hover:bg-dark-800 text-slate-300 border border-white/10"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-brand-emerald text-dark-950 font-bold shadow-glow-emerald"
                >
                  Lưu & Gửi Phê Duyệt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
