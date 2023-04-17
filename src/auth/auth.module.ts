import { Global, Module } from '@nestjs/common';
import { ApiModule } from 'src/api/api.module';
import { AuthService } from './auth.service';


@Global()
@Module({
    imports: [ApiModule],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
