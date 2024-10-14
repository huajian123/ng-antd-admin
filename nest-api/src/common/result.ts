// https://blog.csdn.net/gaotlantis/article/details/139467995

import { HttpStatus } from '@nestjs/common';

export class ResultData {
  constructor(
    public code = HttpStatus.OK,
    public message = '',
    public data: any,
  ) {}

  static success(data: any, message = '') {
    return new ResultData(HttpStatus.OK, message, data);
  }

  static fail(code = HttpStatus.BAD_REQUEST, data: any, message = '') {
    return new ResultData(code, message, data);
  }
}
