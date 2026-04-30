import fs from 'fs/promises';
import path from 'path';

// Define o caminho da pasta de cache
const CACHE_DIR = path.resolve('cache');

// Garante que a pasta 'cache' exista ao iniciar
async function ensureCacheDir() {
  try {
    await fs.access(CACHE_DIR);
  } catch {
    await fs.mkdir(CACHE_DIR);
  }
}

export async function getFromCache(banner: string, key: string) {
  await ensureCacheDir();
  const filePath = path.join(CACHE_DIR, `${banner}.json`);

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const cache = JSON.parse(data);
    return cache[key] || null;
  } catch {
    return null; // Arquivo não existe ainda
  }
}

export async function saveToCache(banner: string, key: string, value: any) {
  await ensureCacheDir();
  const filePath = path.join(CACHE_DIR, `${banner}.json`);

  let cache: Record<string, any> = {};

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    cache = JSON.parse(data);
  } catch {
    // Arquivo novo para esta bandeira
  }

  cache[key] = value;

  await fs.writeFile(filePath, JSON.stringify(cache, null, 2));
}