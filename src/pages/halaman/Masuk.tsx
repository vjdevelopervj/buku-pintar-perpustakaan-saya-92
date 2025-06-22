
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface HalamanMasukProps {
  onLogin?: (isLoggedIn: boolean) => void;
  onRoleChange?: (role: 'admin' | 'pengunjung') => void;
}

const HalamanMasuk = ({ onLogin, onRoleChange }: HalamanMasukProps) => {
  const [email, setEmail] = useState("");
  const [kataSandi, setKataSandi] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi login - pada implementasi nyata akan menggunakan API
    setTimeout(() => {
      if (email && kataSandi) {
        const role = email.includes('admin') ? 'admin' : 'pengunjung';
        
        toast({
          title: "Login Berhasil",
          description: `Selamat datang di Sistem Perpustakaan!`,
        });
        
        if (onLogin) onLogin(true);
        if (onRoleChange) onRoleChange(role);
        
        navigate(role === 'admin' ? '/admin/beranda' : '/pengunjung/beranda');
      } else {
        toast({
          title: "Login Gagal",
          description: "Email dan kata sandi wajib diisi",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full">
              <Book className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Masuk ke Sistem</CardTitle>
          <CardDescription className="text-gray-600">
            Silakan masuk untuk mengakses sistem perpustakaan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kata_sandi">Kata Sandi</Label>
              <div className="relative">
                <Input
                  id="kata_sandi"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan kata sandi"
                  value={kataSandi}
                  onChange={(e) => setKataSandi(e.target.value)}
                  required
                  className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Belum memiliki akun?{" "}
              <Link
                to="/daftar"
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Daftar di sini
              </Link>
            </p>
          </div>
          <div className="mt-4 text-xs text-gray-500 text-center">
            <p>Demo: gunakan admin@test.com untuk admin atau user@test.com untuk pengunjung</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HalamanMasuk;
