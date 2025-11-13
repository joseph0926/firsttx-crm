import { HttpException, HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  MAGIC_LINK_EXPIRED = 'MAGIC_LINK_EXPIRED',
  MAGIC_LINK_INVALID = 'MAGIC_LINK_INVALID',
  MAGIC_LINK_ALREADY_USED = 'MAGIC_LINK_ALREADY_USED',
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
}

export interface AppExceptionResponse {
  code: ErrorCode;
  message: string;
  details?: unknown;
  timestamp?: string;
  path?: string;
}

export class AppException extends HttpException {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    public readonly details?: unknown,
  ) {
    super(
      {
        code,
        message,
        details,
        timestamp: new Date().toISOString(),
      } as AppExceptionResponse,
      status,
    );
  }
}

export class UnauthenticatedException extends AppException {
  constructor(message = 'Authentication required') {
    super(ErrorCode.UNAUTHENTICATED, message, HttpStatus.UNAUTHORIZED);
  }
}

export class UnauthorizedException extends AppException {
  constructor(message = 'Access denied') {
    super(ErrorCode.UNAUTHORIZED, message, HttpStatus.FORBIDDEN);
  }
}

export class InvalidTokenException extends AppException {
  constructor(message = 'Invalid token') {
    super(ErrorCode.INVALID_TOKEN, message, HttpStatus.UNAUTHORIZED);
  }
}

export class TokenExpiredException extends AppException {
  constructor(message = 'Token expired') {
    super(ErrorCode.TOKEN_EXPIRED, message, HttpStatus.UNAUTHORIZED);
  }
}

export class MagicLinkExpiredException extends AppException {
  constructor(message = 'Magic link has expired') {
    super(ErrorCode.MAGIC_LINK_EXPIRED, message, HttpStatus.BAD_REQUEST);
  }
}

export class MagicLinkInvalidException extends AppException {
  constructor(message = 'Invalid magic link') {
    super(ErrorCode.MAGIC_LINK_INVALID, message, HttpStatus.BAD_REQUEST);
  }
}

export class MagicLinkAlreadyUsedException extends AppException {
  constructor(message = 'Magic link has already been used') {
    super(ErrorCode.MAGIC_LINK_ALREADY_USED, message, HttpStatus.BAD_REQUEST);
  }
}

export class ResourceNotFoundException extends AppException {
  constructor(resource: string, identifier?: string) {
    const message = identifier
      ? `${resource} with identifier '${identifier}' not found`
      : `${resource} not found`;
    super(ErrorCode.NOT_FOUND, message, HttpStatus.NOT_FOUND);
  }
}

export class ResourceAlreadyExistsException extends AppException {
  constructor(resource: string, field?: string) {
    const message = field
      ? `${resource} with this ${field} already exists`
      : `${resource} already exists`;
    super(ErrorCode.ALREADY_EXISTS, message, HttpStatus.CONFLICT);
  }
}

export class ValidationException extends AppException {
  constructor(message: string, details?: unknown) {
    super(ErrorCode.VALIDATION_ERROR, message, HttpStatus.BAD_REQUEST, details);
  }
}

export class InvalidInputException extends AppException {
  constructor(message: string, details?: unknown) {
    super(ErrorCode.INVALID_INPUT, message, HttpStatus.BAD_REQUEST, details);
  }
}

export class ForbiddenException extends AppException {
  constructor(message = 'You do not have permission to perform this action') {
    super(ErrorCode.FORBIDDEN, message, HttpStatus.FORBIDDEN);
  }
}
