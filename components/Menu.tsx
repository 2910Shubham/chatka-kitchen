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
        if (!menuContainerRef.current || hasRevealedRef.current) return

        const cards = menuContainerRef.current.querySelectorAll('.menu-card')
        if (cards.length === 0) return

        gsap.set(cards, { opacity: 0, x: -14 })

        ScrollTrigger.create({
            trigger: menuContainerRef.current,
            start: 'top 82%',
            once: true,
            onEnter: () => {
                hasRevealedRef.current = true
                gsap.to(cards, {
                    opacity: 1,
                    x: 0,
                    duration: 0.7,
                    stagger: 0.06,
                    ease: 'power2.out',
                })
            },
        })

        return () => {
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === menuContainerRef.current) {
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
            x: -14,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power2.out',
        })
    }, [activeCategory])

    return (
        <section id="menu" className="bg-bg-primary py-[88px]">
            {/* Header */}
            <div className="px-6">
                <span className="text-[10px] font-body font-medium tracking-[4px] uppercase text-accent block">
                    Our Menu
                </span>
                <h2 className="font-display font-light text-[40px] leading-[1.05] text-brand-primary mt-2">
                    <em>Crafted</em> with intention.
                </h2>
            </div>

            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto px-6 pb-5 mt-6 scrollbar-hide">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.slug)}
                        className={`border text-[10px] font-medium tracking-[2px] uppercase px-[18px] py-2 rounded-[2px] whitespace-nowrap transition-colors duration-200 flex-shrink-0 ${activeCategory === cat.slug
                            ? 'bg-accent text-brand-inverse border-accent'
                            : 'border-border text-brand-muted hover:border-accent hover:text-accent'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-divider mx-6 mb-0" />

            {/* Menu items */}
            <div ref={menuContainerRef}>
                {Object.entries(grouped).map(([category, categoryItems]) => (
                    <div key={category}>
                        <h3 className="font-display italic font-light text-[28px] text-brand-primary border-l-2 border-accent pl-[14px] my-10 mx-6">
                            {categoryLabels[category] || category}
                        </h3>

                        {categoryItems.map((item) => (
                            <div
                                key={item.id}
                                className="menu-card px-6 py-[18px] border-b border-divider flex items-center gap-[14px]"
                            >
                                {/* Image */}
                                <div className="w-[76px] h-[76px] flex-shrink-0 relative overflow-hidden rounded-[2px]">
                                    <Image
                                        src={item.imageUrl}
                                        fill
                                        alt={item.name}
                                        className="object-cover"
                                        sizes="76px"
                                    />
                                </div>

                                {/* Text */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        {item.isVeg && (
                                            <div className="w-2 h-2 border border-green-600 bg-green-600 flex-shrink-0" />
                                        )}
                                        {!item.isVeg && (
                                            <div className="w-2 h-2 border border-red-600 bg-red-600 flex-shrink-0" />
                                        )}
                                        <span className="text-[14px] font-normal text-brand-primary">
                                            {item.name}
                                        </span>
                                    </div>
                                    <p className="text-[12px] font-light text-brand-muted leading-[1.6] mt-1 line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Price */}
                                <span className="text-[14px] font-medium text-accent flex-shrink-0 self-start pt-1">
                                    ₹{item.price}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}
