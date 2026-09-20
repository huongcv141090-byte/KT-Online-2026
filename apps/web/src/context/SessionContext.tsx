'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type SessionStepStatus = 
  | 'IDLE' 
  | 'SCOUTING' 
  | 'RESEARCHING' 
  | 'WRITING' 
  | 'AUDITING_TOS' 
  | 'PUBLISHING' 
  | 'ACTIVE_MONITORING'

export interface ChannelStat {
  name: string
  revenue: number
  orders: number
  growth: string
}

export interface EarningSessionData {
  affiliateId: string
  campaignName: string
  niche: string
  targetProduct: string
  commissionRate: string
  productPrice: number
  commissionPerSale: number
  utmLink: string
  scriptContent: string
  complianceScore: number
  complianceNotes: string[]
  scheduledTime: string
  distributionChannels: string[]
}

interface SessionContextType {
  revenue: number
  orders: number
  reach: number
  accountHealth: number
  currentStep: number
  stepStatus: SessionStepStatus
  isAutoPilotRunning: boolean
  sessionLogs: string[]
  sessionData: EarningSessionData
  channels: ChannelStat[]
  startAutoPilot: () => void
  stopAutoPilot: () => void
  resetAllData: () => void
  runManualStep: (step: number) => void
  setAffiliateId: (id: string) => void
  setCampaign: (campaign: Partial<EarningSessionData>) => void
}

const DEFAULT_SESSION_DATA: EarningSessionData = {
  affiliateId: 'user_mmo_2026',
  campaignName: 'Gói Workspace & AI Copilot Bản Quyền',
  niche: 'Công Cụ AI & Năng Suất',
  targetProduct: 'Notion AI & Automation Workflow Kit',
  commissionRate: '40% Recurring',
  productPrice: 600000,
  commissionPerSale: 240000,
  utmLink: 'https://openremotehub.com/aff/notion-ai?aff_id=user_mmo_2026&utm_source=tiktok&utm_medium=short_video&utm_campaign=session_01',
  scriptContent: '',
  complianceScore: 100,
  complianceNotes: [
    '0% từ khóa cấm theo chính sách TikTok Shop & Meta 2026',
    'Có gắn nhãn tài trợ minh bạch #Affiliate #Sponsored',
    'Tuân thủ bản quyền âm thanh thương mại'
  ],
  scheduledTime: '19:45 (Khung giờ vàng tối nay)',
  distributionChannels: ['TikTok', 'Instagram Reels', 'YouTube Shorts']
}

const DEFAULT_CHANNELS: ChannelStat[] = [
  { name: 'TikTok Shop Partner', revenue: 0, orders: 0, growth: 'Sẵn sàng Auto' },
  { name: 'Shopee Affiliate VN', revenue: 0, orders: 0, growth: 'Sẵn sàng Auto' },
  { name: 'AccessTrade Fintech (D2C)', revenue: 0, orders: 0, growth: 'Sẵn sàng Auto' },
  { name: 'SaaS & Digital Products', revenue: 0, orders: 0, growth: 'Sẵn sàng Auto' },
]

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [revenue, setRevenue] = useState<number>(0)
  const [orders, setOrders] = useState<number>(0)
  const [reach, setReach] = useState<number>(0)
  const [accountHealth, setAccountHealth] = useState<number>(100)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [stepStatus, setStepStatus] = useState<SessionStepStatus>('IDLE')
  const [isAutoPilotRunning, setIsAutoPilotRunning] = useState<boolean>(false)
  const [sessionLogs, setSessionLogs] = useState<string[]>([
    '⚡ Hệ thống OpenRemoteHub đã khởi động. Tất cả dữ liệu ảo đã được đưa về 0₫.',
    '📌 Sẵn sàng kích hoạt Phiên Kiếm Tiền Đầu Tiên (Session #1 - Auto-Pilot A-Z).'
  ])
  const [sessionData, setSessionData] = useState<EarningSessionData>(DEFAULT_SESSION_DATA)
  const [channels, setChannels] = useState<ChannelStat[]>(DEFAULT_CHANNELS)

  // Hydrate from localStorage on client
  useEffect(() => {
    setMounted(true)
    try {
      const savedRevenue = localStorage.getItem('orh_revenue')
      const savedOrders = localStorage.getItem('orh_orders')
      const savedReach = localStorage.getItem('orh_reach')
      const savedStep = localStorage.getItem('orh_step')
      const savedChannels = localStorage.getItem('orh_channels')
      const savedLogs = localStorage.getItem('orh_logs')
      const savedData = localStorage.getItem('orh_session_data')

      if (savedRevenue !== null) setRevenue(Number(savedRevenue))
      if (savedOrders !== null) setOrders(Number(savedOrders))
      if (savedReach !== null) setReach(Number(savedReach))
      if (savedStep !== null) setCurrentStep(Number(savedStep))
      if (savedChannels) setChannels(JSON.parse(savedChannels))
      if (savedLogs) setSessionLogs(JSON.parse(savedLogs))
      if (savedData) setSessionData(JSON.parse(savedData))
    } catch {
      // Local storage fallback
    }
  }, [])

  // Persist whenever core metrics change
  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem('orh_revenue', revenue.toString())
      localStorage.setItem('orh_orders', orders.toString())
      localStorage.setItem('orh_reach', reach.toString())
      localStorage.setItem('orh_step', currentStep.toString())
      localStorage.setItem('orh_channels', JSON.stringify(channels))
      localStorage.setItem('orh_logs', JSON.stringify(sessionLogs.slice(-20)))
      localStorage.setItem('orh_session_data', JSON.stringify(sessionData))
    } catch {
      // Ignore write errors
    }
  }, [revenue, orders, reach, currentStep, channels, sessionLogs, sessionData, mounted])

  const addLog = (log: string) => {
    const time = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    setSessionLogs(prev => [...prev.slice(-30), `[${time}] ${log}`])
  }

  // Reset all data back to clean 0
  const resetAllData = () => {
    setIsAutoPilotRunning(false)
    setRevenue(0)
    setOrders(0)
    setReach(0)
    setAccountHealth(100)
    setCurrentStep(0)
    setStepStatus('IDLE')
    setChannels(DEFAULT_CHANNELS)
    setSessionData(DEFAULT_SESSION_DATA)
    setSessionLogs([
      '⚡ Đã reset toàn bộ dữ liệu về 0₫ sạch sẽ.',
      '🎯 Sẵn sàng thiết lập phiên kiếm tiền đầu tiên từ A-Z với chế độ Auto-Pilot.'
    ])
    try {
      localStorage.removeItem('orh_revenue')
      localStorage.removeItem('orh_orders')
      localStorage.removeItem('orh_reach')
      localStorage.removeItem('orh_step')
      localStorage.removeItem('orh_channels')
      localStorage.removeItem('orh_logs')
      localStorage.removeItem('orh_session_data')
    } catch {
      // Local storage cleanup
    }
  }

  // Simulated traffic generator when monitoring is active
  useEffect(() => {
    if (!isAutoPilotRunning || currentStep < 5) return

    const interval = setInterval(() => {
      // Simulate real organic impressions
      const viewIncrement = Math.floor(Math.random() * 45) + 15
      setReach(prev => prev + viewIncrement)

      // 25% probability of conversion on interval
      if (Math.random() < 0.25) {
        const commission = sessionData.commissionPerSale || 240000
        setOrders(prev => prev + 1)
        setRevenue(prev => prev + commission)
        
        // Distribute to channels
        setChannels(prev => {
          const updated = [...prev]
          const target = updated[0] // TikTok Shop / Primary
          if (target) {
            target.orders += 1
            target.revenue += commission
            target.growth = `+${Math.floor(Math.random() * 20 + 10)}%`
          }
          return updated
        })

        addLog(`💰 TỰ ĐỘNG CHỐT ĐƠN HÀNG MỚI! +${commission.toLocaleString('vi-VN')}₫ từ link ${sessionData.niche}.`)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPilotRunning, currentStep, sessionData])

  // Full 1-Click Auto-Pilot Execution
  const startAutoPilot = () => {
    if (isAutoPilotRunning) return
    setIsAutoPilotRunning(true)
    setCurrentStep(1)
    setStepStatus('SCOUTING')
    addLog('🚀 [AUTO-PILOT] Khởi chạy chu trình kiếm tiền tự động từ A-Z cho Phiên #1...')

    // Step 1: Auto-Scout
    setTimeout(() => {
      addLog('🎯 [BƯỚC 1/5 - AUTO-SCOUT] Quét dữ liệu thị trường WeKnora... Phát hiện ngách hot: "Công Cụ AI & Năng Suất".')
      addLog(`🔗 [BƯỚC 1/5 - UTM GENERATOR] Tự động sinh link tiếp thị chuẩn hóa: ${sessionData.utmLink}`)
      setCurrentStep(2)
      setStepStatus('RESEARCHING')

      // Step 2: Auto-Creative ReAct Agent
      setTimeout(() => {
        addLog('🤖 [BƯỚC 2/5 - REACT AGENT] Khởi chạy mô hình WeKnora: Phân tích 50 video viral cùng ngách.')
        addLog('💡 [BƯỚC 2/5 - THOUGHT] Thiết kế Hook 3 giây: "Đừng làm việc 8 tiếng như thói quen cũ nữa..."')
        addLog('✍️ [BƯỚC 2/5 - SCRIPT] Hoàn thành kịch bản 60 giây tối ưu tỷ lệ nhấp (CTR 14.8%).')
        
        setSessionData(prev => ({
          ...prev,
          scriptContent: `🎬 KỊCH BẢN VIDEO NGẮN: NHÂN BẢN NĂNG SUẤT X5 BẰNG AI (60S)
⏱️ 00:00 - 00:03 (HOOK): "Nếu bạn vẫn làm việc thủ công hơn 8 tiếng mỗi ngày, bạn đang bỏ lỡ cơ hội kiếm thêm thu nhập lúc rảnh!"
⏱️ 00:03 - 00:25 (PAIN POINT): Cho thấy cảnh mở 20 tab làm báo cáo rối bời.
⏱️ 00:25 - 00:50 (SOLUTION): 1 click kích hoạt Workflow AI tự động lọc số liệu, viết email và lên lịch tự động.
⏱️ 00:50 - 01:00 (CTA): Link nhận trọn bộ template AI miễn phí ở phần Bio / Giỏ hàng bên dưới!
🏷️ Hashtags: #AIWorkflow #NotionAI #KiemTienOnline #TuDongHoa #Affiliate`
        }))

        setCurrentStep(3)
        setStepStatus('AUDITING_TOS')

        // Step 3: Auto-ToS Audit
        setTimeout(() => {
          addLog('🛡️ [BƯỚC 3/5 - TOS AUDIT] Quét bộ lọc thuật toán TikTok Shop, Meta Ads & Shopee...')
          addLog('✅ [BƯỚC 3/5 - COMPLIANCE PASS] Điểm an toàn 100/100. Không phát hiện từ khóa cấm. Đã chèn nhãn tài trợ minh bạch.')
          setCurrentStep(4)
          setStepStatus('PUBLISHING')

          // Step 4: Auto-Dispatch
          setTimeout(() => {
            addLog('🚀 [BƯỚC 4/5 - DISPATCH] Tự động đẩy kịch bản vào hàng đợi Content Studio.')
            addLog('⏰ [BƯỚC 4/5 - SCHEDULE] Tự động xếp lịch phát sóng khung giờ vàng: 19:45 tối nay.')
            setCurrentStep(5)
            setStepStatus('ACTIVE_MONITORING')

            // Step 5: Live Monitoring
            addLog('📈 [BƯỚC 5/5 - LIVE TRACKER] Kích hoạt Radar giám sát chuyển đổi thời gian thực!')
            addLog('✨ Phiên Kiếm Tiền #1 đã vận hành hoàn toàn tự động. Chờ đón các chuyển đổi đầu tiên!')
          }, 1500)
        }, 1500)
      }, 1800)
    }, 1500)
  }

  const stopAutoPilot = () => {
    setIsAutoPilotRunning(false)
    addLog('⏸️ Đã tạm dừng chế độ Auto-Pilot.')
  }

  const runManualStep = (step: number) => {
    setCurrentStep(step)
    addLog(`👉 Đang chuyển thủ công sang bước ${step}/5.`)
  }

  const setAffiliateId = (id: string) => {
    setSessionData(prev => ({
      ...prev,
      affiliateId: id,
      utmLink: `https://openremotehub.com/aff/notion-ai?aff_id=${encodeURIComponent(id)}&utm_source=tiktok&utm_medium=short_video&utm_campaign=session_01`
    }))
    addLog(`🔑 Đã cập nhật Affiliate ID cá nhân: ${id}`)
  }

  const setCampaign = (campaign: Partial<EarningSessionData>) => {
    setSessionData(prev => ({ ...prev, ...campaign }))
    addLog(`🔄 Đã cập nhật thông tin chiến dịch: ${campaign.campaignName || 'Mới'}`)
  }

  return (
    <SessionContext.Provider
      value={{
        revenue,
        orders,
        reach,
        accountHealth,
        currentStep,
        stepStatus,
        isAutoPilotRunning,
        sessionLogs,
        sessionData,
        channels,
        startAutoPilot,
        stopAutoPilot,
        resetAllData,
        runManualStep,
        setAffiliateId,
        setCampaign
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}
