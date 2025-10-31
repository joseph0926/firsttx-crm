import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RequestMagicLinkInput } from './dto/request-magic-link.input';
import { VerifyMagicLinkInput } from './dto/verify-magic-link.input';
import { AuthResponse } from './dto/auth-response.dto';
import { MagicLinkResponse } from './dto/magic-link-response.dto';
import { MagicLinkService } from './services/magic-link.service';
import { AuthService } from './services/auth.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/user.entity';

const MAGIC_LINK_EXPIRES_MINUTES = 15;

@Resolver()
export class AuthResolver {
  constructor(
    private magicLinkService: MagicLinkService,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => MagicLinkResponse)
  async requestMagicLink(
    @Args('input') input: RequestMagicLinkInput,
  ): Promise<MagicLinkResponse> {
    const { email, name } = input;

    let user = await this.usersService.findByEmail(email);

    if (!user) {
      user = await this.usersService.create({ email, name });
    }

    await this.magicLinkService.createMagicLink(email);

    return {
      success: true,
      message: `Magic link sent to ${email}`,
      expiresInMinutes: MAGIC_LINK_EXPIRES_MINUTES,
    };
  }

  @Mutation(() => AuthResponse)
  async verifyMagicLink(
    @Args('input') input: VerifyMagicLinkInput,
  ): Promise<AuthResponse> {
    const email = await this.magicLinkService.verifyMagicLink(input.token);

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const accessToken = this.authService.generateToken(user);

    return {
      accessToken,
      user: user,
    };
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
