import { config } from "../config";
import { sign, verify } from "jsonwebtoken";
import { EncodeToken, JwtResult, UserAuthToken } from "./dto.module";

class JwtModule {
    private readonly jwtKey = config.jwtKey;
    private readonly jwtLifeTime = config.jwtLifeTime;

    issueEdit = (data: object, lifeTime: number): JwtResult => {
        const token = sign({ data }, this.jwtKey, {
            expiresIn: lifeTime,
        });

        return {
            token,
            lifeTime,
        };
    };

    issue = (data: UserAuthToken): JwtResult => {
        const token = sign({ data }, this.jwtKey, {
            expiresIn: this.jwtLifeTime,
        });

        return {
            token,
            lifeTime: this.jwtLifeTime,
        };
    };

    issueWithAudience = (data: UserAuthToken, audience: string): JwtResult => {
        const token = sign({ data: { xid: data.xid, username: data.username } }, this.jwtKey, {
            expiresIn: this.jwtLifeTime,
            audience: audience,
        });

        return {
            token,
            lifeTime: this.jwtLifeTime,
        };
    };

    verifyWithAudience = (token: string, audience: string[]): EncodeToken => {
        return verify(token, this.jwtKey, {
            audience: audience,
        }) as EncodeToken;
    };

    verify = (token: string): EncodeToken => {
        return verify(token, this.jwtKey) as EncodeToken;
    };
}

export const jwtModule = new JwtModule();
