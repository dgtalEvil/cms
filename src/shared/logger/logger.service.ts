import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private logger = new Logger();

  log(message: string, context?: string) {
    this.logger.log(message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, trace, context);
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, context);
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, context);
  }

  info(message: string, context?: string) {
    this.logger.log(message, context);
  }
}
