import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from './files/files.module';
import { join } from 'path';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PGHOST'),
        port: +(configService.get('PGPORT') ?? 5432),
        database: configService.get('PGDATABASE'),
        username: configService.get('PGUSER'),
        password: configService.get('PGPASSWORD'),
        autoLoadEntities: true,
        synchronize: false,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
      inject: [ConfigService],
    }),

    FilesModule,

    ProductModule,

    CategoryModule,

    CommonModule,

    AuthModule,

    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
