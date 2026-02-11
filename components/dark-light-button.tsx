"use client";

import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";


export default function ThemeButton() {
    return (
        <div className="flex items-center justify-center ">
            <AnimatedThemeToggler />
        </div>
    );
}
