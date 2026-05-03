import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import AuthLayout from '../../components/layout/AuthLayout.jsx'
import Input  from '../../components/common/Input.jsx'
import Button from '../../components/common/Button.jsx'

export default function RegisterPage() {
  const { registerUser } = useAuth()
  const navigate         = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)

  const onChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    setErrors(p => ({ ...p, [e.target.name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())           e.name = 'Name is required'
    if (!form.email.trim())          e.email = 'Email is required'
    if (form.password.length < 6)    e.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await registerUser({ name: form.name, email: form.email, password: form.password })
      navigate('/dashboard')
    } catch (err) {
      setErrors({ api: err?.response?.data?.message || 'Registration failed.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Create account" subtitle="Join to start booking resources.">
      {errors.api && (
        <div className="mb-5 p-3 rounded-xl bg-red-500/5 border border-red-500/20 text-sm text-red-400">
          {errors.api}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Input
          label="Full name"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Your name"
          icon={User}
          error={errors.name}
          required
        />
        <Input
          label="Email address"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="you@example.com"
          icon={Mail}
          error={errors.email}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          placeholder="Min. 6 characters"
          icon={Lock}
          error={errors.password}
          required
        />
        <Input
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={onChange}
          placeholder="Repeat password"
          icon={Lock}
          error={errors.confirmPassword}
          required
        />

        <Button
          type="submit"
          loading={loading}
          className="w-full mt-2"
          iconRight={ArrowRight}
        >
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
