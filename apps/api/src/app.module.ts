import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConnectionsModule } from './connections/connections.module'
import { ContentModule } from './content/content.module'
import { AnalyticsModule } from './analytics/analytics.module'
import { PrivacyModule } from './privacy/privacy.module'

@Module({
  imports: [
    AuthModule,
    ConnectionsModule,
    ContentModule,
    AnalyticsModule,
    PrivacyModule,
  ],
})
export class AppModule {}
