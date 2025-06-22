
import NavbarUtama from "@/components/layout/NavbarUtama";
import SidebarPengunjung from "@/components/layout/SidebarPengunjung";

const PengembalianBuku = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarUtama namaLengkap="Ahmad Farid" />
      <SidebarPengunjung />
      
      <div className="lg:pl-64">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Pengembalian Buku</h1>
          <p className="mt-2 text-gray-600">Ajukan pengembalian buku yang telah dipinjam</p>
          {/* Content akan ditambahkan di iterasi selanjutnya */}
        </div>
      </div>
    </div>
  );
};

export default PengembalianBuku;
