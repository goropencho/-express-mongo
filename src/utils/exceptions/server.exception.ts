import {HttpException} from './http.exception';

export class InternalServerError extends HttpException {
  constructor(message?: string) {
    super(500, message ?? 'Something went wrong on the server-side');
  }
}
