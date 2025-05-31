export interface EnvConfigurationType {
  environment: string;
  bdCore: BdCore;
}

export interface BdCore {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}
