import { IconCloud } from "@/components/ui/icon-cloud";

const SkillsLanguage = () => {
    const slugs = [
        "typescript",
        "javascript",
        "react",
        "html5",
        "css3",
        "postgresql",
        "vercel",
        "git",
        "github",
        "figma",
    ]

    const images = slugs.map(
        (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
    )
    return (
        <div className="relative flex size-full items-center justify-center overflow-hidden">
            <IconCloud images={images} />
        </div>
    );
};

export default SkillsLanguage;
