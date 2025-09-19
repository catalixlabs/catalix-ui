import { ofetch } from "ofetch";
import type { Registry, RegistryItem } from "@/types/registry";
import chalk from "chalk";

// const REGISTRY_BASE_URL = "https://foundry-ui.vercel.app/r";
const REGISTRY_BASE_URL = "http://localhost:3000/r";

const cache = new Map<string, any>();

export const fetchWithCache = async <T>(
  key: string,
  url: string
): Promise<T | null> => {
  if (cache.has(key)) return cache.get(key);

  try {
    const data = await ofetch<T>(url, { parseResponse: JSON.parse });
    cache.set(key, data);
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch ${url}\n${chalk.cyan("Suggestion: Check if the item name is correct")}`
    );
  }
};

export const getRegistryIndex = async (): Promise<Registry | null> => {
  return fetchWithCache(
    `${REGISTRY_BASE_URL}/index.json`,
    `${REGISTRY_BASE_URL}/index.json`
  );
};

export const getRegistryItem = async (
  name: string
): Promise<RegistryItem | null> => {
  return fetchWithCache(
    `${REGISTRY_BASE_URL}/${name}.json`,
    `${REGISTRY_BASE_URL}/${name}.json`
  );
};
