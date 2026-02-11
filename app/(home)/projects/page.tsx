"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaHtml5, FaCss3Alt, FaJs } from "react-icons/fa";

const projects = [
    {
        id: 1,
        title: "Portfolio Website",
        description: "Modern portfolio built with Next.js & Tailwind.",
        image: "/projects-panda-food.png",
        tech: [FaHtml5, FaCss3Alt, FaJs],
    },
    {
        id: 2,
        title: "E-commerce App",
        description: "Full-stack shop with authentication & payments.",
        image: "/projects-panda-food.png",
        tech: [FaHtml5, FaCss3Alt, FaJs],
    },
    {
        id: 3,
        title: "Dashboard UI",
        description: "Admin dashboard with charts and analytics.",
        image: "/projects-panda-food.png",
        tech: [FaHtml5, FaCss3Alt, FaJs],
    },
    {
        id: 4,
        title: "Landing Page",
        description: "High-conversion landing page with animations.",
        image: "/projects-panda-food.png",
        tech: [FaHtml5, FaCss3Alt, FaJs],
    },
];

const page = () => {
    return (
        <div className="min-h-screen px-6 py-20">

            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-accent-foreground">
                    My Projects
                </h1>
                <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                    A selection of projects showcasing my skills and experience.
                </p>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="group rounded-2xl overflow-hidden bg-background border border-border shadow-md hover:shadow-xl transition-all"
                    >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <h3 className="text-lg font-semibold text-accent-foreground">
                                {project.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                                {project.description}
                            </p>

                            <button className="mt-4 w-full rounded-lg border border-primary/40 py-2 text-sm text-primary hover:bg-primary hover:text-white transition-colors">
                                View Project
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default page;
