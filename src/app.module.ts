import { Module } from '@nestjs/common';
import { HttpModule } from './Infra/View-models/http.module';
import { DatabaseModule } from './Infra/Database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {}
