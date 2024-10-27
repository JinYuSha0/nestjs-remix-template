import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RemixModule } from 'nestjs-remix';
import * as path from 'path';

@RemixModule({
  publicDir: path.join(process.cwd(), 'public'),
  browserBuildDir: path.join(process.cwd(), 'build'),
  remixServerDir: path.join(process.cwd(), './dist/routes/server'),
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
