export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb skeleton */}
      <div className="skeleton h-4 w-64 mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gallery Skeleton */}
        <div className="flex flex-col-reverse lg:flex-row gap-4">
          <div className="flex lg:flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton w-16 h-16 lg:w-[72px] lg:h-[72px] rounded-xl" />
            ))}
          </div>
          <div className="skeleton flex-1 aspect-square rounded-2xl" />
        </div>

        {/* Info Skeleton */}
        <div className="space-y-4">
          <div className="skeleton h-4 w-20" />
          <div className="skeleton h-8 w-3/4" />
          <div className="skeleton h-4 w-32" />
          <div className="skeleton h-10 w-48 mt-4" />
          <div className="skeleton h-4 w-40" />
          <div className="skeleton h-4 w-32" />

          <div className="space-y-3 mt-6">
            <div className="skeleton h-4 w-16" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton h-10 w-28 rounded-xl" />
              ))}
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <div className="skeleton h-6 w-48" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton h-28 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="skeleton aspect-square" />
          <div className="p-4 space-y-3">
            <div className="skeleton h-3 w-16" />
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-3 w-24" />
            <div className="skeleton h-6 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}
