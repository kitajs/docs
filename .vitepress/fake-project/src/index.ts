import { Kita } from '@kitajs/runtime';
import fastify from 'fastify';

const app = fastify({ logger: true });

app.register(Kita, {
  fastifyScalarUi: !process.env.PRODUCTION as false
});

app.listen({ port: 1227 });
