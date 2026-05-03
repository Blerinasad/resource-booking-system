import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Mail, UserRound } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await registerUser(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Register and start using the booking platform.">
      {error && <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <UserRound className="pointer-events-none absolute left-4 top-[42px] text-slate-500" size={18} />
          <Input label="Full name" name="name" value={form.name} onChange={handleChange} className="pl-11" placeholder="Getuar Jakupi" />
        </div>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-[42px] text-slate-500" size={18} />
          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} className="pl-11" placeholder="you@example.com" />
        </div>
        <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Minimum 6 characters" />
        <Select label="Role" name="role" value={form.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </Select>
        <Button disabled={loading} className="flex w-full items-center justify-center gap-2">
          {loading ? "Creating account..." : "Register"} <ArrowRight size={18} />
        </Button>
      </form>
      <p className="mt-7 text-center text-sm text-slate-400">
        Already registered? <Link className="font-semibold text-cyan-300 hover:text-cyan-200" to="/login">Login</Link>
      </p>
    </AuthLayout>
  );
}
