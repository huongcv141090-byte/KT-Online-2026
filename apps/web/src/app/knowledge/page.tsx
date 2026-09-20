'use client'

import React, { useState } from 'react'
import { RAGKnowledgeHub } from '../../components/RAGKnowledgeHub'
import { InteractiveKnowledgeGraph } from '../../components/InteractiveKnowledgeGraph'
import { BrainCircuit, Network, BookOpen } from 'lucide-react'

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState<'graph' | 'wiki'>('graph')

  return (
    <div className="space-y-6">
      {/* Switcher */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab('graph')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'graph'
              ? 'bg-brand-emerald text-dark-950 shadow-glow-emerald'
              : 'bg-dark-850 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>Biểu Đồ Tri Thức Kiếm Tiền (Knowledge Graph)</span>
        </button>

        <button
          onClick={() => setActiveTab('wiki')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'wiki'
              ? 'bg-brand-emerald text-dark-950 shadow-glow-emerald'
              : 'bg-dark-850 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>RAG Wiki & Quy Chuẩn ToS Nền Tảng</span>
        </button>
      </div>

      {activeTab === 'graph' ? (
        <div className="space-y-6">
          <InteractiveKnowledgeGraph />
          <div className="p-4 rounded-xl bg-dark-900 border border-white/10 text-xs text-slate-400 leading-relaxed">
            <strong className="text-white">Ghi chú kiến trúc WeKnora:</strong> Mạng lưới Knowledge Graph trên được tự động kết xuất từ các tài liệu tiếp thị và danh mục chiến dịch. Các thực thể ngách (Niches) được liên kết trực tiếp với các kênh truyền thông và sản phẩm có EPC cao nhất.
          </div>
        </div>
      ) : (
        <RAGKnowledgeHub />
      )}
    </div>
  )
}
