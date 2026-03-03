'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { MenuItem, MenuCategory } from '@/types'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface MenuProps {
    items: MenuItem[]
    categories: MenuCategory[]
}

const categoryLabels: Record<string, string> = {
    veg: 'Vegetarian',
    'non-veg': 'Non-Vegetarian',
    'south-indian': 'South Indian',
    beverages: 'Beverages',
    salads: 'Salads',
}

export default function Menu({ items, categories }: MenuProps) {
    const [activeCategory, setActiveCategory] = useState<string>('all')
    const menuContainerRef = useRef<HTMLDivElement>(null)
    const hasRevealedRef = useRef(false)
    const isFirstRender = useRef(true)

    const filtered =
        activeCategory === 'all'
            ? items
            : items.filter((i) => i.category === activeCategory)

    /* Group by category */
    const grouped = filtered.reduce<Record<string, MenuItem[]>>((acc, item) => {
        if (!acc[item.category]) acc[item.category] = []
        acc[item.category].push(item)
        return acc
    }, {})

    /* Initial scroll-triggered reveal */
    useEffect(() => {
        const container = menuContainerRef.current
        if (!container || hasRevealedRef.current) return

        const cards = container.querySelectorAll('.menu-card')
        if (cards.length === 0) return

        gsap.set(cards, { opacity: 0, y: 30, scale: 0.95 })

        ScrollTrigger.create({
            trigger: container,
            start: 'top 82%',
            once: true,
            onEnter: () => {
                hasRevealedRef.current = true
                gsap.to(cards, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: 'power2.out',
                })
            },
        })

        return () => {
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === container) {
                    st.kill()
                }
            })
        }
    }, [])

    /* Animate on category change (not the first render) */
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        if (!menuContainerRef.current) return
        const cards = menuContainerRef.current.querySelectorAll('.menu-card')
        if (cards.length === 0) return

        gsap.from(cards, {
            opacity: 0,
            y: 30,
            scale: 0.95,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power2.out',
        })
    }, [activeCategory])

    return (
        <section id="menu" className="bg-bg-primary py-[88px]">
            {/* Header */}
            <div className="px-6 text-center">
                <span className="text-[10px] font-body font-medium tracking-[4px] uppercase text-accent block">
                    About Our Food
                </span>
                <h2 className="font-display font-light text-[40px] md:text-[52px] leading-[1.05] text-brand-primary mt-3">
                    <em>Delicious</em> dishes, crafted with love
                </h2>
                <p className="text-[13px] font-light text-brand-muted leading-[1.8] mt-3 max-w-md mx-auto">
                    Every dish on our menu is prepared with the freshest ingredients and authentic spices
                </p>
            </div>

            {/* Category pills */}
            <div className="flex gap-2 justify-center flex-wrap px-6 pb-5 mt-8">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.slug)}
                        className={`border text-[10px] font-medium tracking-[2px] uppercase px-5 py-[10px] rounded-[2px] whitespace-nowrap transition-all duration-300 ${activeCategory === cat.slug
                            ? 'bg-accent text-brand-inverse border-accent'
                            : 'border-border text-brand-muted hover:border-accent hover:text-accent'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-divider mx-6 mb-8" />

            {/* Menu items — showcase grid */}
            <div ref={menuContainerRef}>
                {Object.entries(grouped).map(([category, categoryItems]) => (
                    <div key={category} className="mb-12">
                        <h3 className="font-display italic font-light text-[28px] text-brand-primary border-l-2 border-accent pl-[14px] mx-6 mb-8">
                            {categoryLabels[category] || category}
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-6">
                            {categoryItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="menu-card group flex flex-col items-center text-center"
                                >
                                    {/* Circular image */}
                                    <div className="relative w-[140px] h-[140px] md:w-[170px] md:h-[170px] rounded-full overflow-hidden border-2 border-accent/20 group-hover:border-accent/50 transition-all duration-500">
                                        <Image
                                            src={item.imageUrl}
                                            fill
                                            alt={item.name}
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            sizes="(max-width: 768px) 140px, 170px"
                                        />
                                    </div>

                                    {/* Veg/Non-veg indicator + Name */}
                                    <div className="mt-4 flex items-center justify-center gap-1.5">
                                        <div className={`w-2 h-2 border flex-shrink-0 ${item.isVeg
                                            ? 'border-green-600 bg-green-600'
                                            : 'border-red-600 bg-red-600'
                                            }`}
                                        />
                                        <h4 className="text-[13px] font-medium tracking-[1px] uppercase text-brand-primary">
                                            {item.name}
                                        </h4>
                                    </div>

                                    {/* Description */}
                                    <p className="text-[11px] font-light text-brand-muted leading-[1.6] mt-2 line-clamp-2 px-1 max-w-[200px]">
                                        {item.description}
                                    </p>

                                    {/* Price */}
                                    <span className="text-[14px] font-medium text-accent mt-2">
                                        ₹{item.price}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
