import { Controller, Delete, Get, Res, HttpCode } from '@nestjs/common'
import type { Response } from 'express'

/**
 * Privacy endpoints — yêu cầu bởi GDPR và Nghị định 13/2023/NĐ-CP
 */

@Controller('privacy')
export class PrivacyController {
  /** GET /privacy/export — xuất tất cả dữ liệu của user (JSON) */
  @Get('export')
  export(@Res() res: Response) {
    // TODO: aggregate user data, consent history, content items
    res.json({ message: 'Chưa triển khai. Hoàn thành trước khi public.' })
  }
}

@Controller('me')
export class MeController {
  /** DELETE /me/data — xóa tài khoản và tất cả dữ liệu */
  @Delete('data')
  @HttpCode(200)
  async deleteMyData() {
    // 1. Revoke tất cả tokens
    // 2. Xóa connections, consents, content
    // 3. Soft delete user (30 ngày) → hard delete
    // 4. Audit log deletion event
    return { scheduled: true, deleteAt: 'in 30 days' }
  }
}
