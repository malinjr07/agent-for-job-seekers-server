import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { google, Auth } from 'googleapis';

@Injectable()
export class GoogleAuthService {
  constructor(private readonly prisma: PrismaService) {}

  private createOAuthClient(): Auth.OAuth2Client {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_OAUTH_CALLBACK_URL;

    if (!clientId || !clientSecret || !redirectUri) {
      throw new InternalServerErrorException(
        'Google OAuth environment variables are not configured',
      );
    }

    return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  }

  async upsertGoogleAccount(
    userId: string,
    googleId: string,
    email: string,
    tokens: any,
  ) {
    return this.prisma.googleAccount.upsert({
      where: {
        userId_googleId: {
          userId,
          googleId,
        },
      },
      create: {
        userId,
        googleId,
        email,
        tokens,
      },
      update: {
        email,
        tokens,
      },
    });
  }

  async getOAuthClientForUser(userId: string): Promise<Auth.OAuth2Client> {
    const account = await this.prisma.googleAccount.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!account) {
      throw new NotFoundException(
        'Google account is not connected for this user',
      );
    }

    const client = this.createOAuthClient();
    client.setCredentials(account.tokens as any);

    return client;
  }
}
