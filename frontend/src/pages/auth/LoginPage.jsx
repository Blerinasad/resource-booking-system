import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import { DEFAULT_LOGIN } from "../../config/constants";

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [form, setForm] = useState(DEFAULT_LOGIN);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginUser(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Login to manage resources and analytics.">
      <div className="mb-6 flex justify-center">
        <Badge tone="cyan">Demo: admin@test.com / 123456</Badge>
      </div>
      {error && <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-[42px] text-slate-500" size={18} />
          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} className="pl-11" placeholder="admin@test.com" />
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-[42px] text-slate-500" size={18} />
          <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} className="pl-11" placeholder="••••••" />
        </div>
        <Button disabled={loading} className="flex w-full items-center justify-center gap-2">
          {loading ? "Signing in..." : "Login"} <ArrowRight size={18} />
        </Button>
      </form>
      <p className="mt-7 text-center text-sm text-slate-400">
        No account yet? <Link className="font-semibold text-cyan-300 hover:text-cyan-200" to="/register">Create one</Link>
      </p>
    </AuthLayout>
  );
}
