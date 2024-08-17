import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '~/drizzle/schema';

// for query purposes
const queryClient = postgres(process.env.DATABASE_URL as string);
export const db = drizzle(queryClient, { schema });
