import { useNavigate } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <Search size={80} className="text-secondary mb-6" />

      <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-8 max-w-sm text-center">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          Go Back
        </Button>
        <Button
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <Home size={18} />
          Back to Home
        </Button>
      </div>
    </div>
  );
}