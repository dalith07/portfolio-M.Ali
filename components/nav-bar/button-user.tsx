"use client"

import { useState, useRef, useEffect } from "react"
import { User } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"
import { useCloseOnInteraction } from "@/hooks/useCloseOnInteraction"
import { useCurrentUser } from "@/hooks/use-current-user"
import Image from "next/image"

const ButtonUser = () => {
    // Controls open / close state of the card
    const [open, setOpen] = useState(false)

    const user = useCurrentUser();

    // Reference to detect click outside
    const ref = useRef<HTMLDivElement>(null)

    // Close the card when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Global close logic
    useCloseOnInteraction({
        isOpen: open,
        onClose: () => setOpen(false),
        elementRef: ref, //     
    })

    return (
        <div className="relative" ref={ref}>
            {/* User button */}
            <button
                onClick={() => setOpen(!open)}
                className="nav-icon-btn group hover:cursor-pointer hover:bg-accent-foreground/20 hover:border-slate-200/20"
            >
                {user?.image ?
                    <Image src={user.image} alt="image" width={50} height={50}
                        className="rounded-full w-full h-full"
                    />
                    :
                    <User size={22} className="group-hover:scale-110 duration-300" />
                }
            </button>

            {/* Dropdown card */}
            {open && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl border bg-background shadow-lg p-4 z-50">
                    {user ? (
                        <>
                            {/* User name */}
                            <div className="flex md:flex-row flex-col gap-2 mb-4">
                                <Button className="relative m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-primary shadow-md bg-background">
                                    <Image
                                        src={user.image || "/kira.jpg"}
                                        alt="image user"
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </Button>

                                <h1 className="text-accent-foreground font-medium">My Account:
                                    <span className="opacity-80 block font-normal break-all text-xs">
                                        {user.email}
                                    </span>
                                </h1>
                            </div>
                            {/* Divider */}
                            <div className="my-3 h-px bg-border" />

                            <div className="flex items-center gap-2 md:flex-row flex-col">
                                {/* Profile link */}
                                <Link href="/settings" className="w-full">
                                    <Button className="w-full md:w-auto hover:cursor-pointer">
                                        View profile
                                    </Button>
                                </Link>

                                {/* Logout button */}
                                <Button
                                    variant="destructive"
                                    className="w-full md:w-auto hover:cursor-pointer"
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                >
                                    Logout
                                </Button>
                            </div>

                        </>
                    ) : (
                        <>
                            {/* User name */}
                            <p className="text-sm font-semibold">Create Account</p>

                            {/* Divider */}
                            <div className="my-3 h-px bg-border" />

                            {/* Action buttons */}
                            <div className="flex flex-col md:flex-row gap-2">
                                <Link
                                    href="/auth/login"
                                    className="w-full text-center rounded-lg border px-3 py-2 text-sm hover:bg-accent"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/auth/register"
                                    className="w-full text-center rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm hover:opacity-90"
                                >
                                    Register
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default ButtonUser
