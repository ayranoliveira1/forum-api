import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envShema } from './env/env'
import { AuthModule } from './auth/auth.module'
import { HttpModule } from './http/http.module'
import { EnvModule } from './env/env.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envShema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    EnvModule,
  ],
})
export class AppModule {}
