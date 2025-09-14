import { ofetch } from "ofetch";

// const REGISTRY_BASE_URL = "https://foundry-ui.vercel.app/r";
const REGISTRY_BASE_URL = "http://localhost:3000/r";

const cache = new Map<string, any>();

export async function fetchWithCache<T>(
  key: string,
  url: string
): Promise<T | null> {
  if (cache.has(key)) return cache.get(key);

  try {
    const data = await ofetch<T>(url, { parseResponse: JSON.parse });
    cache.set(key, data);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch ${url}`);
  }
}

export async function getRegistryIndex() {
  return fetchWithCache(
    `${REGISTRY_BASE_URL}/index.json`,
    `${REGISTRY_BASE_URL}/index.json`
  );
}

export async function getRegistryItem(name: string) {
  return fetchWithCache(
    `${REGISTRY_BASE_URL}/${name}.json`,
    `${REGISTRY_BASE_URL}/${name}.json`
  );
}
