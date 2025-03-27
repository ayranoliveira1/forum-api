import { AuthGuard } from '@nestjs/passport'

export class JwtAuthGuart extends AuthGuard('jwt') {}
