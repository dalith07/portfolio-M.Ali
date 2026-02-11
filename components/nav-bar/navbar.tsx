'use client';

import { NutOffIcon, Menu, } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";
import MobileMenu from "./mobile-menu";
import ButtonUser from "./button-user";
import LanguageSwitch from "./language-switch";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { useLanguage } from "@/app/language-provider";

export function Navbar() {
  const { t, dir } = useLanguage();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const menuLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Service", href: "/service" },
  ];

  return (
    <header
      className={clsx(
        "fixed w-full z-40 pb-safe transition-all duration-300 border-b backdrop-blur-md",
        isScrolled
          ? "bg-white/5 dark:bg-black/70 border-black/5 dark:border-white/10"
          : "bg-white dark:bg-black/30 border-black/5 dark:border-white/10"
      )}
      dir={dir}
    >

      <nav className="container mx-auto sm:px-2 px-4 py-3 flex items-center justify-between">
        {/* Logo or Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:cursor-pointer rounded-md hover:bg-accent/20 transition"
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="hidden md:block">
          <Link
            href="/"
            className="text-foreground dark:text-white text-sm md:text-[1rem] font-bold"
          >
            {t("portfolioName")}
          </Link>
        </div>

        {/* Desktop Menu Links */}
        <div className="hidden md:flex items-center gap-8">
          {menuLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "inline-flex text-sm items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-8 rounded-md px-3",
                pathname === link.href
                  ? "text-primary"
                  : "text-foreground dark:text-white hover:bg-primary/20 hover:text-primary")}
            >
              {t(link.name)}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitch />

          <button className="nav-icon-btn">
            <NutOffIcon size={22} />
          </button>

          <AnimatedThemeToggler className="nav-icon-btn" />

          <ButtonUser />
        </div>

        {/* Mobile Right Icons */}
        <div className="flex md:hidden items-center gap-3">
          <LanguageSwitch />

          <button className="nav-icon-btn">
            <NutOffIcon size={22} />
          </button>

          <AnimatedThemeToggler className="nav-icon-btn" />

          <ButtonUser />

        </div>
      </nav>

      {/* Mobile Fullscreen Menu (Left → Right) */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        links={menuLinks}
      />
    </header>
  );
}
