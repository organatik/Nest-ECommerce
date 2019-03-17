import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus 
      ? exception.getStatus() 
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponce = {
      code: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.method,
      method: request.method,
      message: status !== HttpStatus.INTERNAL_SERVER_ERROR 
        ? exception.message.console.error || exception.message || null 
        : 'Internal SErver Error'

    };


    return response.status(status).json(errorResponce);



    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}