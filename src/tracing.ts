// import { Logger } from '@nestjs/common';
import { PrismaInstrumentation } from '@prisma/instrumentation';

import { getNodeAutoInstrumentations, TracingSDK } from 'tracing-sdk';

const nodeAutoInstrumentations = getNodeAutoInstrumentations({
  '@opentelemetry/instrumentation-nestjs-core': { enabled: true },
  '@opentelemetry/instrumentation-pg': { enabled: true },
  '@opentelemetry/instrumentation-pino': { enabled: true },
  '@opentelemetry/instrumentation-http': { enabled: true },
  '@opentelemetry/instrumentation-ioredis': { enabled: true },
  '@opentelemetry/instrumentation-express': { enabled: true, ignoreLayers: ['/health'] },
});

/**
 * https://github.com/prisma/prisma/tree/main/packages/instrumentation
 */
const prismaInstrumentation = new PrismaInstrumentation();

export const otelSDK = new TracingSDK({
  enableMetrics: true,
  enableTracing: true,
  // logger: new Logger('TracingSDK'),
  instrumentations: [...nodeAutoInstrumentations, prismaInstrumentation],
});
