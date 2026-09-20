import { Injectable, BadRequestException } from '@nestjs/common'
import { generatePkce } from '@orh/auth'
import { createOAuthState, validateOAuthState, validateRedirectUri } from '@orh/auth'
import { encrypt } from '@orh/crypto'
import { OrhError } from '@orh/shared'
import { CURRENT_POLICY_VERSION, isConsentRequired } from '@orh/policy'
import type { Provider } from '@orh/shared'

// Connector registry
import { GoogleConnector } from '@orh/connectors'
import { MetaConnector } from '@orh/connectors'
import { InstagramConnector } from '@orh/connectors'
import { TikTokConnector } from '@orh/connectors'
import { GitHubConnector } from '@orh/connectors'

const CONNECTORS: Record<string, any> = {
  google: new GoogleConnector(),
  facebook: new MetaConnector(),
  instagram: new InstagramConnector(),
  tiktok: new TikTokConnector(),
  github: new GitHubConnector(),
}

@Injectable()
export class AuthService {
  async startOAuth(providerName: string, session: Record<string, any>) {
    const connector = CONNECTORS[providerName]
    if (!connector) throw new BadRequestException(`Provider không hỗ trợ: ${providerName}`)

    const { codeVerifier, codeChallenge } = generatePkce()
    const workspaceId = session.workspaceId
    if (!workspaceId) throw new BadRequestException('Session không hợp lệ.') 

    const redirectUri = `${process.env.API_URL}/auth/${providerName}/callback`
    const oauthState = createOAuthState({
      workspaceId,
      provider: providerName,
      codeVerifier,
      redirectUri,
    })

    // Lưu vào session (server-side HttpOnly cookie)
    session.oauthPending = oauthState
    // KHÔNG log codeVerifier hay state.value

    const url = connector.authorizationUrl({
      workspaceId,
      redirectUri,
      codeChallenge,
    })

    return { url }
  }

  async handleCallback(
    providerName: string,
    code: string,
    receivedState: string,
    session: Record<string, any>,
  ) {
    const connector = CONNECTORS[providerName]
    if (!connector) throw new BadRequestException(`Provider không hỗ trợ: ${providerName}`)

    const pending = session.oauthPending
    if (!pending) throw new BadRequestException('Không tìm thấy OAuth session.')

    // Kiểm tra state (CSRF protection)
    validateOAuthState(pending, receivedState)

    // Kiểm tra redirect URI
    validateRedirectUri(
      pending.redirectUri,
      [`${process.env.API_URL}/auth/${providerName}/callback`],
    )

    // Đổi code lấy token (với PKCE)
    const tokenSet = await connector.exchangeCode({
      code,
      state: receivedState,
      redirectUri: pending.redirectUri,
      codeVerifier: pending.codeVerifier,
    })

    // Mã hóa token trước khi lưu
    const encryptedAccess = encrypt(tokenSet.accessToken)
    const encryptedRefresh = tokenSet.refreshToken ? encrypt(tokenSet.refreshToken) : undefined

    // Lấy identity tối thiểu
    const identity = await connector.getIdentity({
      encryptedAccessToken: encryptedAccess,
      providerUserId: 'pending',
    } as any)

    // TODO: Lưu connection vào DB (DB service inject)
    // TODO: Lưu consent record (consent first)

    // Xóa pending state
    delete session.oauthPending

    return identity
  }
}
