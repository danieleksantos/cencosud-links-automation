import React from 'react';
import { Copy, Check } from 'lucide-react';
import { type Product } from '../types';

interface ProductCardProps {
  product: Product;
  bannerLogo?: string;
  index: number;
  onCopy: (text: string, id: string) => void;
  copiedField: string | null;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  bannerLogo,
  index,
  onCopy,
  copiedField,
}) => {
  const isIdCopied = copiedField === `id-${index}`;
  const isLinkCopied = copiedField === `link-${index}`;

  return (
    <div className="bg-slate-900/30 border border-slate-800/50 p-6 rounded-4xl flex flex-col md:flex-row items-center gap-8 hover:border-slate-700 transition-all group relative overflow-hidden text-left">
      {bannerLogo && (
        <img
          src={bannerLogo}
          className="absolute top-5 right-6 h-8 pointer-events-none opacity-70"
          alt="Banner"
        />
      )}

      <div className="w-28 h-28 bg-white rounded-2xl p-1 shrink-0 flex items-center justify-center overflow-hidden border border-white/10 shadow-inner">
        <img
          src={product.imageUrl}
          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
          alt={product.name}
        />
      </div>

      <div className="flex-1 w-full min-w-0">
        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">
          {product.brand}
        </span>
        <h3 className="font-bold text-white text-xl truncate mb-6 uppercase tracking-tight">
          {product.name}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/40 rounded-2xl p-2.5 flex items-center justify-between border border-slate-800 shadow-sm">
            <div className="ml-3 leading-none text-left">
              <span className="text-[9px] text-slate-500 font-black uppercase block tracking-widest mb-1 text-left">
                Image ID
              </span>
              <span className="font-mono text-cyan-400 font-black text-lg">
                {product.imageId}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onCopy(product.imageId, `id-${index}`)}
              className={`p-3.5 rounded-xl transition-all cursor-pointer ${
                isIdCopied
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-cyan-400'
              }`}
            >
              {isIdCopied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>

          <div className="bg-black/40 rounded-2xl p-2.5 flex items-center justify-between border border-slate-800 shadow-sm">
            <div className="ml-3 overflow-hidden leading-none text-left">
              <span className="text-[9px] text-slate-500 font-black uppercase block tracking-widest mb-1 text-left">
                Link
              </span>
              <span className="text-[11px] truncate block text-slate-400 pr-4">
                {product.link}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onCopy(product.link, `link-${index}`)}
              className={`p-3.5 rounded-xl transition-all cursor-pointer ${
                isLinkCopied
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-cyan-400'
              }`}
            >
              {isLinkCopied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
