
import NavbarUtama from "@/components/layout/NavbarUtama";
import SidebarPengunjung from "@/components/layout/SidebarPengunjung";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RotateCcw, BookOpen, Calendar, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PengembalianBuku = () => {
  const bukuDipinjam = [
    {
      id: 1,
      judulBuku: "Laskar Pelangi",
      tanggalPinjam: "2024-06-18",
      tanggalKembali: "2024-06-25",
      status: "Normal",
      denda: 0,
      cover: ""
    },
    {
      id: 2,
      judulBuku: "Ayat-Ayat Cinta",
      tanggalPinjam: "2024-06-21",
      tanggalKembali: "2024-06-28",
      status: "Normal",
      denda: 0,
      cover: ""
    },
    {
      id: 3,
      judulBuku: "Negeri 5 Menara",
      tanggalPinjam: "2024-06-13",
      tanggalKembali: "2024-06-20",
      status: "Terlambat",
      denda: 25000,
      cover: ""
    }
  ];

  const riwayatPengembalian = [
    {
      id: 1,
      judulBuku: "Sang Pemimpi",
      tanggalPinjam: "2024-06-05",
      tanggalKembali: "2024-06-12",
      tanggalDikembalikan: "2024-06-12",
      status: "Dikembalikan",
      kondisi: "Baik"
    },
    {
      id: 2,
      judulBuku: "Perahu Kertas",
      tanggalPinjam: "2024-05-28",
      tanggalKembali: "2024-06-04",
      tanggalDikembalikan: "2024-06-04",
      status: "Dikembalikan",
      kondisi: "Baik"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Normal":
        return "bg-green-100 text-green-800";
      case "Terlambat":
        return "bg-red-100 text-red-800";
      case "Dikembalikan":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAjukanPengembalian = (judul: string, id: number) => {
    toast({
      title: "Pengembalian Diajukan",
      description: `Permintaan pengembalian untuk "${judul}" telah berhasil diajukan`,
    });
  };

  const calculateDaysLate = (returnDate: string) => {
    const today = new Date();
    const returnDateObj = new Date(returnDate);
    const diffTime = today.getTime() - returnDateObj.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarUtama namaLengkap="Ahmad Farid" />
      <SidebarPengunjung />
      
      <div className="lg:pl-64">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Pengembalian Buku</h1>
            <p className="mt-2 text-gray-600">Ajukan pengembalian buku yang telah dipinjam</p>
          </div>

          {/* Informasi Penting */}
          <Card className="mb-8 border-l-4 border-l-blue-500 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Informasi Pengembalian</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Buku harus dikembalikan sesuai tanggal yang telah ditentukan</li>
                    <li>• Keterlambatan pengembalian akan dikenakan denda Rp 5.000 per hari</li>
                    <li>• Pastikan kondisi buku tetap baik saat dikembalikan</li>
                    <li>• Pengembalian dapat dilakukan di perpustakaan atau melalui sistem online</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Buku Sedang Dipinjam */}
          <Card className="mb-8 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Buku Sedang Dipinjam
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bukuDipinjam.map((buku) => (
                  <Card key={buku.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center flex-shrink-0">
                          <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">{buku.judulBuku}</h4>
                              <div className="text-sm text-gray-600 mt-1">
                                <p>Tanggal Pinjam: {buku.tanggalPinjam}</p>
                                <p>Tanggal Kembali: {buku.tanggalKembali}</p>
                                {buku.status === "Terlambat" && (
                                  <p className="text-red-600 font-medium">
                                    Terlambat {calculateDaysLate(buku.tanggalKembali)} hari
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(buku.status)}>
                                {buku.status}
                              </Badge>
                              {buku.denda > 0 && (
                                <p className="text-red-600 font-semibold text-sm mt-1">
                                  Denda: Rp {buku.denda.toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm"
                              onClick={() => handleAjukanPengembalian(buku.judulBuku, buku.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <RotateCcw className="mr-2 h-4 w-4" />
                              Ajukan Pengembalian
                            </Button>
                            {buku.status === "Terlambat" && (
                              <Badge variant="destructive" className="text-xs">
                                Bayar denda saat pengembalian
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Form Pengembalian Manual */}
          <Card className="mb-8 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-green-600" />
                Form Pengembalian Manual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kode Buku atau Judul
                  </label>
                  <Input placeholder="Masukkan kode buku atau judul buku" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kondisi Buku
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Pilih kondisi buku</option>
                    <option value="baik">Baik</option>
                    <option value="rusak-ringan">Rusak Ringan</option>
                    <option value="rusak-berat">Rusak Berat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catatan (Opsional)
                  </label>
                  <Textarea 
                    placeholder="Tambahkan catatan jika ada kerusakan atau hal khusus lainnya..."
                    rows={3}
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Submit Pengembalian
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Riwayat Pengembalian */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                Riwayat Pengembalian Terakhir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riwayatPengembalian.map((riwayat) => (
                  <div key={riwayat.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{riwayat.judulBuku}</p>
                        <p className="text-sm text-gray-500">
                          Dikembalikan: {riwayat.tanggalDikembalikan}
                        </p>
                        <p className="text-sm text-gray-500">
                          Kondisi: {riwayat.kondisi}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(riwayat.status)}>
                      {riwayat.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PengembalianBuku;
