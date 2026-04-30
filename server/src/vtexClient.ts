import axios from 'axios';

/**
 * Interface oficial baseada na resposta da API de Busca da VTEX
 */
export interface VtexProduct {
  productName: string;
  brand: string;
  link: string;
  items: Array<{
    itemId: string;
    images: Array<{
      imageUrl: string;
      imageId: string; // ID exato da imagem para o teu Marketing
    }>;
  }>;
}

/**
 * Configuração das URLs das bandeiras Cencosud
 */
export const BANNERS_CONFIG: Record<string, string> = {
  mercantil: 'https://www.mercantilatacado.com.br',
  prezunic: 'https://www.prezunic.com.br',
  giga: 'https://www.giga.com.vc',
  gbarbosa: 'https://www.gbarbosa.com.br',
  bretas: 'https://www.bretas.com.br',
};

/**
 * Procura produtos na VTEX simulando um navegador real
 */
export const fetchVtexProducts = async (term: string, banner: string): Promise<VtexProduct[]> => {
  try {
    const baseUrl = BANNERS_CONFIG[banner] || BANNERS_CONFIG.mercantil;
    const apiUrl = `${baseUrl}/api/catalog_system/pub/products/search?ft=${encodeURIComponent(term)}`;
    
    const response = await axios.get(apiUrl, { 
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // User-Agent real para evitar bloqueios de IP
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
      }
    });

    return response.data;
  } catch (error: any) {
    console.error(`❌ Erro VTEX [${banner}]:`, error.response?.status === 429 ? "Rate Limit Atingido" : error.message);
    return [];
  }
};