import { KVNamespace, D1Database, AnalyticsEngineDataset } from '@cloudflare/workers-types';
interface CloudflareEnv {
    CACHE: KVNamespace;
    D1: D1Database;
}

export type Env = CloudflareEnv;