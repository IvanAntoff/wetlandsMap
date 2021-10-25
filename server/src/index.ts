import {ApplicationConfig, ApiMap} from './application';
export * from './application';
const fs = require('fs');

export async function main(options: ApplicationConfig = {}) {
  const app = new ApiMap(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Env mod`,process.env.NODE_ENV);
  console.log(`Try`,process.env.APIEXPLORER, process.env.HOST);
  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      apiExplorer: {
        disabled: process.env.APIEXPLORER ?? false,
      },
      cors: {
        origin: ['https://humedalesdigitalescuencadelgualeguaychu.com', 'https://api.humedalesdigitalescuencadelgualeguaychu.com', 'http://68.233.231.176', 'http://68.233.231.176:3001/'],
        optionsSuccessStatus: 204,
      },
      port: +(process.env.PORT ?? 3001),
      host: process.env.HOST,
      // // Enable HTTPS
      // protocol: 'https',
      // key: fs.readFileSync('key.pem'),
      // cert: fs.readFileSync('cert.pem'),
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
