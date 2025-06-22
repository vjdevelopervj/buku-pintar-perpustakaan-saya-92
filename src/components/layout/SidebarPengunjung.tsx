
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Book, 
  BookOpen, 
  RotateCcw 
} from "lucide-react";

const menuItems = [
  { title: "Beranda", href: "/pengunjung/beranda", icon: Home },
  { title: "Katalog Buku", href: "/pengunjung/katalog-buku", icon: Book },
  { title: "Peminjaman Saya", href: "/pengunjung/peminjaman-saya", icon: BookOpen },
  { title: "Pengembalian Buku", href: "/pengunjung/pengembalian-buku", icon: RotateCcw },
];

const SidebarPengunjung = () => {
  const location = useLocation();

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16">
      <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-3 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.title}
                  to={item.href}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 transition-colors",
                      isActive ? "text-white" : "text-gray-500 group-hover:text-blue-700"
                    )}
                  />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SidebarPengunjung;
