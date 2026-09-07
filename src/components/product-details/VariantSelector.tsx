import React from 'react';
import { ProductVariants } from '../../types/product';
import { formatINR } from '../../utils/currency';
import { Check } from 'lucide-react';

/**
 * Determines whether a given hex color is light based on perceived luminance
 */
function isLightColor(hex: string): boolean {
  const cleanHex = hex.replace('#', '');
  let r = 0;
  let g = 0;
  let b = 0;
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  }
  return 0.299 * r + 0.587 * g + 0.114 * b > 175;
}

interface VariantSelectorProps {
  variants: ProductVariants;
  selectedStorageId?: string;
  selectedColorId?: string;
  onSelectStorage: (storageId: string) => void;
  onSelectColor: (colorId: string) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedStorageId,
  selectedColorId,
  onSelectStorage,
  onSelectColor,
}) => {
  const hasStorage = variants.storage && variants.storage.length > 0;
  const hasColors = variants.colors && variants.colors.length > 0;

  if (!hasStorage && !hasColors) return null;

  return (
    <div className="space-y-4 pt-2">
      {/* Storage Options */}
      {hasStorage && (
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Select Storage / Memory
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {variants.storage!.map((storage) => {
              const isSelected = selectedStorageId === storage.id;
              return (
                <button
                  key={storage.id}
                  onClick={() => onSelectStorage(storage.id)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`text-xs font-bold ${
                      isSelected ? 'text-emerald-950' : 'text-slate-800'
                    }`}
                  >
                    {storage.label}
                  </span>
                  <span
                    className={`text-[11px] mt-0.5 ${
                      isSelected ? 'text-emerald-700 font-semibold' : 'text-slate-500'
                    }`}
                  >
                    {storage.priceDelta > 0 ? `+${formatINR(storage.priceDelta)}` : 'Standard'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Color Options */}
      {hasColors && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Color
            </label>
            <span className="text-xs text-slate-500 font-medium">
              {variants.colors!.find((c) => c.id === selectedColorId)?.name}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {variants.colors!.map((color) => {
              const isSelected = selectedColorId === color.id;
              return (
                <button
                  key={color.id}
                  onClick={() => onSelectColor(color.id)}
                  title={color.name}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500/30 text-emerald-950 font-bold'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/15 shadow-2xs shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: color.hex }}
                  >
                    {isSelected && (
                      isLightColor(color.hex) ? (
                        <Check className="w-2.5 h-2.5 text-slate-900 stroke-[3]" />
                      ) : (
                        <Check className="w-2.5 h-2.5 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] stroke-[2.5]" />
                      )
                    )}
                  </span>
                  <span className="text-xs">{color.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
