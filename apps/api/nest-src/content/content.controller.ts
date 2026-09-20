import { Controller, Get, Post, Param, Body, HttpCode } from '@nestjs/common'

/**
 * Luồng content:
 * 1. Tạo content item (draft)
 * 2. Upload media
 * 3. Manager approve
 * 4. Publish (qua queue, không publish trực tiếp)
 */

@Controller('content')
export class ContentController {
  /** POST /content — tạo content item mới */
  @Post()
  create(@Body() body: any) {
    // Validate: caption, media_urls, scheduled_at, connection_id
    // Trạng thái mặc định: draft
    return { id: 'todo', status: 'draft' }
  }

  /** POST /content/:id/approve — approve để đưa vào queue publish */
  @Post(':id/approve')
  @HttpCode(200)
  approve(@Param('id') id: string) {
    // Chỉ user có quyền approve mới gọi được
    // Cập nhật approval_status = approved
    return { id, approved: true }
  }

  /** POST /content/:id/publish — đưa vào queue (KHÔNG publish trực tiếp) */
  @Post(':id/publish')
  @HttpCode(200)
  publish(@Param('id') id: string) {
    // Kiểm tra approval_status === approved trước khi enqueue
    // Tạo job với idempotency_key
    return { id, queued: true }
  }
}
