import { Global, Module } from '@nestjs/common'
import { PrismaService } from '../configs/prisma.service'

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})

export class RepositoryModule {}
