import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import type { Request } from 'express';
import { GoogleAuthService } from './google-auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly googleAuthService: GoogleAuthService) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const callbackURL = process.env.GOOGLE_OAUTH_CALLBACK_URL;

    super({
      clientID: clientID as string,
      clientSecret: clientSecret as string,
      callbackURL: callbackURL as string,
      scope: [
        'https://www.googleapis.com/auth/spreadsheets.readonly',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<void> {
    try {
      const userId = (req.query.state as string) || '';
      const primaryEmail =
        Array.isArray(profile.emails) && profile.emails.length > 0
          ? profile.emails[0].value
          : '';

      if (!userId) {
        return done(
          new Error('Missing userId in Google OAuth state'),
          undefined as any,
        );
      }

      if (!primaryEmail) {
        return done(
          new Error('Google profile has no primary email'),
          undefined as any,
        );
      }

      await this.googleAuthService.upsertGoogleAccount(
        userId,
        profile.id,
        primaryEmail,
        {
          access_token: accessToken,
          refresh_token: refreshToken,
        },
      );

      const payload = {
        userId,
        googleId: profile.id,
        email: primaryEmail,
      };

      return done(null, payload);
    } catch (error) {
      return done(error as Error, undefined as any);
    }
  }
}
