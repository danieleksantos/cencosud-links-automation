import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import rateLimit from 'express-rate-limit';
import { fetchVtexProducts, VtexProduct, BANNERS_CONFIG } from './vtexClient.js';
import { findTopMatches } from './matcher.js';
import { getFromCache, saveToCache } from './cacheManager.js';

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.API_ACCESS_KEY || 'Cencosud_Marketing_2024';

// --- Middlewares de Segurança ---
app.use(helmet()); // Protege contra vulnerabilidades HTTP comuns
app.use(cors({ origin: '*' })); // Em produção, substitua pelo domínio do seu front
app.use(express.json());

// Validador de Chave de Acesso
const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const userKey = req.headers['x-api-key'];
  if (userKey !== API_KEY) {
    return res.status(401).json({ error: "Acesso não autorizado. Chave de API inválida." });
  }
  next();
};

// Limitador de requisições para evitar bloqueios de IP na VTEX
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 250, // Limite global por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Muitas requisições vindas deste IP. Tente novamente em 15 minutos." }
});

/**
 * Rota Principal de Busca
 */
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
    // 1. Tentar Cache por bandeira
    const cached = await getFromCache(banner, queryLower);
    if (cached) {
      console.log(`🧠 [${banner.toUpperCase()}] Cache Hit: ${queryLower}`);
      return res.json(cached);
    }

    console.log(`🌐 [${banner.toUpperCase()}] Cache Miss: ${queryLower}`);

    // 2. Buscar na API da VTEX
    const vtexProducts = await fetchVtexProducts(query, banner);
    
    // 3. Matcher (Top 5 melhores resultados)
    const topMatches = findTopMatches(query, vtexProducts);

    // 4. Link de Busca Manual
    const baseUrl = BANNERS_CONFIG[banner];
    const searchUrl = `${baseUrl}/${encodeURIComponent(query)}?_q=${encodeURIComponent(query)}&map=ft`;

    // 5. Resposta com imageId oficial
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

    // 6. Salvar Cache
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
  res.json({ status: "online", service: "Cencosud Matcher Pro" });
});

app.listen(PORT, () => {
  console.log(`
  🚀 Servidor Profissional Online!
  📡 Porta: ${PORT}
  🛡️  Segurança: Helmet & API Key Ativos
  `);
});