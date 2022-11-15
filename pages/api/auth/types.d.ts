import { JWT } from "next-auth/jwt";

export interface User {
   username?: string;
   accessToken?: string;
   refreshToken?: string;
}

export interface ExtendedJWT extends JWT {
   username: string;
   accessToken: string;
   refreshToken: string;
   tokenExpires: number;
}