import { useState } from "react";
import { PasswordInput } from "../../../components/Auth/Input/PasswordInput";
import { validateEmail } from "../../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../../api/authApi";
import { toast } from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await authApi.register({ name, email, password });
      navigate("/login");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Registration failed, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 overflow-y-auto">
      <div className="flex w-full max-w-5xl rounded-xl shadow-xl overflow-hidden flex-col md:flex-row">

        <div className="hidden md:flex w-full md:w-1/2 bg-secondary flex-col justify-between p-6 md:p-10 text-white">
          <div className="flex items-center space-x-3">
            <img
              className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-lg bg-white p-1"
              src="/assets/scroll2skill.png"
              alt="Logo"
            />
            <h1 className="text-xl md:text-2xl font-bold">Scroll2Skill</h1>
          </div>

          <div className="space-y-4">
            <img
              className="w-60 md:w-72 object-contain mx-auto"
              src="/assets/logres.png"
              alt="Illustration"
            />
            <h2 className="text-2xl md:text-3xl font-semibold">Create an Account</h2>
            <p className="text-xs md:text-sm opacity-90">
              Track your time, hit your targets, and level-up your skills.
            </p>
            <p className="text-xs opacity-70">© 2024 Scroll2Skill — Waktuku Kemana</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
              Sign Up
            </h2>
            <p className="text-sm text-gray-500 mb-6 md:mb-8 text-center">
              Fill in the details below to get started
            </p>

            <form onSubmit={handleRegister} className="space-y-4 md:space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Password</label>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-secondary/90 text-white font-semibold py-2.5 md:py-3 rounded-lg hover:bg-secondary disabled:opacity-50 transition"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-xs md:text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-secondary hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}