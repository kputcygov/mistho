import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProviders } from '../../database.providers';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [...DatabaseProviders.getProviders()],
  exports: [...DatabaseProviders.getProviders()],
})
export class DatabaseModule {}
