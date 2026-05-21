import type { AuthConfig } from '@/server/auth/type';

const jwtSecret = process.env.AUTH_JWT_SECRET;
if (!jwtSecret) {
    throw new Error('AUTH_JWT_SECRET environment variable is required. Run `pnpm setEnv` to generate one.');
}

export const authConfig: AuthConfig = {
    jwtSecret,
    tokenExpiry: { days: 5 },
};
