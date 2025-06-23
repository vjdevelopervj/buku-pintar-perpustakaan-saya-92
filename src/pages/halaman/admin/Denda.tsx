
import NavbarUtama from "@/components/layout/NavbarUtama";
import SidebarAdmin from "@/components/layout/SidebarAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Search, Filter, Eye, CreditCard, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DendaAdmin = () => {
  const daftarDenda = [
    {
      id: 1,
      namaPeminjam: "Ahmad Farid",
      judulBuku: "Laskar Pelangi",
      tanggalKembali: "2024-06-20",
      hariTerlambat: 5,
      jumlahDenda: 25000,
      status: "Belum Bayar"
    },
    {
      id: 2,
      namaPeminjam: "Siti Nurhaliza",
      judulBuku: "Ayat-Ayat Cinta",
      tanggalKembali: "2024-06-18",
      hariTerlambat: 7,
      jumlahDenda: 35000,
      status: "Sudah Bayar"
    },
    {
      id: 3,
      namaPeminjam: "Budi Santoso",
      judulBuku: "Negeri 5 Menara",
      tanggalKembali: "2024-06-15",
      hariTerlambat: 10,
      jumlahDenda: 50000,
      status: "Belum Bayar"
    },
    {
      id: 4,
      namaPeminjam: "Dewi Lestari",
      judulBuku: "Sang Pemimpi",
      tanggalKembali: "2024-06-22",
      hariTerlambat: 3,
      jumlahDenda: 15000,
      status: "Belum Bayar"
    }
  ];

  const statistikDenda = [
    { title: "Total Denda", value: "Rp 125,000", icon: AlertCircle, color: "red" },
    { title: "Sudah Dibayar", value: "Rp 35,000", icon: CreditCard, color: "green" },
    { title: "Belum Dibayar", value: "Rp 90,000", icon: Calendar, color: "orange" },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      red: "bg-red-500 text-red-50",
      green: "bg-green-500 text-green-50",
      orange: "bg-orange-500 text-orange-50",
    };
    return colors[color as keyof typeof colors] || colors.red;
  };

  const getStatusColor = (status: string) => {
    return status === "Sudah Bayar" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const handleDetailDenda = (nama: string) => {
    toast({
      title: "Detail Denda",
      description: `Menampilkan detail denda untuk ${nama}`,
    });
  };

  const handleBayarDenda = (nama: string, jumlah: number) => {
    toast({
      title: "Pembayaran Denda",
      description: `Memproses pembayaran denda Rp ${jumlah.toLocaleString()} untuk ${nama}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarUtama namaLengkap="Admin Perpustakaan" />
      <SidebarAdmin />
      
      <div className="lg:pl-64">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Denda</h1>
            <p className="mt-2 text-gray-600">Kelola denda keterlambatan pengembalian buku</p>
          </div>

          {/* Statistik Denda */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statistikDenda.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${getColorClasses(stat.color)}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filter dan Pencarian */}
          <Card className="mb-8 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Cari nama peminjam atau judul buku..." 
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="md:w-48">
                    <SelectValue placeholder="Status Pembayaran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua Status</SelectItem>
                    <SelectItem value="belum-bayar">Belum Bayar</SelectItem>
                    <SelectItem value="sudah-bayar">Sudah Bayar</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabel Denda */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Daftar Denda Keterlambatan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Peminjam</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Buku</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Tgl Kembali</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Hari Terlambat</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Jumlah Denda</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {daftarDenda.map((denda) => (
                      <tr key={denda.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{denda.namaPeminjam}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-gray-600">{denda.judulBuku}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-gray-600">{denda.tanggalKembali}</div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="destructive">{denda.hariTerlambat} hari</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-semibold text-red-600">
                            Rp {denda.jumlahDenda.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getStatusColor(denda.status)}>
                            {denda.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDetailDenda(denda.namaPeminjam)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {denda.status === "Belum Bayar" && (
                              <Button 
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleBayarDenda(denda.namaPeminjam, denda.jumlahDenda)}
                              >
                                <CreditCard className="mr-1 h-4 w-4" />
                                Bayar
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DendaAdmin;
