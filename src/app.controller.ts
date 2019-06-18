import {
    Controller, FileInterceptor,
    FilesInterceptor,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiExcludeEndpoint()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
   uploadFile(@UploadedFile() file) {
    console.log(file);
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    console.log(image);
    return res.sendFile(image, {root: './uploads'});
  }
}
