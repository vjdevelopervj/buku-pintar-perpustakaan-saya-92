
import { useState } from "react";
import NavbarUtama from "@/components/layout/NavbarUtama";
import SidebarAdmin from "@/components/layout/SidebarAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Search, BookOpen, Clock, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Peminjaman {
  id: number;
  anggota_nama: string;
  anggota_email: string;
  anggota_foto?: string;
  buku_judul: string;
  buku_cover?: string;
  tanggal_pinjam: string;
  tanggal_kembali: string;
  status: "dipinjam" | "terlambat" | "dikembalikan";
  denda?: number;
}

const PeminjamanAdmin = () => {
  const [peminjamanList, setPeminjamanList] = useState<Peminjaman[]>([
    {
      id: 1,
      anggota_nama: "Ahmad Farid",
      anggota_email: "ahmad.farid@email.com",
      buku_judul: "Laskar Pelangi",
      tanggal_pinjam: "2024-01-15",
      tanggal_kembali: "2024-01-22",
      status: "dipinjam"
    },
    {
      id: 2,
      anggota_nama: "Siti Nurhaliza",
      anggota_email: "siti.nur@email.com",
      buku_judul: "Bumi Manusia",
      tanggal_pinjam: "2024-01-10",
      tanggal_kembali: "2024-01-17",
      status: "terlambat",
      denda: 15000
    },
    {
      id: 3,
      anggota_nama: "Budi Santoso",
      anggota_email: "budi.santoso@email.com",
      buku_judul: "Ronggeng Dukuh Paruk",
      tanggal_pinjam: "2024-01-05",
      tanggal_kembali: "2024-01-12",
      status: "dikembalikan"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    anggota_email: "",
    buku_judul: "",
    tanggal_kembali: ""
  });

  const filteredPeminjaman = peminjamanList.filter(peminjaman =>
    peminjaman.anggota_nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    peminjaman.buku_judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPeminjaman = peminjamanList.length;
  const peminjamanAktif = peminjamanList.filter(p => p.status === "dipinjam").length;
  const peminjamanTerlambat = peminjamanList.filter(p => p.status === "terlambat").length;
  const peminjamanSelesai = peminjamanList.filter(p => p.status === "dikembalikan").length;

  const handleAddPeminjaman = () => {
    const tanggalPinjam = new Date().toISOString().split('T')[0];
    const newPeminjaman: Peminjaman = {
      id: Date.now(),
      anggota_nama: "Nama Anggota", // Ini harus diambil dari database berdasarkan email
      anggota_email: formData.anggota_email,
      buku_judul: formData.buku_judul,
      tanggal_pinjam: tanggalPinjam,
      tanggal_kembali: formData.tanggal_kembali,
      status: "dipinjam"
    };

    setPeminjamanList([...peminjamanList, newPeminjaman]);
    setFormData({ anggota_email: "", buku_judul: "", tanggal_kembali: "" });
    setIsAddModalOpen(false);
    toast({
      title: "Berhasil",
      description: "Peminjaman baru berhasil ditambahkan",
    });
  };

  const updateStatus = (id: number, newStatus: "dipinjam" | "terlambat" | "dikembalikan") => {
    const updatedList = peminjamanList.map(peminjaman =>
      peminjaman.id === id
        ? { ...peminjaman, status: newStatus }
        : peminjaman
    );
    setPeminjamanList(updatedList);
    toast({
      title: "Berhasil",
      description: "Status peminjaman berhasil diperbarui",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "dipinjam": return "default";
      case "terlambat": return "destructive";
      case "dikembalikan": return "secondary";
      default: return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "dipinjam": return <Clock className="h-4 w-4" />;
      case "terlambat": return <XCircle className="h-4 w-4" />;
      case "dikembalikan": return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarUtama namaLengkap="Admin Perpustakaan" />
      <SidebarAdmin />
      
      <div className="lg:pl-64">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Peminjaman</h1>
            <p className="mt-2 text-gray-600">Kelola data peminjaman buku</p>
          </div>

          {/* Statistik Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Peminjaman</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPeminjaman}</div>
                <p className="text-xs text-muted-foreground">
                  Semua peminjaman
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Peminjaman Aktif</CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{peminjamanAktif}</div>
                <p className="text-xs text-muted-foreground">
                  Sedang dipinjam
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Terlambat</CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{peminjamanTerlambat}</div>
                <p className="text-xs text-muted-foreground">
                  Peminjaman terlambat
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Selesai</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{peminjamanSelesai}</div>
                <p className="text-xs text-muted-foreground">
                  Sudah dikembalikan
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Actions and Search */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari peminjaman..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Peminjaman
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Tambah Peminjaman Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="anggota">Email Anggota</Label>
                    <Input
                      id="anggota"
                      type="email"
                      placeholder="anggota@email.com"
                      value={formData.anggota_email}
                      onChange={(e) => setFormData({ ...formData, anggota_email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="buku">Judul Buku</Label>
                    <Input
                      id="buku"
                      placeholder="Masukkan judul buku"
                      value={formData.buku_judul}
                      onChange={(e) => setFormData({ ...formData, buku_judul: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tanggal_kembali">Tanggal Kembali</Label>
                    <Input
                      id="tanggal_kembali"
                      type="date"
                      value={formData.tanggal_kembali}
                      onChange={(e) => setFormData({ ...formData, tanggal_kembali: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                      Batal
                    </Button>
                    <Button onClick={handleAddPeminjaman}>
                      Simpan
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Anggota</TableHead>
                    <TableHead>Cover</TableHead>
                    <TableHead>Buku</TableHead>
                    <TableHead>Tanggal Pinjam</TableHead>
                    <TableHead>Tanggal Kembali</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Denda</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPeminjaman.map((peminjaman) => (
                    <TableRow key={peminjaman.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={peminjaman.anggota_foto} />
                            <AvatarFallback>
                              {peminjaman.anggota_nama.split(" ").map(n => n[0]).join("").toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{peminjaman.anggota_nama}</p>
                            <p className="text-sm text-gray-500">{peminjaman.anggota_email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="h-12 w-8 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                          {peminjaman.buku_cover ? (
                            <img src={peminjaman.buku_cover} alt={peminjaman.buku_judul} className="h-full w-full object-cover" />
                          ) : (
                            <BookOpen className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{peminjaman.buku_judul}</TableCell>
                      <TableCell>{new Date(peminjaman.tanggal_pinjam).toLocaleDateString('id-ID')}</TableCell>
                      <TableCell>{new Date(peminjaman.tanggal_kembali).toLocaleDateString('id-ID')}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(peminjaman.status)} className="flex items-center space-x-1">
                          {getStatusIcon(peminjaman.status)}
                          <span>{peminjaman.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {peminjaman.denda ? `Rp ${peminjaman.denda.toLocaleString('id-ID')}` : "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {peminjaman.status === "dipinjam" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateStatus(peminjaman.id, "dikembalikan")}
                            >
                              Kembalikan
                            </Button>
                          )}
                          {peminjaman.status === "terlambat" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateStatus(peminjaman.id, "dikembalikan")}
                            >
                              Kembalikan
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PeminjamanAdmin;
