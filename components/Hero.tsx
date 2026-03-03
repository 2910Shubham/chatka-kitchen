'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { useGSAP } from '@/hooks/useGSAP'

export default function Hero() {
    const imgWrapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            imgWrapRef.current?.classList.add('loaded')
        }, 300)
        return () => clearTimeout(timer)
    }, [])

    useGSAP((gsap) => {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

        tl.from('.hero-eyebrow', {
            opacity: 0,
            duration: 0.6,
            delay: 0.2,
        })
            .from(
                '.hero-heading',
                {
                    y: 30,
                    opacity: 0,
                    duration: 0.9,
                    ease: 'expo.out',
                },
                '-=0.2'
            )
            .from(
                '.hero-tagline',
                {
                    opacity: 0,
                    duration: 0.7,
                },
                '-=0.4'
            )
            .from(
                '.hero-cta-grid',
                {
                    opacity: 0,
                    duration: 0.6,
                },
                '-=0.2'
            )
    }, [])

    return (
        <section className="h-[100svh] min-h-[620px] relative overflow-hidden">
            {/* Image Layer */}
            <div ref={imgWrapRef} className="hero-img-wrap absolute inset-0">
                <Image
                    src="/images/ResturantInnerLook/DSC_8225.webp"
                    //src="/images/restorentOuterLook/DSC_8219.webp"
                    fill
                    priority
                    alt="Chatkara Kitchen fine dining"
                    className="object-cover object-center"
                    sizes="100vw"
                />
            </div>

            {/* Overlay Layer */}
            <div className="absolute inset-0 bg-[#0e0e0e] opacity-[0.54] z-[1]" />

            {/* Content Layer */}
            <div className="absolute bottom-0 left-0 right-0 z-[2] px-6 pb-14">
                <span className="hero-eyebrow text-[10px] font-body font-medium tracking-[4px] uppercase text-accent block mb-3">
                    Fine Dining · Est. 2019
                </span>

                <h1 className="hero-heading font-display text-[clamp(52px,14vw,80px)] font-light leading-none text-white">
                    <em>C</em>hatkara Kitchen
                </h1>

                <p className="hero-tagline text-[13px] font-light text-[rgba(232,224,212,0.65)] tracking-[0.5px] mt-3">
                    Where every plate tells a story.
                </p>

                <div className="hero-cta-grid grid grid-cols-2 gap-[10px] mt-7">
                    <a
                        href="tel:+919876543210"
                        className="col-span-1 h-[50px] bg-accent text-brand-inverse text-[11px] font-medium tracking-[2px] uppercase rounded-[2px] flex items-center justify-center gap-2 transition-opacity duration-300 hover:opacity-85"
                    >
                        📞 Call Now
                    </a>

                    <a
                        href="#menu"
                        className="col-span-1 h-[50px] border border-[rgba(184,155,106,0.45)] text-brand-primary bg-[rgba(14,14,14,0.35)] text-[11px] font-medium tracking-[2px] uppercase rounded-[2px] flex items-center justify-center gap-2 transition-opacity duration-300 hover:opacity-85"
                    >
                        View Menu
                    </a>

                    <a
                        href="https://wa.me/919508351404"
                        className="col-span-2 h-[46px] bg-accent-wa text-accent-waFg text-[11px] font-medium tracking-[2px] uppercase rounded-[2px] flex items-center justify-center gap-2 transition-opacity duration-300 hover:opacity-85"
                    >
                        Order on WhatsApp
                    </a>

                    <a
                        href="mailto:chatkakitchen@example.com"
                        className="col-span-2 h-[44px] border border-border text-brand-muted bg-transparent text-[11px] font-medium tracking-[2px] uppercase rounded-[2px] flex items-center justify-center gap-2 transition-opacity duration-300 hover:opacity-85"
                    >
                        Book a Table
                    </a>
                </div>
            </div>

            {/* Scroll Hint */}
            <div className="absolute bottom-5 right-6 z-[3] flex flex-col items-center gap-[6px]">
                <div className="scroll-line w-px h-11 bg-accent" />
                <span
                    className="text-[8px] tracking-[3px] text-accent uppercase"
                    style={{ writingMode: 'vertical-rl' }}
                >
                    scroll
                </span>
            </div>
        </section>
    )
}
