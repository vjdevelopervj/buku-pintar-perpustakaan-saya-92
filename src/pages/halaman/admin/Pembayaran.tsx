
import NavbarUtama from "@/components/layout/NavbarUtama";
import SidebarAdmin from "@/components/layout/SidebarAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Search, Filter, Eye, CheckCircle, Clock, DollarSign } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PembayaranAdmin = () => {
  const riwayatPembayaran = [
    {
      id: 1,
      nomorTransaksi: "TRX001",
      namaPeminjam: "Ahmad Farid",
      judulBuku: "Laskar Pelangi",
      jumlahDenda: 25000,
      metodePembayaran: "Tunai",
      tanggalPembayaran: "2024-06-23",
      status: "Berhasil"
    },
    {
      id: 2,
      nomorTransaksi: "TRX002",
      namaPeminjam: "Siti Nurhaliza",
      judulBuku: "Ayat-Ayat Cinta",
      jumlahDenda: 35000,
      metodePembayaran: "Transfer Bank",
      tanggalPembayaran: "2024-06-22",
      status: "Berhasil"
    },
    {
      id: 3,
      nomorTransaksi: "TRX003",
      namaPeminjam: "Budi Santoso",
      judulBuku: "Negeri 5 Menara",
      jumlahDenda: 50000,
      metodePembayaran: "E-Wallet",
      tanggalPembayaran: "2024-06-23",
      status: "Pending"
    },
    {
      id: 4,
      nomorTransaksi: "TRX004",
      namaPeminjam: "Dewi Lestari",
      judulBuku: "Sang Pemimpi",
      jumlahDenda: 15000,
      metodePembayaran: "Tunai",
      tanggalPembayaran: "2024-06-21",
      status: "Berhasil"
    }
  ];

  const statistikPembayaran = [
    { title: "Total Pembayaran Hari Ini", value: "Rp 75,000", icon: DollarSign, color: "green" },
    { title: "Pembayaran Berhasil", value: "12", icon: CheckCircle, color: "blue" },
    { title: "Pembayaran Pending", value: "3", icon: Clock, color: "yellow" },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: "bg-green-500 text-green-50",
      blue: "bg-blue-500 text-blue-50",
      yellow: "bg-yellow-500 text-yellow-50",
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Berhasil":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Gagal":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMetodeBayarColor = (metode: string) => {
    switch (metode) {
      case "Tunai":
        return "bg-blue-100 text-blue-800";
      case "Transfer Bank":
        return "bg-purple-100 text-purple-800";
      case "E-Wallet":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDetailTransaksi = (nomor: string) => {
    toast({
      title: "Detail Transaksi",
      description: `Menampilkan detail transaksi ${nomor}`,
    });
  };

  const handleKonfirmasiPembayaran = (nomor: string) => {
    toast({
      title: "Konfirmasi Pembayaran",
      description: `Pembayaran ${nomor} telah dikonfirmasi`,
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
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Pembayaran</h1>
            <p className="mt-2 text-gray-600">Kelola pembayaran denda dan transaksi perpustakaan</p>
          </div>

          {/* Statistik Pembayaran */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statistikPembayaran.map((stat, index) => (
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
                    placeholder="Cari nomor transaksi atau nama peminjam..." 
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="md:w-48">
                    <SelectValue placeholder="Status Pembayaran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua Status</SelectItem>
                    <SelectItem value="berhasil">Berhasil</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="gagal">Gagal</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="md:w-48">
                    <SelectValue placeholder="Metode Pembayaran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua Metode</SelectItem>
                    <SelectItem value="tunai">Tunai</SelectItem>
                    <SelectItem value="transfer">Transfer Bank</SelectItem>
                    <SelectItem value="ewallet">E-Wallet</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabel Riwayat Pembayaran */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-600" />
                Riwayat Pembayaran Denda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">No. Transaksi</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Peminjam</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Buku</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Jumlah</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Metode</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Tanggal</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riwayatPembayaran.map((pembayaran) => (
                      <tr key={pembayaran.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="font-mono text-sm font-medium text-blue-600">
                            {pembayaran.nomorTransaksi}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{pembayaran.namaPeminjam}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-gray-600">{pembayaran.judulBuku}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-semibold text-green-600">
                            Rp {pembayaran.jumlahDenda.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getMetodeBayarColor(pembayaran.metodePembayaran)}>
                            {pembayaran.metodePembayaran}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-gray-600">{pembayaran.tanggalPembayaran}</div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getStatusColor(pembayaran.status)}>
                            {pembayaran.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDetailTransaksi(pembayaran.nomorTransaksi)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {pembayaran.status === "Pending" && (
                              <Button 
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleKonfirmasiPembayaran(pembayaran.nomorTransaksi)}
                              >
                                <CheckCircle className="mr-1 h-4 w-4" />
                                Konfirmasi
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

export default PembayaranAdmin;
