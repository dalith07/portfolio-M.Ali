"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import BackButton from "./back-button"
import Header from "./header"
import Social from "./social"

interface CardWrapperProps {
    children: React.ReactNode
    headerLabel: string
    backButtonLabel: string
    backButtonHref: string
    showSocial?: boolean
}

const CardWrapper = ({ children, headerLabel, backButtonLabel, backButtonHref, showSocial }: CardWrapperProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="min-h-screen flex items-center justify-center px-4">
            <Card className="w-full relative max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700  text-card-foreground ">
                <CardHeader>
                    <Header label={headerLabel} />
                </CardHeader>

                <CardContent>
                    {children}
                </CardContent>

                {showSocial && (
                    <CardFooter>
                        <Social />
                    </CardFooter>
                )}

                <CardFooter className="m-auto">
                    <BackButton
                        label={backButtonLabel}
                        href={backButtonHref}
                    />
                </CardFooter>
            </Card>
        </motion.div>

    )
}

export default CardWrapper
