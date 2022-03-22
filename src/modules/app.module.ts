import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ReportModule } from './report.module'
import { RepositoryModule } from './repository.module'
import { StockPolicyModule } from './stockPolicy.module'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    RepositoryModule,
    ReportModule,
    StockPolicyModule
  ]
})

export class AppModule {}
