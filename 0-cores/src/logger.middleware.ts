import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  Logger.log('Hello from middleware ...');
  res.locals.message = 'Assalomu alaykum';
  next();
};
