export interface EnvConfigurationType {
  environment: string;
  postgresqlDB: PostgresqlDBType;
  mongoDB: MongoDBType;
}

export interface PostgresqlDBType {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

export interface MongoDBType {
  uri: string;
  database: string;
}
