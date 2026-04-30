import React, { useState } from 'react';
import {
  Search,
  Loader2,
  PackageSearch,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import { type SearchResponse, type Banner } from './types';

const BANNERS: Banner[] = [
  {
    id: 'mercantil',
    name: 'Mercantil',
    logo: 'https://mercantilatacado.vtexassets.com/arquivos/logo_mercantil.svg',
  },
  {
    id: 'prezunic',
    name: 'Prezunic',
    logo: 'https://prezunic.vtexassets.com/assets/vtex/assets-builder/prezunic.prezunic-store/7.2.30/logo-prezunic___cddf762e9bb79e2e52164812f61a30c5.svg',
  },
  {
    id: 'giga',
    name: 'Giga',
    logo: 'https://gigavc.vtexassets.com/arquivos/logo_giga.svg',
  },
  {
    id: 'gbarbosa',
    name: 'GBarbosa',
    logo: 'https://gbarbosa.vtexassets.com/assets/vtex.file-manager-graphql/images/8f812afe-81af-47d6-8550-9e7c53e84898___0fb5883535fd8ef80580b3c75fa56c64.svg',
  },
  {
    id: 'bretas',
    name: 'Bretas',
    logo: 'https://bretas.vtexassets.com/assets/vtex/assets-builder/bretas.bretas-store/6.1.20/logo-bretas___0fc58c6e9ad3eea6af8f998a9e969c57.svg',
  },
];

function App() {
  const [query, setQuery] = useState<string>('');
  const [banner, setBanner] = useState<string>('mercantil');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const activeBanner = BANNERS.find((b) => b.id === banner);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setData(null);
    setError(null);

    try {
      const resp = await fetch(
        `http://localhost:3001/search?q=${encodeURIComponent(query)}&banner=${banner}`,
        {
          headers: {
            'x-api-key': 'Cencosud_C&CB_2026',
          },
        },
      );

      const result = await resp.json();

      if (!resp.ok) {
        if (resp.status === 429)
          throw new Error('Limite de buscas atingido. Aguarde alguns minutos.');
        if (resp.status === 401)
          throw new Error('Chave de acesso inválida ou expirada.');
        throw new Error(
          result.error || 'Ocorreu um erro no processamento da busca.',
        );
      }

      setData(result as SearchResponse);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(
          err.message === 'Failed to fetch'
            ? 'SERVIDOR OFFLINE: O backend não está rodando ou a porta 3001 está bloqueada.'
            : err.message,
        );
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false);
    }
  };

  const copy = (txt: string, id: string): void => {
    navigator.clipboard.writeText(txt);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 1000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-10 font-sans selection:bg-cyan-500/30">
      <Header />

      <main className="max-w-5xl mx-auto">
        <section className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 mb-16 items-center justify-items-center">
          {BANNERS.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                setBanner(b.id);
                setError(null);
              }}
              className="relative focus:outline-none group cursor-pointer transition-transform active:scale-95"
            >
              <img
                src={b.logo}
                alt={b.name}
                className={`max-h-17 w-auto object-contain transition-all duration-300 ${
                  banner === b.id
                    ? 'opacity-100 grayscale-0 scale-110 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                    : 'opacity-70 grayscale-50 hover:opacity-100 hover:grayscale-0'
                }`}
              />
              {banner === b.id && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-cyan-500 rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </section>

        <form
          onSubmit={handleSearch}
          className="flex gap-2 mb-6 bg-slate-900/50 p-2 rounded-full border border-slate-800 shadow-2xl focus-within:border-cyan-500/50 transition-all"
        >
          <div className="flex items-center pl-4 text-slate-600">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            className="flex-1 bg-transparent border-none px-4 py-4 outline-none text-xl placeholder:text-slate-700 font-medium text-white"
            placeholder={`Buscar no ${activeBanner?.name}...`}
          />
          <button
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white px-12 rounded-full font-black transition-all active:scale-95 shadow-lg cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'BUSCAR'}
          </button>
        </form>

        {error && (
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/50 p-5 rounded-2xl mb-8 text-red-500 animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-black uppercase tracking-widest leading-none mb-1">
                Erro de Sistema
              </p>
              <p className="text-xs opacity-90 leading-relaxed font-medium">
                {error}
              </p>
            </div>
          </div>
        )}

        {data && (
          <div className="space-y-4 animate-in fade-in duration-500">
            {data.products.length > 0 ? (
              data.products.map((p, idx) => (
                <ProductCard
                  key={`${p.imageId}-${idx}`}
                  index={idx}
                  product={p}
                  bannerLogo={activeBanner?.logo}
                  onCopy={copy}
                  copiedField={copiedField}
                />
              ))
            ) : (
              <div className="text-center py-20 bg-slate-900/20 rounded-4xl border border-dashed border-slate-800">
                <p className="text-slate-600 font-medium italic">
                  Nenhum produto correspondente foi encontrado nesta bandeira.
                </p>
              </div>
            )}

            <footer className="pt-12 text-center pb-10">
              <a
                href={data.searchUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 border border-slate-800 rounded-full hover:border-cyan-500/50 transition-all group shadow-2xl text-slate-400 font-bold text-sm uppercase tracking-widest cursor-pointer"
              >
                <PackageSearch className="text-cyan-500" size={18} />
                Busca Manual no {activeBanner?.name}
                <ExternalLink size={14} className="opacity-40" />
              </a>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
