
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HalamanMasuk from "./pages/halaman/Masuk";
import HalamanDaftar from "./pages/halaman/Daftar";
import BerandaAdmin from "./pages/halaman/admin/Beranda";
import AnggotaAdmin from "./pages/halaman/admin/Anggota";
import DaftarBukuAdmin from "./pages/halaman/admin/DaftarBuku";
import PeminjamanAdmin from "./pages/halaman/admin/Peminjaman";
import PengembalianAdmin from "./pages/halaman/admin/Pengembalian";
import DendaAdmin from "./pages/halaman/admin/Denda";
import PembayaranAdmin from "./pages/halaman/admin/Pembayaran";
import BerandaPengunjung from "./pages/halaman/pengunjung/Beranda";
import KatalogBuku from "./pages/halaman/pengunjung/KatalogBuku";
import PeminjamanSaya from "./pages/halaman/pengunjung/PeminjamanSaya";
import PengembalianBuku from "./pages/halaman/pengunjung/PengembalianBuku";
import Profil from "./pages/halaman/Profil";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/masuk" element={<HalamanMasuk />} />
          <Route path="/daftar" element={<HalamanDaftar />} />
          <Route path="/admin/beranda" element={<BerandaAdmin />} />
          <Route path="/admin/anggota" element={<AnggotaAdmin />} />
          <Route path="/admin/daftar-buku" element={<DaftarBukuAdmin />} />
          <Route path="/admin/peminjaman" element={<PeminjamanAdmin />} />
          <Route path="/admin/pengembalian" element={<PengembalianAdmin />} />
          <Route path="/admin/denda" element={<DendaAdmin />} />
          <Route path="/admin/pembayaran" element={<PembayaranAdmin />} />
          <Route path="/pengunjung/beranda" element={<BerandaPengunjung />} />
          <Route path="/pengunjung/katalog-buku" element={<KatalogBuku />} />
          <Route path="/pengunjung/peminjaman-saya" element={<PeminjamanSaya />} />
          <Route path="/pengunjung/pengembalian-buku" element={<PengembalianBuku />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
