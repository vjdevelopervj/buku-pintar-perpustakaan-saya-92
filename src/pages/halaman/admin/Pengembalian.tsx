
import NavbarUtama from "@/components/layout/NavbarUtama";
import SidebarAdmin from "@/components/layout/SidebarAdmin";

const PengembalianAdmin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarUtama namaLengkap="Admin Perpustakaan" />
      <SidebarAdmin />
      
      <div className="lg:pl-64">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Pengembalian</h1>
          <p className="mt-2 text-gray-600">Proses pengembalian buku</p>
          {/* Content akan ditambahkan di iterasi selanjutnya */}
        </div>
      </div>
    </div>
  );
};

export default PengembalianAdmin;
