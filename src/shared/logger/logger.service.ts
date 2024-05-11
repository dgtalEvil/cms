import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private logger = new Logger();

  log(message: string, context?: string) {
    this.logger.log(message);
    if (context) this.logger.log(context);
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message);
    if (trace) this.logger.error(trace);
    if (context) this.logger.error(context);
  }

  warn(message: string, context?: string) {
    this.logger.warn(message);
    if (context) this.logger.warn(context);
  }

  debug(message: string, context?: string) {
    this.logger.debug(message);
    if (context) this.logger.debug(context);
  }

  info(message: string, context?: string) {
    this.logger.log(message);
    if (context) this.logger.log(context);
  }
}
