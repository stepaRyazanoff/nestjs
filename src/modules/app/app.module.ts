import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/usersModule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurations from '../../configurations';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TokenModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: function (configService: ConfigService) {
        return {
          dialect: 'postgres',
          host: configService.get('db_host'),
          port: configService.get('db_port'),
          database: configService.get('db_name'),
          username: configService.get('db_user'),
          password: configService.get('db_password'),
          synchronize: true,
          autoLoadModels: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
