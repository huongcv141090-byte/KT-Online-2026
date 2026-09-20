import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common'

@Controller('connections')
export class ConnectionsController {
  /** GET /connections — danh sách connection của workspace hiện tại */
  @Get()
  list() {
    // TODO: trả về danh sách connections (không trả token)
    return []
  }

  /** POST /connections/:id/revoke — revoke và xóa connection */
  @Post(':id/revoke')
  @HttpCode(200)
  async revoke(@Param('id') id: string) {
    // TODO: gọi connector.revoke(), xóa token trong DB, audit log
    return { revoked: true, id }
  }
}
