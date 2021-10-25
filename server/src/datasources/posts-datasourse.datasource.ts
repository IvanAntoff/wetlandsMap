import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {configDB} from '../dbConf';
const config = configDB ? configDB : {
  name: process.env.DBNAME ?? 'posts_datasourse',
  connector: process.env.DBCONNECTOR ?? 'mongodb',
  url: process.env.DBURL ?? '',
  host: process.env.DBHOST ??'127.0.0.1',
  port: process.env.DBPORT ?? 27017,
  user: process.env.DBUSER ?? '',
  password: process.env.DBPASSWORD ?? '',
  database: process.env.DBDATABASE ??'humedales_posts',
  useNewUrlParser: process.env.DBUSENEWURLPARSER ?? true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/DB4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PostsDatasourseDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'posts_datasourse';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.posts_datasourse', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
