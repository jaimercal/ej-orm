import { Module } from '@nestjs/common';
import { OlaService } from './ola.service';
import { OlaController } from './ola.controller';

@Module({
  controllers: [OlaController],
  providers: [OlaService]
})
export class OlaModule {}
