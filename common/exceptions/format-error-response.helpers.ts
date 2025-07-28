import { HttpException } from '@nestjs/common';

interface ErrorResponse {
  error?: string;
  message?: string;
}

export function formatErrorResponse(error: unknown) {
  if (error instanceof HttpException) {
    const statusCode = error.getStatus();
    const response = error.getResponse();

    let errorDetails: ErrorResponse = {};

    // On gère les cas où response est un objet ou une string
    if (typeof response === 'object' && response !== null) {
      errorDetails = response as ErrorResponse;
    } else if (typeof response === 'string') {
      errorDetails.message = response;
    }

    const name = error.name.replace('Exception', '');

    const message = errorDetails.message ?? error.message;
    const errorType = errorDetails.error ?? name;

    return {
      success: false,
      code: `${errorType.toUpperCase().replaceAll(' ', '_')}_${statusCode}`,
      message,
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      code: `${error.name.toUpperCase()}_500`,
      message: error.message,
    };
  }

  return {
    success: false,
    code: 'INTERNAL_SERVER_ERROR_500',
    message: 'Une erreur inattendue est survenue',
  };
}
