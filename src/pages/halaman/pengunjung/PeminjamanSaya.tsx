
import NavbarUtama from "@/components/layout/NavbarUtama";
import SidebarPengunjung from "@/components/layout/SidebarPengunjung";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Search, Filter, Calendar, Clock, RotateCcw, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PeminjamanSaya = () => {
  const riwayatPeminjaman = [
    {
      id: 1,
      judulBuku: "Laskar Pelangi",
      tanggalPinjam: "2024-06-18",
      tanggalKembali: "2024-06-25",
      status: "Dipinjam",
      cover: "",
      durasi: "7 hari"
    },
    {
      id: 2,
      judulBuku: "Ayat-Ayat Cinta",
      tanggalPinjam: "2024-06-21",
      tanggalKembali: "2024-06-28",
      status: "Dipinjam",
      cover: "",
      durasi: "7 hari"
    },
    {
      id: 3,
      judulBuku: "Negeri 5 Menara",
      tanggalPinjam: "2024-06-13",
      tanggalKembali: "2024-06-20",
      status: "Terlambat",
      cover: "",
      durasi: "7 hari"
    },
    {
      id: 4,
      judulBuku: "Sang Pemimpi",
      tanggalPinjam: "2024-06-05",
      tanggalKembali: "2024-06-12",
      status: "Dikembalikan",
      cover: "",
      durasi: "7 hari"
    },
    {
      id: 5,
      judulBuku: "Perahu Kertas",
      tanggalPinjam: "2024-05-28",
      tanggalKembali: "2024-06-04",
      status: "Dikembalikan",
      cover: "",
      durasi: "7 hari"
    }
  ];

  const statistikPeminjaman = [
    { title: "Sedang Dipinjam", value: "3", icon: BookOpen, color: "blue" },
    { title: "Total Peminjaman", value: "45", icon: Calendar, color: "green" },
    { title: "Terlambat", value: "1", icon: AlertCircle, color: "red" },
    { title: "Dikembalikan", value: "42", icon: RotateCcw, color: "purple" },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500 text-blue-50",
      green: "bg-green-500 text-green-50",
      red: "bg-red-500 text-red-50",
      purple: "bg-purple-500 text-purple-50",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Dipinjam":
        return "bg-blue-100 text-blue-800";
      case "Terlambat":
        return "bg-red-100 text-red-800";
      case "Dikembalikan":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handlePerpanjang = (judul: string) => {
    toast({
      title: "Perpanjangan Peminjaman",
      description: `Permintaan perpanjangan untuk "${judul}" telah diajukan`,
    });
  };

  const handleKembalikan = (judul: string) => {
    toast({
      title: "Pengembalian Buku",
      description: `Permintaan pengembalian untuk "${judul}" telah diajukan`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarUtama namaLengkap="Ahmad Farid" />
      <SidebarPengunjung />
      
      <div className="lg:pl-64">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Peminjaman Saya</h1>
            <p className="mt-2 text-gray-600">Lihat riwayat dan status peminjaman buku Anda</p>
          </div>

          {/* Statistik Peminjaman */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statistikPeminjaman.map((stat, index) => (
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
                    placeholder="Cari judul buku..." 
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="md:w-48">
                    <SelectValue placeholder="Status Peminjaman" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua Status</SelectItem>
                    <SelectItem value="dipinjam">Sedang Dipinjam</SelectItem>
                    <SelectItem value="terlambat">Terlambat</SelectItem>
                    <SelectItem value="dikembalikan">Dikembalikan</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Daftar Peminjaman */}
          <div className="grid grid-cols-1 gap-6">
            {riwayatPeminjaman.map((peminjaman) => (
              <Card key={peminjaman.id} className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {peminjaman.judulBuku}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>Pinjam: {peminjaman.tanggalPinjam}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>Kembali: {peminjaman.tanggalKembali}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>Durasi: {peminjaman.durasi}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(peminjaman.status)}>
                            {peminjaman.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        {(peminjaman.status === "Dipinjam" || peminjaman.status === "Terlambat") && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handlePerpanjang(peminjaman.judulBuku)}
                            >
                              <Clock className="mr-2 h-4 w-4" />
                              Perpanjang
                            </Button>
                            <Button 
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleKembalikan(peminjaman.judulBuku)}
                            >
                              <RotateCcw className="mr-2 h-4 w-4" />
                              Kembalikan
                            </Button>
                          </>
                        )}
                        {peminjaman.status === "Terlambat" && (
                          <Badge variant="destructive" className="ml-2">
                            Denda berlaku
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">
              Muat Lebih Banyak
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeminjamanSaya;
