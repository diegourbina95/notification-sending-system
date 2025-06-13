export const PROVIDER_TYPES = ['SOLUCIONES', 'SINAPSIS'] as const;

export type ProviderTypes = (typeof PROVIDER_TYPES)[number];
