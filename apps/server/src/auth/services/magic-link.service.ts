import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import {
  MagicLinkInvalidException,
  MagicLinkAlreadyUsedException,
  MagicLinkExpiredException,
} from '../../common/exceptions/app.exception';

const MAGIC_LINK_EXPIRES_MINUTES = 15;

@Injectable()
export class MagicLinkService {
  constructor(private prisma: PrismaService) {}

  async createMagicLink(email: string): Promise<{ token: string }> {
    const token = this.generateToken();
    const expiresAt = new Date(
      Date.now() + MAGIC_LINK_EXPIRES_MINUTES * 60 * 1000
    );

    await this.prisma.magicLink.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    console.log(`\n🔗 Magic Link for ${email}:`);
    console.log(`${frontendUrl}/auth/verify?token=${token}`);
    console.log(`Expires at: ${expiresAt.toLocaleString()}\n`);

    return { token };
  }

  async verifyMagicLink(token: string): Promise<string> {
    const magicLink = await this.prisma.magicLink.findUnique({
      where: { token },
    });

    if (!magicLink) {
      throw new MagicLinkInvalidException();
    }

    if (magicLink.usedAt) {
      throw new MagicLinkAlreadyUsedException();
    }

    if (magicLink.expiresAt < new Date()) {
      throw new MagicLinkExpiredException();
    }

    await this.prisma.magicLink.update({
      where: { token },
      data: { usedAt: new Date() },
    });

    return magicLink.email;
  }

  private generateToken(): string {
    return randomBytes(32).toString('hex');
  }
}
