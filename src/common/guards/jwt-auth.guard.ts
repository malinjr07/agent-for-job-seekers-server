import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verify as cryptoVerify } from 'crypto';
import { jwtConfig } from '@config/jwt.config';
import { PrismaService } from '@prisma/prisma.service';

interface JwtPayload {
  sub: string;
  email: string;
  handle: string | null;
  iat: number;
  exp: number;
}

function base64UrlDecode(input: string): Buffer {
  let normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = normalized.length % 4;
  if (pad === 2) {
    normalized += '==';
  } else if (pad === 3) {
    normalized += '=';
  } else if (pad !== 0) {
    throw new UnauthorizedException('Invalid token encoding');
  }
  return Buffer.from(normalized, 'base64');
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader =
      (request.headers['authorization'] as string | undefined) ??
      (request.headers['Authorization'] as string | undefined);

    if (!authHeader || typeof authHeader !== 'string') {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid Authorization header');
    }

    const payload = this.verifyToken(token);

    if (payload.exp * 1000 <= Date.now()) {
      throw new UnauthorizedException('Token has expired');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user || user.status === 'DELETED') {
      throw new UnauthorizedException('User not found or deleted');
    }

    request.user = user;

    return true;
  }

  private verifyToken(token: string): JwtPayload {
    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new UnauthorizedException('Invalid token format');
    }

    const [encodedHeader, encodedPayload, encodedSignature] = parts;

    const headerJson = base64UrlDecode(encodedHeader).toString('utf8');
    const payloadJson = base64UrlDecode(encodedPayload).toString('utf8');

    let header: any;
    let payload: any;

    try {
      header = JSON.parse(headerJson);
      payload = JSON.parse(payloadJson);
    } catch {
      throw new UnauthorizedException('Invalid token payload');
    }

    if (header.alg !== jwtConfig.algorithm || header.typ !== 'JWT') {
      throw new UnauthorizedException('Invalid token header');
    }

    const data = `${encodedHeader}.${encodedPayload}`;
    const signature = base64UrlDecode(encodedSignature);

    const isValid = cryptoVerify(
      null,
      Buffer.from(data),
      jwtConfig.publicKey,
      signature,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid token signature');
    }

    return payload as JwtPayload;
  }
}
