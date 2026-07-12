import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/lib/themeContext";

export default function NotFound() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen w-full flex items-center justify-center transition-colors duration-300 ${
      theme === 'light' ? 'bg-gray-50' : 'bg-background'
    }`}>
      <Card className={`w-full max-w-md mx-4 ${
        theme === 'light' ? '' : 'bg-card border-white/10'
      }`}>
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className={`text-2xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>404 Page Not Found</h1>
          </div>

          <p className={`mt-4 text-sm mb-6 ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            The page you're looking for doesn't exist or has been moved.
          </p>

          <Link href="/">
            <button className="gradient-bg text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
              <Home className="w-4 h-4" /> Return to Home
            </button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
