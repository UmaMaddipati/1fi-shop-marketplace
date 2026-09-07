import React, { useState, useEffect } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  badge?: string;
  externalImageIndex?: number;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  badge,
  externalImageIndex,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Synchronize when an external image index is selected (e.g. from color variant change)
  useEffect(() => {
    if (
      typeof externalImageIndex === 'number' &&
      externalImageIndex >= 0 &&
      externalImageIndex < images.length
    ) {
      setActiveIndex(externalImageIndex);
    }
  }, [externalImageIndex, images.length]);

  const currentImage = images[activeIndex] || images[0] || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800';

  return (
    <div className="flex flex-col gap-3">
      {/* Main Preview */}
      <div className="relative w-full aspect-square sm:aspect-4/3 bg-white rounded-2xl border border-slate-200/80 p-6 flex items-center justify-center overflow-hidden shadow-xs">
        {badge && (
          <div className="absolute top-4 left-4 z-10 bg-emerald-600 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-xs">
            {badge}
          </div>
        )}
        <img
          src={currentImage}
          alt={`${productName} view ${activeIndex + 1}`}
          referrerPolicy="no-referrer"
          className="max-h-full max-w-full object-contain transition-all duration-300 hover:scale-105"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`View ${productName} image ${idx + 1}`}
              className={`w-16 h-16 rounded-xl border p-1.5 bg-white transition-all cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                activeIndex === idx
                  ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt=""
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
