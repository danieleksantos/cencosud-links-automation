import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import rateLimit from 'express-rate-limit';
import { fetchVtexProducts, VtexProduct, BANNERS_CONFIG } from './vtexClient.js';
import { findTopMatches } from './matcher.js';
import { getFromCache, saveToCache } from './cacheManager.js';

const app = express();
const PORT = process.env.PORT;
const API_KEY = process.env.API_ACCESS_KEY;

app.use(helmet()); 
app.use(cors({ origin: '*' })); 
app.use(express.json());

const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const userKey = req.headers['x-api-key'];
  if (userKey !== API_KEY) {
    return res.status(401).json({ error: "Acesso não autorizado. Chave de API inválida." });
  }
  next();
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 250, 
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Muitas requisições vindas deste IP. Tente novamente em alguns minutos." }
});


app.get('/search', authMiddleware, limiter, async (req, res) => {
  const query = (req.query.q as string)?.trim();
  const banner = (req.query.banner as string) || 'mercantil';

  if (!query) {
    return res.status(400).json({ error: "O termo de busca é obrigatório." });
  }

  if (!BANNERS_CONFIG[banner]) {
    return res.status(400).json({ error: "Bandeira não configurada." });
  }

  const queryLower = query.toLowerCase();

  try {
    const cached = await getFromCache(banner, queryLower);
    if (cached) {
      return res.json(cached);
    }


    const vtexProducts = await fetchVtexProducts(query, banner);
    
    const topMatches = findTopMatches(query, vtexProducts);

    const baseUrl = BANNERS_CONFIG[banner];
    const searchUrl = `${baseUrl}/${encodeURIComponent(query)}?_q=${encodeURIComponent(query)}&map=ft`;

    const response = {
      products: topMatches.map((p: VtexProduct) => ({
        name: p.productName,
        brand: p.brand,
        link: p.link,
        imageUrl: p.items?.[0]?.images?.[0]?.imageUrl || "",
        imageId: p.items?.[0]?.images?.[0]?.imageId || ""
      })),
      searchUrl
    };

    if (response.products.length > 0) {
      await saveToCache(banner, queryLower, response);
    }

    res.json(response);

  } catch (error) {
    console.error("Erro no servidor:", error);
    res.status(500).json({ error: "Erro interno ao processar a busca." });
  }
});

app.get('/status', (req, res) => {
  res.json({ status: "online", service: "Cencosud Links Automation" });
});

app.listen(PORT, () => {
  console.log(`
  🚀 Servidor Online!
  📡 Porta: ${PORT}
  🛡️  Segurança: Helmet & API Key Ativos
  `);
});