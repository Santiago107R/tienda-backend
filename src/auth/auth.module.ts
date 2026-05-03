import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProductModule } from 'src/product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStategy } from './strategy/jwt-strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStategy],
  imports: [
    ConfigModule,

    TypeOrmModule.forFeature([User]),
    
    forwardRef(() => ProductModule),
    
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {

        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h'
          }
        }
      }
    })

  ],
  exports: [
    TypeOrmModule, JwtModule, PassportModule, JwtStategy
  ],
})
export class AuthModule { }
