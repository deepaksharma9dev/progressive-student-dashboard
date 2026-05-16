import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "deepak@example.com",
    password: "password123",
    role: "student",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const isSignup = mode === "signup";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = isSignup
        ? {
            name: form.name.trim(),
            email: form.email.trim(),
            password: form.password,
            role: form.role,
          }
        : {
            email: form.email.trim(),
            password: form.password,
          };

      const endpoint = isSignup ? "/auth/register" : "/auth/login";
      const response = await api.post(endpoint, payload);

      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (isSignup ? "Sign up failed" : "Login failed")
      );
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError("");
  };


  return (
    <div className="min-h-screen bg-[#f7faff] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
            <GraduationCap size={30} />
          </div>

          <h1 className="text-2xl font-black text-blue-700 mt-4">
            Progress Dashboard
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Empowering Self-Learning for Modern Learners
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-7">
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`rounded-lg py-2 text-sm font-black transition ${
                !isSignup
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => switchMode("signup")}
              className={`rounded-lg py-2 text-sm font-black transition ${
                isSignup
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="text-xl font-black text-slate-900 mt-6">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            {isSignup
              ? "Start tracking your learning progress today."
              : "Please enter your credentials to continue."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {isSignup && (
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Full Name
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Deepak Sharma"
                  required={isSignup}
                />
              </div>
            )}

            <div>
              <label className="text-sm font-bold text-slate-700">
                Email Address
              </label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="student@example.com"
                type="email"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700">
                  Password
                </label>

                {!isSignup && (
                  <span className="text-xs font-bold text-blue-600">
                    Forgot password?
                  </span>
                )}
              </div>

              <div className="relative mt-2">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="password123"
                  minLength={6}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isSignup ? (
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Account Type
                </label>

                <div className="mt-2 grid grid-cols-2 gap-3">
                  {["student", "mentor"].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          role,
                        })
                      }
                      className={`rounded-xl border px-4 py-3 text-sm font-black capitalize transition ${
                        form.role === role
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <label className="flex items-center gap-2 text-xs text-slate-500">
                <input type="checkbox" className="rounded border-slate-300" />
                Keep me logged in for 30 days
              </label>
            )}

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white rounded-xl py-3 text-sm font-black hover:bg-blue-700 disabled:opacity-60"
            >
              {loading
                ? isSignup
                  ? "Creating account..."
                  : "Logging in..."
                : isSignup
                  ? "Create Account"
                  : "Login to Dashboard"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => switchMode(isSignup ? "login" : "signup")}
            className="font-black text-blue-600 hover:text-blue-700"
          >
            {isSignup ? "Login instead" : "Create one now"}
          </button>
        </p>

        <div className="flex justify-center gap-5 mt-5 text-xs text-slate-400">
          <span>Help Center</span>
          <span>Privacy Policy</span>
          <span>Accessibility</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
