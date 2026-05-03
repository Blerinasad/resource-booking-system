import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import AuthLayout from '../../components/layout/AuthLayout.jsx'
import Input  from '../../components/common/Input.jsx'
import Button from '../../components/common/Button.jsx'

export default function LoginPage() {
  const { loginUser } = useAuth()
  const navigate      = useNavigate()
  const [form, setForm] = useState({ email: 'admin@test.com', password: '123456' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await loginUser(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account to continue.">
      {/* Demo hint */}
      <div className="mb-6 p-3 rounded-xl bg-brand-500/5 border border-brand-500/15">
        <p className="text-xs text-slate-400 font-mono">
          <span className="text-brand-400">Demo:</span> admin@test.com / 123456
        </p>
      </div>

      {error && (
        <div className="mb-5 p-3 rounded-xl bg-red-500/5 border border-red-500/20 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Input
          label="Email address"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="you@example.com"
          icon={Mail}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          placeholder="••••••••"
          icon={Lock}
          required
        />

        <Button
          type="submit"
          loading={loading}
          className="w-full mt-2"
          iconRight={ArrowRight}
        >
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <Link to="/register" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors">
          Create one
        </Link>
      </p>
    </AuthLayout>
  )
}
