import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getHello')
  @Header('Content-Type', 'application/json')
  getHello(): any {
    const temp = this.appService.getHello();
    return { name: temp };
  }
}
