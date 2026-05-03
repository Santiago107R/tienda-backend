import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductModule } from '../product/product.module';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    ProductModule,
    CategoryModule,
    AuthModule,
  ],
})
export class SeedModule {}
