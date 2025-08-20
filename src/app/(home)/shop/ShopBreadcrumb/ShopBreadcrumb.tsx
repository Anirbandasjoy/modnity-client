import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Home, ShoppingBag } from "lucide-react";

export function ShopBreadcrumb() {
  return (
    <div className="w-full mt-2">
      <div className="px-4 sm:px-6">
        <div className="max-w-full mx-auto py-4 sm:py-6 lg:py-8">
          
          {/* Mobile-First Hero */}
          <div className="text-center mb-4 sm:mb-6">
            
            {/* Clean Title Section */}
            <div className="mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text">
                  Shop
                </h1>
              </div>
              
              {/* Simple accent line */}
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full" />
            </div>

            {/* Clean subtitle */}
            <p className="text-sm sm:text-base text-gray-600 px-4 max-w-sm mx-auto">
              Discover premium <span className="text-amber-600 font-semibold">ornaments</span>
            </p>
          </div>

          {/* Clean Mobile Breadcrumb */}
          <div className="flex justify-center">
            <Breadcrumb>
              <BreadcrumbList className="flex items-center gap-1 sm:gap-2">
                
                {/* Home - Mobile Optimized */}
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="group flex items-center gap-2 text-gray-500 hover:text-amber-600 transition-colors duration-200 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg active:scale-95 touch-manipulation"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gray-100 group-hover:bg-amber-100 flex items-center justify-center transition-colors duration-200">
                      <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 group-hover:text-amber-600 transition-colors duration-200" />
                    </div>
                    <span className="text-sm sm:text-base font-medium">Home</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {/* Clean Separator */}
                <div className="mx-1">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                {/* Current Page - Active State */}
                <BreadcrumbItem>
                  <BreadcrumbPage className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    <ShoppingBag className="w-4 h-4 text-white" />
                    <span className="text-sm sm:text-base font-semibold">Shop</span>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Optional navigation dots for mobile */}
          <div className="flex justify-center mt-4 sm:mt-6 md:hidden">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-200" />
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Custom Styles */}
      <style jsx global>{`
        /* Touch optimizations */
        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Active state feedback */
        .active\\:scale-95:active {
          transform: scale(0.95);
        }
        
        /* Smooth text rendering */
        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
        }
        
        /* Ensure good contrast */
        @media (prefers-contrast: high) {
          .text-gray-500 {
            color: #374151;
          }
          .text-gray-600 {
            color: #1f2937;
          }
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .transition-colors,
          .transition-transform {
            transition: none;
          }
        }
        
        /* Better focus states for keyboard users */
        .focus\\:ring-2:focus {
          outline: 2px solid #f59e0b;
          outline-offset: 2px;
        }
        
        /* Safe area padding for notched phones */
        @supports (padding: env(safe-area-inset-left)) {
          .px-4 {
            padding-left: max(1rem, env(safe-area-inset-left));
            padding-right: max(1rem, env(safe-area-inset-right));
          }
        }
        
        /* Large text support */
        @media (min-width: 320px) and (max-width: 480px) {
          .text-2xl {
            font-size: 1.75rem;
          }
        }
        
        /* Landscape orientation */
        @media screen and (orientation: landscape) and (max-height: 500px) {
          .py-4 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}