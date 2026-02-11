/* eslint-disable react-hooks/incompatible-library */
"use client"

import { motion } from "framer-motion"
import { useState, useTransition } from "react"
import Link from "next/link"
import { ChevronLeft, Eye, EyeOff } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { RegisterSchema } from "@/lib/validationSchema"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { register } from "@/actions/user/register"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import FormError from "./form-error"
import FormSuccess from "./form-success"
import CardWrapper from "./card-wrapper"
// import { useSession } from "next-auth/react"

const RegisterForm = () => {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    // const { update } = useSession();

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const passwordValue = form.watch("password")

    // Password strength function
    const getPasswordStrength = (password: string) => {
        let score = 0
        if (password.length >= 6) score++
        if (/[A-Z]/.test(password)) score++
        if (/[0-9]/.test(password)) score++
        if (/[^A-Za-z0-9]/.test(password)) score++

        if (score <= 1)
            return { label: "Weak password", color: "bg-red-500", text: "text-red-500" }
        if (score === 2 || score === 3)
            return { label: "Medium password", color: "bg-blue-500", text: "text-blue-500" }
        return { label: "Strong password", color: "bg-green-500", text: "text-green-500" }
    }

    const strength = getPasswordStrength(passwordValue || "")

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setSuccess("");

        startTransition(() => {
            register(values).then(async (data) => {
                setError(data.error);
                setSuccess(data.success);
                // await update();
                if (data.success) return router.push("/")
            });
        });
    };

    return (
        <CardWrapper
            headerLabel="Creaet an account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial
        >
            <div>
                {/* Back button */}
                <Link
                    href="/auth/login"
                    className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-blue-400/10 hover:bg-blue-400/20 transition-colors duration-200"
                >
                    <ChevronLeft size={20} className="text-primary" />
                </Link>

                {/* Form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                        {/* NAME */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-accent-foreground text-sm">Name:</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="John Doe"
                                            disabled={isPending}
                                            className="bg-blue-600/10 border-blue-600/50 text-white focus:border-blue-600/70 duration-500 transition-colors pr-10"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* EMAIL */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-accent-foreground text-sm">Email:</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="john.doe@example.com"
                                            disabled={isPending}
                                            className="bg-blue-600/10 border-blue-600/50 text-white focus:border-blue-600/70 duration-500 transition-colors pr-10"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* PASSWORD */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-accent-foreground text-sm">Password:</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="********"
                                                disabled={isPending}
                                                className="bg-blue-600/10 border-blue-600/50 text-white focus:border-blue-600/70 duration-500 transition-colors pr-10"
                                            />
                                        </FormControl>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute hover:cursor-pointer right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* CONFIRM PASSWORD */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-accent-foreground text-sm">Confirm Password:</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="********"
                                                disabled={isPending}
                                                className="bg-blue-600/10 border-blue-600/50 text-white focus:border-blue-600/70 duration-500 transition-colors pr-10"
                                            />
                                        </FormControl>
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute hover:cursor-pointer right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password Strength */}
                        {passwordValue && (
                            <div className="space-y-1">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width:
                                            strength.label === "Weak password"
                                                ? "33%"
                                                : strength.label === "Medium password"
                                                    ? "66%"
                                                    : "100%",
                                    }}
                                    transition={{ duration: 0.5 }}
                                    className={`h-2 rounded-full ${strength.color}`}
                                />
                                <p className={`text-xs font-medium ${strength.text}`}>
                                    {strength.label}
                                </p>
                            </div>
                        )}

                        {/* ERROR / SUCCESS */}
                        <FormError message={error} />
                        <FormSuccess message={success} />

                        {/* SUBMIT BUTTON */}
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full hover:cursor-pointer bg-blue-600/70 hover:bg-blue-600/50 hover:text-white border-blue-600 border duration-500 text-white"
                        >
                            Create an account
                        </Button>
                    </form>
                </Form>

                {/* Links */}
                <div className="flex justify-center mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>Already have an account? </span>
                    <Link href="/auth/login" className="ml-1 text-blue-500 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </CardWrapper>
    )
}

export default RegisterForm
