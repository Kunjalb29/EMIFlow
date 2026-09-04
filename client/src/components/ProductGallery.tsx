import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProductImage } from '../types/product';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  cashback?: number;
}

export default function ProductGallery({ images, productName, cashback }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const currentImage = images[activeIndex] || images[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  if (!images.length) {
    return (
      <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center">
        <span className="text-text-muted">No image available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[500px] pb-2 lg:pb-0 lg:pr-2 scrollbar-thin">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setActiveIndex(i)}
            className={`shrink-0 w-16 h-16 lg:w-[72px] lg:h-[72px] rounded-xl overflow-hidden border-2 transition-all duration-200 hover:border-primary/50 ${
              i === activeIndex ? 'border-primary shadow-sm' : 'border-transparent'
            }`}
            aria-label={`View ${img.alt || `image ${i + 1}`}`}
          >
            <img
              src={img.url}
              alt={img.alt || `${productName} thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1">
        <div
          className="relative bg-white rounded-2xl overflow-hidden aspect-square cursor-crosshair border border-border"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            src={currentImage.url}
            alt={currentImage.alt || productName}
            className="w-full h-full object-contain p-6 transition-transform duration-300"
            style={
              isZoomed
                ? {
                    transform: 'scale(1.8)',
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }
                : {}
            }
          />

          {/* Cashback Badge */}
          {cashback && cashback > 0 && (
            <div className="absolute bottom-4 left-4 bg-success text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md">
              ₹{cashback.toLocaleString('en-IN')} Cashback
            </div>
          )}

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i === activeIndex ? 'bg-primary w-5' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
