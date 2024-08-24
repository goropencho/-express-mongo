import {HttpException} from './http.exception';

class InternalServerException extends HttpException {
  constructor(message?: string) {
    super(500, message ?? 'Something went wrong on the server-side');
  }
}
