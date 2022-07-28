import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dataProviders } from '../../database.providers';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [...dataProviders],
  exports: [...dataProviders],
})
export class DatabaseModule {}
