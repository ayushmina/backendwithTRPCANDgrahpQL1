import { Request, Response, NextFunction } from 'express';

import { collectDefaultMetrics, Histogram } from 'prom-client';

import sendError from '../../helper/errorHanding';
import logger from '../../logger';

import {lookup} from 'geoip-lite';



const statusCodeCounts: Record<string, number> = {};

export const httpRequestDurationMicroseconds = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status', 'ip'],
    buckets: [0.1, 0.5, 1, 1.5, 2, 3, 4, 5] // Example buckets
});
export const databaseResponseTimeHistogram = new Histogram({
    name: "db_response_time_duration_seconds",
    help: "Database response time in seconds",
    labelNames: ["operation", "success"],
  });

export const prometheusMiddleware = async (req: any, res: Response, next: NextFunction) => {
    try {
      const start = Date.now();
      let timer=databaseResponseTimeHistogram.startTimer();

      res.on('finish', () => {
          const duration = Date.now() - start;
          httpRequestDurationMicroseconds
          .labels(req.method!, req.path, res.statusCode.toString(), req.ip)
          .observe(duration / 1000);
  
          // Increment status code count
          statusCodeCounts[res.statusCode] = (statusCodeCounts[res.statusCode] || 0) + 1;
          timer({operation:"hello",success:"true"})
  
          // Log request details with status code count
          // process.env.LOGGERENABLE?
          // logger.info(` IP :- 
          // ${req.ip} ${req.method}
          //  ${req.url} 
          //  ${res.statusCode} - ${duration}ms - 
          //  Count: ${statusCodeCounts[res.statusCode]}`):{}
      });
    //   req.geo = lookup(JSON.stringify(req.ip));
      return next();
      
    } catch (error) {
      return sendError(error,res);
    }

  };
  
