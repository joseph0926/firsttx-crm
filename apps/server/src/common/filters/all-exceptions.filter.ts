import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlContextType } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { AppException, ErrorCode, type AppExceptionResponse } from '../exceptions/app.exception';

interface HttpExceptionResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const contextType = host.getType<GqlContextType>();

    if (contextType === 'graphql') {
      return this.handleGraphQLException(exception, host);
    }

    return this.handleHttpException(exception, host);
  }

  private handleGraphQLException(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();

    let code: string;
    let message: string;
    let status: HttpStatus;
    let details: unknown;

    if (exception instanceof AppException) {
      const response = exception.getResponse() as AppExceptionResponse;
      code = response.code;
      message = response.message;
      status = exception.getStatus();
      details = response.details;
    } else if (exception instanceof HttpException) {
      const response = exception.getResponse();
      status = exception.getStatus();
      code = this.getCodeFromStatus(status);
      message = this.extractMessage(response, exception.message);
    } else if (exception instanceof Error) {
      code = ErrorCode.INTERNAL_SERVER_ERROR;
      message = exception.message;
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    } else {
      code = ErrorCode.INTERNAL_SERVER_ERROR;
      message = 'An unexpected error occurred';
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    this.logger.error(
      `GraphQL Error: ${message}`,
      exception instanceof Error ? exception.stack : undefined,
      {
        code,
        path: context?.req?.path,
        userId: context?.req?.user?.id,
      },
    );

    return new GraphQLError(message, {
      extensions: {
        code,
        status,
        details,
        timestamp: new Date().toISOString(),
      },
    });
  }

  private handleHttpException(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status: HttpStatus;
    let code: string;
    let message: string;
    let details: unknown;

    if (exception instanceof AppException) {
      const exceptionResponse = exception.getResponse() as AppExceptionResponse;
      status = exception.getStatus();
      code = exceptionResponse.code;
      message = exceptionResponse.message;
      details = exceptionResponse.details;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      code = this.getCodeFromStatus(status);
      message = this.extractMessage(exceptionResponse, exception.message);
    } else if (exception instanceof Error) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      code = ErrorCode.INTERNAL_SERVER_ERROR;
      message = exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      code = ErrorCode.INTERNAL_SERVER_ERROR;
      message = 'An unexpected error occurred';
    }

    this.logger.error(`HTTP Error: ${message}`, exception instanceof Error ? exception.stack : undefined, {
      code,
      path: request.url,
      method: request.method,
      userId: request.user?.id,
    });

    response.status(status).json({
      code,
      message,
      details,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private extractMessage(response: string | object, fallback: string): string {
    if (typeof response === 'string') {
      return response;
    }

    const httpResponse = response as HttpExceptionResponse;

    if (Array.isArray(httpResponse.message)) {
      return httpResponse.message[0];
    }

    return httpResponse.message || fallback;
  }

  private getCodeFromStatus(status: HttpStatus): string {
    switch (status) {
      case HttpStatus.UNAUTHORIZED:
        return ErrorCode.UNAUTHENTICATED;
      case HttpStatus.FORBIDDEN:
        return ErrorCode.FORBIDDEN;
      case HttpStatus.NOT_FOUND:
        return ErrorCode.NOT_FOUND;
      case HttpStatus.BAD_REQUEST:
        return ErrorCode.BAD_REQUEST;
      case HttpStatus.CONFLICT:
        return ErrorCode.ALREADY_EXISTS;
      default:
        return ErrorCode.INTERNAL_SERVER_ERROR;
    }
  }
}
