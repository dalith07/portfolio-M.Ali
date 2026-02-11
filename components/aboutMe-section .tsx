"use client";

import { translations } from "../app/i18n";
import { useLanguage } from "../app/language-provider";
import { motion } from "framer-motion";

export function AboutMeSection() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="py-16 px-4 max-w-4xl mx-auto text-center"
        >
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl font-bold mb-4"
            >
                {t.aboutMeTitle}
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            >
                {t.aboutMeDescription}
            </motion.p>
        </motion.section>
    );
}
