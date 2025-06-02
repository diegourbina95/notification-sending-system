export const PROVIDER_TYPES = ['SMS_SOLUCIONES'] as const;

export type ProviderTypes = (typeof PROVIDER_TYPES)[number];
