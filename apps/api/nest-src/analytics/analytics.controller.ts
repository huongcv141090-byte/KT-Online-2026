import { Controller, Get } from '@nestjs/common'

@Controller('analytics')
export class AnalyticsController {
  @Get('overview')
  overview() {
    return {
      totalConnections: 0,
      totalPublished: 0,
      totalFailed: 0,
      lastUpdated: new Date().toISOString(),
    }
  }
}
