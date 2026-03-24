'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Mot de passe min 8 caractères'),
  confirmPassword: z.string().min(8, 'Confirmez le mot de passe'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })

      if (res.ok) {
        router.push('/login?registered=true')
      } else {
        const err = await res.json()
        setError(err.detail || 'Erreur inscription')
      }
    } catch (err) {
      setError('Erreur réseau')
    } finally {
      setLoading(false)
      reset()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/50 p-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border bg-card p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Inscription</h1>
          <p className="text-muted-foreground mt-2">Créez votre compte</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && <div className="text-destructive text-sm p-3 rounded-md bg-destructive/10 border border-destructive/30">{error}</div>}
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-input rounded-lg bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="votre@email.com"
              disabled={loading}
              {...register('email')}
            />
            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Mot de passe</label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-input rounded-lg bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Min 8 caractères"
              disabled={loading}
              {...register('password')}
            />
            {errors.password && <p className="text-destructive text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">Confirmer mot de passe</label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full px-3 py-2 border border-input rounded-lg bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Répétez le mot de passe"
              disabled={loading}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && <p className="text-destructive text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex items-center justify-center gap-2 font-medium"
          >
            {loading ? 'Création...' : 'S\\'inscrire'}
          </button>
        </form>

        <div className="text-center text-sm text-muted-foreground pt-4">
          Déjà inscrit ? <a href="/login" className="font-medium hover:text-foreground underline-offset-4">Se connecter</a>
        </div>
      </div>
    </div>
  )
}

