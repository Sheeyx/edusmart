import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  
  @Catch()
  export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR; // Default status
      let message: any = 'Internal server error'; // Default message
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const errorResponse = exception.getResponse();
  
        if (typeof errorResponse === 'object' && errorResponse !== null) {
          // Agar obyekt bo'lsa, xabarni tekshirish
          const responseMessage = (errorResponse as any).message;
  
          if (Array.isArray(responseMessage)) {
            message = responseMessage; // Validatsiya xatosi massiv bo'lsa
          } else if (typeof responseMessage === 'string') {
            message = responseMessage; // Oddiy string bo'lsa
          } else {
            message = errorResponse; // To‘liq javob obyektini qaytarish
          }
        } else {
          message = errorResponse; // Oddiy string bo'lsa
        }
      }
  
      // Xatoni formatlash
      const errorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: Array.isArray(message) ? message : [message], // Har doim massiv qilib qaytarish
      };
  
      console.error('GLOBAL ERROR:', errorResponse);
  
      // Javobni qaytarish
      response.status(status).json(errorResponse);
    }
  }
  