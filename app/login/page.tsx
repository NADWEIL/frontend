"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Mot de passe min 8 caractères"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError("Email ou mot de passe incorrect");
      reset();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/50 p-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border bg-card p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Connexion</h1>
          <p className="text-muted-foreground mt-2">
            Accédez à votre dictionnaire
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="text-destructive text-sm p-3 rounded-md bg-destructive/10 border border-destructive/30">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-input rounded-lg bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="votre@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-destructive text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-input rounded-lg bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="********"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-destructive text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-12 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex items-center justify-center gap-2 font-medium"
          >
            Se connecter
          </button>
        </form>

        <div className="text-center text-sm text-muted-foreground pt-4">
          Pas de compte ?{" "}
          <a
            href="/register"
            className="font-medium hover:text-foreground underline-offset-4"
          >
            S'inscrire
          </a>
        </div>
      </div>
    </div>
  );
}
