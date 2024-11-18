import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/users/entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload): Promise<User>{

        const { id } = payload;

        // TODO: Comprobar si el usuario existe
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new UnauthorizedException('Token is not valid');
        }

        // TODO: Simplificar esto
        // if (!user.status !== User.STATUS.ACTIVE) {
        //     throw new UnauthorizedException('User');
        // }

        switch (user.status) {
            case User.STATUS.ACTIVE:
                break;
            case User.STATUS.INACTIVE:
                throw new UnauthorizedException('User is inactive');
            case User.STATUS.SUSPENDED:
                throw new UnauthorizedException('User is suspended');
        }

        return user;
    }

}