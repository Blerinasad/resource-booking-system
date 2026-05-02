import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [form, setForm] = useState({
    email: "admin@test.com",
    password: "123456",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(form.email, form.password);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white">Login</h1>
        <p className="text-slate-400 mt-2">Access your resource dashboard.</p>

        {error && (
          <div className="mt-5 rounded-xl bg-red-500/10 border border-red-400/20 p-3 text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full rounded-2xl bg-slate-900 border border-white/10 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full rounded-2xl bg-slate-900 border border-white/10 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />

          <button className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 py-3 font-semibold text-white hover:opacity-90 transition">
            Login
          </button>
        </form>

        <p className="text-slate-400 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-cyan-300">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}