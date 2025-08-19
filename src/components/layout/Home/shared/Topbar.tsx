import { Crown, Phone } from 'lucide-react'
import React from 'react'
import { MdEmail } from 'react-icons/md'

const Topbar = () => {
  return (
     <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white py-2 sm:py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 text-xs sm:text-sm px-4 sm:px-6 lg:px-0">
            <div className="flex items-center gap-2">
              <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-amber-300 flex-shrink-0" />
              <span className="font-medium text-center sm:text-left">
                Premium Ornaments - Call or WhatsApp for Orders
              </span>
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6 items-center justify-center sm:justify-end">
              <a
                href="mailto:modnity@gmail.com"
                className="flex items-center gap-1 sm:gap-2 hover:text-amber-300 transition-colors duration-300"
              >
                <MdEmail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline truncate">
                  modnity@gmail.com
                </span>
              </a>
              <a
                href="tel:0123456789"
                className="flex items-center gap-1 sm:gap-2 hover:text-amber-300 transition-colors duration-300"
              >
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="font-medium">01772 838 734</span>
              </a>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Topbar