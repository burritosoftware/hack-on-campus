'use server';
import type { CfProperties, KVNamespace } from '@cloudflare/workers-types';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { MenuItem } from './types/dineOnCampusAPI';
import { nanoid } from 'nanoid'

export async function balls() {
  const { env, cf } = getRequestContext<{ env: CloudflareEnv, cf: CfProperties }>();

  console.log('balls', env, cf);

  const CACHE = env.CACHE as KVNamespace;
  const D1 = env.D1 as D1Database

  const { request, response } = cf;

  console.log('balls', CACHE, D1, request, response);``

  await CACHE.put('key', 'value');


  let res = await CACHE.get('key');

  console.log('balls', res);
}


export async function set_in_kv(key: string, value: string) {
  const { env, cf } = getRequestContext<{ env: CloudflareEnv, cf: CfProperties }>();

  // @ts-ignore
  await env.CACHE.put(key, value);
  
}

export async function getItem(id: string): Promise<MenuItem | {name : string}> {
  const { env, cf } = getRequestContext<{ env: CloudflareEnv, cf: CfProperties }>()

  // @ts-ignore
  const item = await env.CACHE.get(id);
  if (item === null) {
    return { name: id }
  }
  return JSON.parse(atob(item));
}


/**


[[d1_databases]]
binding = "D1" # i.e. available in your Worker on env.DB
database_name = "hack-on-campus"
database_id = "8ad7bba7-0f65-4614-93f0-662c4600ff3f"

D1 Tables

ratings
recipe_id: string, rating: string, submitter: string, date: string

recipies
recipe_id: string, name: string, description: string, author: string, rating: string, items: string

user_bookmarks
owner_id: string, recipe_id: string, date_added: string

```
export async function log_rating(user_id: string, rating: string): Promise {
  const { env, cf } = getRequestContext<{ env: CloudflareEnv, cf: CfProperties }>()

  // @ts-ignore
  await env.D1
    .prepare("INSERT INTO ratings (recipe_id, rating, submitter, date) VALUES (?1, ?2, ?3, ?4)")
    .bind("recipe_id", 230, "user_id", new Date().toISOString())
    .run()
}
```

 */
export async function add_rating(recipe_id: string, user_id: string, rating: number): Promise<any> {
  const { env, cf } = getRequestContext<{ env: CloudflareEnv, cf: CfProperties }>()

  // @ts-ignore
  await env.D1.prepare("INSERT INTO ratings (recipe_id, rating, submitter, date) VALUES (?1, ?2, ?3, ?4)").bind(recipe_id, rating, user_id, new Date().toISOString()).run()
}

export async function remove_rating(recipe_id: string, user_id: string): Promise<any> {
  const { env, cf } = getRequestContext<{ env: CloudflareEnv, cf: CfProperties }>()

  // @ts-ignore
  await env.D1.prepare("DELETE FROM ratings WHERE recipe_id = ?1 AND submitter = ?2").bind(recipe_id, user_id).run()
}

export async function add_bookmark(user_id: string, recipe_id: string): Promise<any> {
  const { env, cf } = getRequestContext<{ env: CloudflareEnv, cf: CfProperties }>()

  // @ts-ignore
  await env.D1.prepare("INSERT INTO user_bookmarks (owner_id, recipe_id, date_added) VALUES (?1, ?2, ?3)").bind(user_id, recipe_id, new Date().toISOString()).run()
}

export async function remove_bookmark(user_id: string, recipe_id: string): Promise<any> {
  const { env, cf } = getRequestContext<{ env: CloudflareEnv, cf: CfProperties }>()

  // @ts-ignore
  await env.D1.prepare("DELETE FROM user_bookmarks WHERE owner_id = ?1 AND recipe_id = ?2").bind(user_id, recipe_id).run()
}

export async function get_bookmarks(user_id: string): Promise<any> {
  const { env, cf } = getRequestContext<{ env: CloudflareEnv, cf: CfProperties }>()

  // @ts-ignore
  return await env.D1.prepare("SELECT * FROM user_bookmarks WHERE owner_id = ?1").bind(user_id).all()
}

export async function create_recipe(name: string, author: string, description: string, rating: number, items: MenuItem[]): Promise<any> {
  const { env, cf } = getRequestContext<{ env: CloudflareEnv, cf: CfProperties }>()

 
  // Generate a unique recipe ID
  const recipe_id = nanoid();

  try {
    // Execute the SQL query with properly bound parameters
    // @ts-ignore
    const result = await env.D1
      .prepare(
        `INSERT INTO recipes (recipe_id, name, author, description, rating, items) 
         VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
      )
      .bind(
        recipe_id,
        name,
        author,
        description,
        rating,
        JSON.stringify(items)
      )
      .run();

    console.log('Recipe creation result:', result);
    return { recipe_id, ...result };
  } catch (error) {
    console.error('D1 Query Error:', error);
    throw new Error('Failed to create the recipe.');
  }

}

export async function delete_recipe(recipe_id: string): Promise<any> {
  const { env, cf } = getRequestContext<{ env: CloudflareEnv, cf: CfProperties }>()

  // @ts-ignore
  await env.D1.prepare("DELETE FROM recipes WHERE recipe_id = ?1").bind(recipe_id).run()
}

export async function get_recipe(recipe_id: string): Promise<any> {
  const { env, cf } = getRequestContext<{ env: CloudflareEnv, cf: CfProperties }>()

  // @ts-ignore
  const { results } = await env.D1.prepare(`SELECT * FROM recipes WHERE recipe_id = "${recipe_id}"`).all();

  // @ts-ignore
  return results[0];

}

export async function get_recipes(): Promise<any> {
  const { env, cf } = getRequestContext<{ env: CloudflareEnv, cf: CfProperties }>()

  // @ts-ignore
  const { results } = await env.D1.prepare(`SELECT * FROM recipes`).all();

  // @ts-ignore
  return results;

}