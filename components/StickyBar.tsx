'use client'

import type { RestaurantInfo } from '@/types'

interface StickyBarProps {
    info: RestaurantInfo
}
export default function StickyBar({ info }: StickyBarProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-[999] bg-bg-surface border-t border-border px-6 py-[10px] pb-[max(10px,env(safe-area-inset-bottom))] flex justify-around items-center">

            {/* CALL */}
            <a
                href={`tel:${info.phone}`}
                className="flex flex-col items-center gap-[5px] py-[6px] active:opacity-65 transition-opacity duration-200"
            >
                <img
                    src="https://www.pngmart.com/files/22/Phone-Icon-PNG-Transparent.png"
                    alt="Call"
                    className="w-[22px] h-[22px] object-contain"
                />
                <span className="text-[9px] font-medium tracking-[2px] uppercase text-brand-muted">
                    Call
                </span>
            </a>

            {/* WHATSAPP */}
            <a
                href={`https://wa.me/${info.whatsapp}`}
                className="flex flex-col items-center gap-[5px] py-[6px] active:opacity-65 transition-opacity duration-200"
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/WhatsApp_Logo_green.svg/1280px-WhatsApp_Logo_green.svg.png"
                    alt="WhatsApp"
                    className="w-[22px] h-[22px] object-contain"
                />
                <span className="text-[9px] font-medium tracking-[2px] uppercase text-accent-waFg">
                    WhatsApp
                </span>
            </a>

            {/* MAPS */}
            <a
                href={info.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-[5px] py-[6px] active:opacity-65 transition-opacity duration-200"
            >
                <img
                    src="https://static.vecteezy.com/system/resources/previews/016/716/478/non_2x/google-maps-icon-free-png.png"
                    alt="Maps"
                    className="w-[22px] h-[22px] object-contain"
                />
                <span className="text-[9px] font-medium tracking-[2px] uppercase text-brand-muted">
                    Maps
                </span>
            </a>

        </div>
    )
}