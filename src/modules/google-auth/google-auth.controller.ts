import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { GoogleAuthGuard } from '@guards/google-auth.guard';

@Controller('google')
export class GoogleAuthController {
  @Get('auth')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {}

  @Get('callback')
  @UseGuards(GoogleAuthGuard)
  @HttpCode(HttpStatus.OK)
  googleAuthCallback(@Req() req: Request) {
    return {
      status: 'connected',
      user: req.user,
    };
  }
}
