import { Controller, Get, Query, Param, Res, Session, HttpCode } from '@nestjs/common'
import { AuthService } from './auth.service'
import type { Response } from 'express'

/**
 * OAuth Flow (per provider):
 * GET /auth/:provider/start   → redirect user sang provider
 * GET /auth/:provider/callback → nhận code, đổi token, lưu connection
 */

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(':provider/start')
  async start(
    @Param('provider') provider: string,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    // Tạo state + PKCE, lưu vào session (server-side, HttpOnly)
    const { url } = await this.authService.startOAuth(provider, session)
    // KHÔNG log url (có thể chứa state)
    res.redirect(url)
  }

  @Get(':provider/callback')
  async callback(
    @Param('provider') provider: string,
    @Query('code') code: string,
    @Query('state') state: string,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    // Kiểm tra state, PKCE; đổi code lấy token; lưu connection
    await this.authService.handleCallback(provider, code, state, session)
    res.redirect(`${process.env.APP_URL}/settings/connections?connected=${provider}`)
  }
}
