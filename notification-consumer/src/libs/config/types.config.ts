export interface EnvConfigurationType {
  environment: string;
  postgresqlDB: PostgresqlDBType;
  mongoDB: MongoDBType;
  rabbitMQ: RabbitMQType;
  soluciones: SolucionesType;
  sinapsis: SinapsisType;
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

export interface RabbitMQType {
  uri: string;
  queue: string;
}

export interface SolucionesType {
  baseUrl: string;
  username: string;
  password: string;
}

export interface SinapsisType {
  baseUrl: string;
  authorization: string;
}
