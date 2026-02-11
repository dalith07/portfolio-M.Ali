"use client";

import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X } from "lucide-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function MobileMenu({
    isOpen,
    onClose,
    links,
}: {
    isOpen: boolean;
    onClose: () => void;
    links: { name: string; href: string }[];
}) {

    const pathname = usePathname();

    if (typeof window === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-9999 dark:bg-background "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                        className="absolute top-0 left-0 h-full w-full bg-background text-white p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={onClose} className="absolute text-primary animate-pulse hover:cursor-pointer top-6 right-6">
                            <X size={28} />
                        </button>

                        <nav className="mt-20 flex flex-col gap-6">
                            {links.map((l) => (
                                <Link
                                    key={l.name}
                                    href={l.href}
                                    className={clsx(
                                        "text-2xl font-bold text-accent-foreground",
                                        pathname === l.href
                                            ? "text-blue-500"
                                            : "text-foreground dark:text-white hover:bg-primary/20 hover:text-primary"
                                    )}
                                    onClick={onClose}
                                >
                                    {l.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
