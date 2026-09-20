'use client'

import React, { useState } from 'react'
import { 
  Search, 
  FileText, 
  BookOpen, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle, 
  History, 
  ArrowRight,
  Bookmark,
  ExternalLink,
  ChevronDown,
  Layers
} from 'lucide-react'

interface WikiDoc {
  id: string
  title: string
  category: 'policy' | 'retention' | 'affiliate' | 'payout'
  categoryLabel: string
  summary: string
  source: string
  updatedAt: string
  chunksCount: number
  revisions: number
  keyRules: string[]
}

const KNOWLEDGE_DOCS: WikiDoc[] = [
  {
    id: 'doc_tiktok_tos',
    title: 'Chính Sách & Quy Định Tiếp Thị Liên Kết TikTok Shop 2026',
    category: 'policy',
    categoryLabel: 'Chính sách ToS',
    summary: 'Quy chuẩn nội dung được phép gắn giỏ hàng vàng. Cách gắn hashtag thương mại để tránh bị bóp reach hoặc tạm ngừng tài khoản.',
    source: 'TikTok Shop Partner Policy (Verified)',
    updatedAt: '2026-03-15',
    chunksCount: 14,
    revisions: 6,
    keyRules: [
      'Bắt buộc bật tùy chọn "Tiếp thị liên kết" trong cài đặt bài đăng.',
      'Nghiêm cấm video chỉ chứa hình ảnh chạy slide tĩnh hoặc dùng giọng đọc AI lặp đi lặp lại vô nghĩa.',
      'Không quảng cáo cam kết hiệu quả 100% đối với các sản phẩm sức khỏe & mỹ phẩm.',
    ],
  },
  {
    id: 'doc_shopee_rules',
    title: 'Cơ Chế Ghi Nhận Cookie & Đơn Hàng Shopee Affiliate',
    category: 'affiliate',
    categoryLabel: 'Bí kíp Affiliate',
    summary: 'Giải thích mô hình Last Click Attribution (Click cuối cùng được tính), thời gian lưu cookie 7 ngày cho app và 30 ngày cho web.',
    source: 'Shopee Affiliate Program Guidebook',
    updatedAt: '2026-03-10',
    chunksCount: 9,
    revisions: 4,
    keyRules: [
      'Thời hạn lưu cookie là 7 ngày trên điện thoại và 30 ngày trên máy tính.',
      'Đơn hàng tự mua qua link của chính mình sẽ bị hệ thống chống gian lận (Anti-Fraud) hủy hoa hồng.',
      'Tỷ lệ hoa hồng cho khách hàng mới lên tới 12% - 15%.',
    ],
  },
  {
    id: 'doc_hook_formula',
    title: 'Công Thức 3 Giây Vàng (Hook) Giữ Chân Người Xem Triệu View',
    category: 'retention',
    categoryLabel: 'Kỹ thuật Viral',
    summary: 'Tổng hợp 10 cấu trúc câu mở đầu video ngắn đạt chỉ số Retention Rate > 65% trên Reels, Shorts và TikTok.',
    source: 'OpenRemoteHub Creative Lab & Data Analytics',
    updatedAt: '2026-02-28',
    chunksCount: 18,
    revisions: 8,
    keyRules: [
      'Hook thị giác: Chuyển động nhanh trong 1.5 giây đầu (Zoom in, text xuất hiện giật nhịp).',
      'Hook tâm lý: Đặt câu hỏi kích thích tranh cãi hoặc phủ định một niềm tin phổ biến.',
      'Độ dài lý tưởng để tối ưu thuật toán phân phối là từ 35 - 55 giây.',
    ],
  },
  {
    id: 'doc_payout_tax',
    title: 'Quy Trình Rút Hoa Hồng & Kê Khai Thuế Thu Nhập MMO Hợp Pháp',
    category: 'payout',
    categoryLabel: 'Thanh toán & Thuế',
    summary: 'Hướng dẫn rút tiền từ các mạng affiliate quốc tế về tài khoản ngân hàng Việt Nam, khấu trừ thuế TNCN 10% tại nguồn.',
    source: 'Luật Quản Lý Thuế & Quy định TT111',
    updatedAt: '2026-01-20',
    chunksCount: 8,
    revisions: 3,
    keyRules: [
      'Các mạng trong nước (AccessTrade, Ecomobi) tự động khấu trừ 10% thuế TNCN khi rút trên 2.000.000₫/lần.',
      'Nền tảng quốc tế (Amazon, Impact) cần điền mẫu thuế W-8BEN để tránh bị đánh thuế trùng 30%.',
      'Nên mở tài khoản ngân hàng chuyên biệt để tách bạch dòng tiền thu nhập kinh doanh trực tuyến.',
    ],
  },
]

export function RAGKnowledgeHub() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeDoc, setActiveDoc] = useState<WikiDoc | null>(KNOWLEDGE_DOCS[0])

  const filteredDocs = KNOWLEDGE_DOCS.filter((doc) => {
    const matchCat = selectedCategory === 'all' || doc.category === selectedCategory
    const matchSearch =
      !searchQuery ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-xl bg-gradient-to-br from-brand-emerald to-brand-cyan text-dark-950 shadow-glow-emerald">
              <BookOpen className="w-5 h-5 stroke-[2.5]" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-white">RAG Knowledge Hub & Wiki Tự Bảo Trì</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Kế thừa cơ chế Wiki Mode của WeKnora: Tra cứu tốc độ cao, trích dẫn minh bạch, lịch sử phiên bản
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <div className="px-3 py-1.5 rounded-lg bg-dark-900 border border-white/10">
            <span className="text-brand-emerald font-bold">49</span> Chunks đã chỉ mục
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-dark-900 border border-white/10">
            <span className="text-brand-cyan font-bold">HNSW</span> Vector Accelerate
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm chính sách ToS, cơ chế cookie, công thức hook, thủ thuật hoa hồng..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-900/90 text-white text-sm border border-white/10 focus:border-brand-emerald focus:outline-none placeholder:text-slate-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'policy', label: 'ToS Chính Sách' },
            { id: 'affiliate', label: 'Affiliate' },
            { id: 'retention', label: 'Kỹ Thuật View' },
            { id: 'payout', label: 'Thuế & Rút Tiền' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs whitespace-nowrap px-3 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-emerald text-dark-950 font-bold shadow-glow-emerald'
                  : 'bg-dark-850 text-slate-300 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
        <span className="text-slate-400 flex items-center gap-1 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-brand-cyan" /> Câu hỏi phổ biến:
        </span>
        {[
          'Làm sao để không bị TikTok gậy vì lạm dụng link affiliate?',
          'Shopee tính hoa hồng theo First Click hay Last Click?',
          'Khấu trừ thuế TNCN khi làm tiếp thị liên kết tại Việt Nam?',
        ].map((q, idx) => (
          <button
            key={idx}
            onClick={() => setSearchQuery(q)}
            className="whitespace-nowrap px-3 py-1.5 rounded-full bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white border border-white/5 transition-all"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Content Area: Doc List + Active Doc Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Cards */}
        <div className="space-y-3">
          {filteredDocs.map((doc) => {
            const isSelected = activeDoc?.id === doc.id
            return (
              <div
                key={doc.id}
                onClick={() => setActiveDoc(doc)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'glass-panel-glow bg-dark-900 border-brand-emerald/40 shadow-glow-emerald'
                    : 'glass-panel hover:bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
                    {doc.categoryLabel}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {doc.chunksCount} chunks
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5 leading-snug">{doc.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{doc.summary}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-3 pt-2 border-t border-white/5">
                  <span>Cập nhật: {doc.updatedAt}</span>
                  <span className="text-brand-emerald flex items-center gap-1 font-mono">
                    <History className="w-3 h-3" /> v{doc.revisions}.0
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected Doc Viewer */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-white/10 space-y-5">
          {activeDoc ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2.5 py-0.5 rounded bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/30 font-bold">
                      {activeDoc.categoryLabel}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Nguồn: {activeDoc.source}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white leading-tight">
                    {activeDoc.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1.5 rounded-lg bg-dark-900 text-slate-300 border border-white/10 flex items-center gap-1.5 font-mono">
                    <History className="w-3.5 h-3.5 text-brand-cyan" />
                    {activeDoc.revisions} Phiên bản (Rollback sẵn sàng)
                  </span>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tóm Lược Tài Liệu</h5>
                <p className="text-sm text-slate-200 leading-relaxed bg-dark-950/60 p-4 rounded-xl border border-white/5">
                  {activeDoc.summary}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Quy Tắc Vàng Cần Tuân Thủ (Auto-Extracted Chunks)
                </h5>
                <div className="space-y-2.5">
                  {activeDoc.keyRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-dark-900/80 border border-white/5 flex items-start gap-3"
                    >
                      <CheckCircle className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-200 leading-relaxed">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RAG Verification Footer */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-dark-900 to-dark-850 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  <span className="text-brand-emerald font-semibold">Tự động đồng bộ (Auto-Sync):</span> Dữ liệu được bóc tách và phân tích bởi công nghệ RAG WeKnora.
                </div>
                <a
                  href="/ai-copilot"
                  className="px-4 py-2 rounded-lg bg-brand-emerald text-dark-950 font-bold text-xs flex items-center gap-1.5 hover:opacity-90 shadow-glow-emerald transition-all"
                >
                  <span>Hỏi AI Về Tài Liệu Này</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400 text-sm">
              Chọn một tài liệu để xem nội dung chi tiết.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
