export default function Footer() {
    const navLinks = [
        { label: 'Menu', href: '#menu' },
        { label: 'About', href: '#about' },
        { label: 'Reviews', href: '#reviews' },
        { label: 'Contact', href: '#contact' },
    ]

    const socials = [
        { label: 'Instagram', icon: '📷', href: '#' },
        { label: 'Google Maps', icon: '📍', href: '#' },
        { label: 'Zomato', icon: '🍽', href: '#' },
    ]

    return (
        <footer className="bg-bg-footer pt-[88px] pb-10 px-6">
            {/* Brand signature */}
            <h2 className="font-display font-light text-[52px] tracking-[2px] text-brand-primary leading-none">
                Chatkara Kitchen
            </h2>

            <p className="text-[13px] font-light italic text-brand-muted mt-2">
                Crafted with care. Served with love.
            </p>

            <div className="h-px bg-divider my-9" />

            {/* Navigation */}
            <nav className="flex flex-wrap gap-6">
                {navLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        className="text-[11px] font-normal tracking-[2px] uppercase text-brand-muted hover:text-accent transition-colors duration-300"
                    >
                        {link.label}
                    </a>
                ))}
            </nav>

            {/* Social icons */}
            <div className="flex gap-[10px] mt-6">
                {socials.map((social) => (
                    <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="w-8 h-8 border border-border flex items-center justify-center rounded-[2px] text-brand-muted hover:border-accent hover:text-accent transition-colors duration-300 text-[14px]"
                    >
                        {social.icon}
                    </a>
                ))}
            </div>

            {/* Copyright */}
            <p className="text-[11px] font-light text-brand-muted opacity-40 mt-10">
                © 2025 Chatkara Kitchen. All rights reserved.
            </p>
        </footer>
    )
}
