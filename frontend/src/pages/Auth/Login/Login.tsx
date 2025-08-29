import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { authApi } from "@/api/authApi";
import { toast } from "react-hot-toast";
import { validateEmail } from "@/utils/helper";
import PasswordInput from "@/components/Auth/Input/PasswordInput";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!password.trim()) {
      toast.error("Please enter the password.");
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      const { token, user } = res.data.data;
      auth?.login(token, user);
      navigate("/");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Login failed, please try again."
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
            <h2 className="text-2xl md:text-3xl font-semibold">Welcome Back!</h2>
            <p className="text-xs md:text-sm opacity-90">
              Track your time, hit your targets, and level-up your skills.
            </p>
            <p className="text-xs opacity-70">© 2024 Scroll2Skill — Waktuku Kemana</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
              Sign In
            </h2>
            <p className="text-sm text-gray-500 mb-6 md:mb-8 text-center">
              Enter your credentials to continue
            </p>

            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition"
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
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-center text-xs md:text-sm text-gray-600 mt-6">
              Not registered yet?{" "}
              <Link
                to="/register"
                className="font-medium text-secondary hover:underline"
              >
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}