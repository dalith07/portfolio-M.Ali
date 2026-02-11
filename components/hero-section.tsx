'use client';

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLanguage } from "../app/language-provider";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const words = ["Developer", "Designer"];

const HeroSection = () => {
    const { t } = useLanguage();

    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const typingRef = useRef<HTMLSpanElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const bgCircle1 = useRef<HTMLDivElement>(null);
    const bgCircle2 = useRef<HTMLDivElement>(null);

    /* -------------------- INTRO ANIMATION -------------------- */
    useLayoutEffect(() => {
        if (!heroRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out", duration: 1 },
            });

            tl.from(heroRef.current, { opacity: 0, duration: 0.8 })
                .from(titleRef.current, { y: 40, opacity: 0 }, "-=0.5")
                .from(subtitleRef.current, { y: 40, opacity: 0 }, "-=0.4")
                .from(buttonRef.current, { scale: 0.8, opacity: 0 }, "-=0.3");

            gsap.to(bgCircle1.current, {
                x: 120,
                y: 60,
                repeat: -1,
                yoyo: true,
                duration: 18,
                ease: "sine.inOut",
            });

            gsap.to(bgCircle2.current, {
                scale: 1.1,
                repeat: -1,
                yoyo: true,
                duration: 8,
                ease: "sine.inOut",
            });
        }, heroRef);

        return () => ctx.revert(); // 🔥 cleanup الصحيح
    }, []);

    /* -------------------- TYPING EFFECT -------------------- */
    useEffect(() => {
        if (!typingRef.current) return;

        const tl = gsap.timeline({ repeat: -1 });

        words.forEach((word) => {
            tl.set(typingRef.current, { textContent: "" });

            word.split("").forEach((char) => {
                tl.to(typingRef.current, {
                    textContent: (i: number, el: HTMLElement) => el.textContent + char,
                    duration: 0.15,
                    ease: "none",
                });
            });

            tl.to({}, { duration: 1 });

            word.split("").forEach(() => {
                tl.to(typingRef.current, {
                    textContent: (i: number, el: HTMLElement) => el.textContent!.slice(0, -1),
                    duration: 0.10,
                    ease: "none",
                });
            });
        });

        // ✅ IMPORTANT: cleanup must return void
        return () => {
            tl.kill();
        };
    }, []);

    /* -------------------- JSX -------------------- */
    return (
        <section
            ref={heroRef}
            className="relative h-screen px-8 md:px-16 flex items-center overflow-hidden z-0"
        >
            {/* Background */}
            <div
                ref={bgCircle1}
                className="absolute z-0 w-72 h-72 rounded-full bg-blue-400/20 top-10 left-10"
            />

            <div
                ref={bgCircle2}
                className="absolute z-0 w-96 h-96 rounded-full bg-pink-400/20 bottom-0 right-0"
            />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
                {/* TEXT */}
                <div>
                    <h1
                        ref={titleRef}
                        className="text-[2.5rem] md:text-6xl font-extrabold mb-4"
                    >
                        {t("heroName")}
                    </h1>

                    <h2 className="text-2xl uppercase md:text-4xl font-bold mb-6">
                        I&apos;M A <span ref={typingRef} className="text-blue-500" />
                    </h2>

                    <p
                        ref={subtitleRef}
                        className="text-md md:text-xl text-gray-400 opacity-80 mb-8 max-w-xl"
                    >
                        {t("heroDescription")}
                    </p>

                    <div ref={buttonRef} className="flex gap-4 flex-wrap">
                        <Link
                            href="#projects"
                        >
                            <Button>
                                {t("heroButton1")}
                            </Button>
                        </Link>
                        <Link
                            href="/contact"
                        >
                            <Button
                                variant={"outline"}
                            >
                                {t("heroButton2")}
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* IMAGE */}
                <div className="flex justify-center md:justify-end">
                    <div className="relative w-72 h-72 md:w-96 md:h-96">
                        <div className="absolute inset-0 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 blur-xl" />
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                            <Image
                                src="/photo_kira.png"
                                alt="profile"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
