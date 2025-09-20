import { ofetch } from "ofetch";
import chalk from "chalk";
import type { Registry, RegistryItem } from "@/types/registry";

// Get registry URL from environment variable or use default
const getRegistryUrl = (): string => {
  return process.env.REGISTRY_URL ?? "https://foundry-ui.vercel.app/r";
};

const REGISTRY_URL = getRegistryUrl();

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
    `${REGISTRY_URL}/index.json`,
    `${REGISTRY_URL}/index.json`
  );
};

export const getRegistryItem = async (
  name: string
): Promise<RegistryItem | null> => {
  return fetchWithCache(
    `${REGISTRY_URL}/${name}.json`,
    `${REGISTRY_URL}/${name}.json`
  );
};
