import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from "../entities/user.entity";
import type { Repository } from "typeorm";
import { ConfigService } from '@nestjs/config';
import type { jwtPayload } from "../interfaces";

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        configService: ConfigService,
    ) {
        super({
            secretOrKey: configService.get<string>('JWT_SECRET')!,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: jwtPayload): Promise<User> {
        const { id } = payload;

        const user = await this.userRepository.findOneBy({ id })

        if (!user) 
            throw new UnauthorizedException('Token not valid')

        if (!user.isActive) 
            throw new UnauthorizedException('User is inactive, talk with an admin')

        return user;
    }
}