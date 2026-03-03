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
                    src="/images/hero-banner-dark.png"
                    fill
                    priority
                    alt="Chatkara Kitchen fine dining"
                    className="object-cover object-center"
                    sizes="100vw"
                />
            </div>

            {/* Overlay Layer */}
            <div className="absolute inset-0 bg-[#0e0e0e] opacity-[0.35] z-[1]" />

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

                <div className="hero-cta-grid grid grid-cols-2 gap-3 mt-7 max-w-md">
                    <a
                        href="tel:+919876543210"
                        className="col-span-1 h-[52px] bg-accent text-brand-inverse text-[11px] font-medium tracking-[2.5px] uppercase rounded-[2px] flex items-center justify-center gap-2 transition-all duration-300 hover:bg-accent-dark active:scale-[0.97]"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Call Now
                    </a>

                    <a
                        href="#menu"
                        className="col-span-1 h-[52px] border border-accent/40 text-brand-primary bg-[rgba(14,14,14,0.45)] text-[11px] font-medium tracking-[2.5px] uppercase rounded-[2px] flex items-center justify-center gap-2 transition-all duration-300 hover:border-accent/70 hover:bg-[rgba(184,155,106,0.08)] active:scale-[0.97]"
                    >
                        <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        View Menu
                    </a>

                    <a
                        href="https://wa.me/919508351404"
                        className="col-span-2 h-[48px] bg-[#1a3a1f] text-accent-waFg text-[11px] font-medium tracking-[2.5px] uppercase rounded-[2px] flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#234d28] active:scale-[0.97]"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Order on WhatsApp
                    </a>

                    <a
                        href="mailto:"
                        className="col-span-2 h-[44px] border border-[#2a2a2a] text-brand-muted bg-transparent text-[11px] font-medium tracking-[2.5px] uppercase rounded-[2px] flex items-center justify-center gap-2 transition-all duration-300 hover:border-accent/30 hover:text-brand-primary active:scale-[0.97]"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
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
