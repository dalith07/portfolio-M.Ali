"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "../app/language-provider";
import { translations } from "../app/i18n";
import { projects } from "../data/projects";
import Link from "next/link";

export default function PortfolioSection() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <section
            id="portfolio"
            className="px-6 py-20 bg-backgrounrd"
        >
            <div className="max-w-6xl mx-auto">
                {/* TITLE */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center mb-4"
                >
                    {t.projectsTitle}
                </motion.h2>

                {/* VIEW ALL LINK BELOW TITLE */}
                <div className="flex justify-end max-w-6xl mx-auto mb-8">
                    <Link
                        href="/projects" // your "all projects" page
                        className="text-primary font-medium hover:underline"
                    >
                        {t.viewAll}
                    </Link>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group rounded-2xl overflow-hidden border border-white/10 bg-slate-800/5 dark:bg-white/5 backdrop-blur hover:scale-[1.02] duration-500 transition"
                        >

                            {/* IMAGE */}
                            <div className="relative h-48 overflow-hidden rounded-t-2xl">
                                <Image
                                    src={project.image}
                                    alt={project.title[language]}
                                    fill
                                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110 will-change-transform cursor-pointer"
                                />
                            </div>

                            {/* CONTENT */}
                            <div className="p-6">
                                <h3 className="md:text-2xl md:group-hover:text-primary duration-500 text-lg font-semibold mb-2">
                                    {project.title[language]}
                                </h3>

                                <p className="text-muted-foreground text-sm md:text-lg mb-4">
                                    {project.description[language]}
                                </p>

                                <Link
                                    href={project.link}
                                    target="_blank"
                                    className="
    inline-flex items-center gap-1
    text-primary font-medium

    opacity-100 translate-x-0

    md:opacity-0 md:-translate-x-6
    md:transition-all md:duration-500 md:ease-out
    md:group-hover:opacity-100
    md:group-hover:translate-x-0
  "
                                >
                                    {t.viewProject}
                                    <span className="md:transition-transform md:duration-300 md:group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
