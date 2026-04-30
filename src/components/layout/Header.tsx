"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import * as React from 'react';
import Image from 'next/image';

const navItems = [
  { href: '/', label: 'Inicio' },
 { href: '/about', label: 'Sobre Nosotros' },
  { href: '/gallery', label: 'Galería' },
  { href: '/contact', label: 'Contacto' },
];

const Logo = ({ className }: { className?: string }) => (
  <Image
    src="/logoRevelio completo sin fondo.png"
    alt="Logo Revelio"
    width={163}
    height={53}
    className={cn("h-6 md:h-8 w-auto origin-left transform-gpu", className)}
    priority
  />
);

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isHomePage = pathname === '/';
  const isContactPage = pathname === '/contact';

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    } else {
      setIsScrolled(true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  React.useEffect(() => {
    // Cierra el menú al cambiar de ruta
    setIsMenuOpen(false);
  }, [pathname]);

  const headerClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
    {
      "bg-transparent": isHomePage && !isScrolled && !isMenuOpen,
      "bg-primary/20 backdrop-blur-lg shadow-md": !isHomePage || isScrolled,
      "bg-primary/90 backdrop-blur-lg shadow-md": isMenuOpen,
    }
  );

  const linkColorClasses = "text-primary-foreground";

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Logo className={cn(
                "transition-all duration-300",
                (isHomePage && !isScrolled && !isMenuOpen) || isContactPage ? "brightness-0 invert" : ""
              )} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-bold text-sm transition-colors hover:text-primary",
                  linkColorClasses,
                  pathname === item.href ? 'border-b-2 border-current hover:text-primary' : ''
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn("p-2 rounded-md inline-flex items-center justify-center", linkColorClasses)}
              aria-label="Abrir menú"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary/20 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium text-primary-foreground hover:bg-primary-foreground/10",
                  pathname === item.href ? 'bg-primary-foreground/20' : ''
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
