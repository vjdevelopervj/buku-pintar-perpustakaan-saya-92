
import NavbarUtama from "@/components/layout/NavbarUtama";
import SidebarPengunjung from "@/components/layout/SidebarPengunjung";

const PeminjamanSaya = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarUtama namaLengkap="Ahmad Farid" />
      <SidebarPengunjung />
      
      <div className="lg:pl-64">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Peminjaman Saya</h1>
          <p className="mt-2 text-gray-600">Lihat riwayat dan status peminjaman buku Anda</p>
          {/* Content akan ditambahkan di iterasi selanjutnya */}
        </div>
      </div>
    </div>
  );
};

export default PeminjamanSaya;
