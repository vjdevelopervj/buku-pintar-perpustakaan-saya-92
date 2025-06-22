
import { useState } from "react";
import NavbarUtama from "@/components/layout/NavbarUtama";
import SidebarAdmin from "@/components/layout/SidebarAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, RotateCcw, CheckCircle, AlertTriangle, Calendar } from "lucide-react";

interface Pengembalian {
  id: number;
  anggota_nama: string;
  anggota_email: string;
  anggota_foto?: string;
  buku_judul: string;
  buku_cover?: string;
  tanggal_pinjam: string;
  tanggal_jatuh_tempo: string;
  tanggal_kembali: string;
  status: "tepat_waktu" | "terlambat";
  hari_terlambat?: number;
  denda?: number;
  kondisi_buku: "baik" | "rusak_ringan" | "rusak_berat";
}

const PengembalianAdmin = () => {
  const [pengembalianList] = useState<Pengembalian[]>([
    {
      id: 1,
      anggota_nama: "Ahmad Farid",
      anggota_email: "ahmad.farid@email.com",
      buku_judul: "Laskar Pelangi",
      tanggal_pinjam: "2024-01-15",
      tanggal_jatuh_tempo: "2024-01-22",
      tanggal_kembali: "2024-01-21",
      status: "tepat_waktu",
      kondisi_buku: "baik"
    },
    {
      id: 2,
      anggota_nama: "Siti Nurhaliza",
      anggota_email: "siti.nur@email.com",
      buku_judul: "Bumi Manusia",
      tanggal_pinjam: "2024-01-10",
      tanggal_jatuh_tempo: "2024-01-17",
      tanggal_kembali: "2024-01-20",
      status: "terlambat",
      hari_terlambat: 3,
      denda: 15000,
      kondisi_buku: "baik"
    },
    {
      id: 3,
      anggota_nama: "Budi Santoso",
      anggota_email: "budi.santoso@email.com",
      buku_judul: "Ronggeng Dukuh Paruk",
      tanggal_pinjam: "2024-01-05",
      tanggal_jatuh_tempo: "2024-01-12",
      tanggal_kembali: "2024-01-12",
      status: "tepat_waktu",
      kondisi_buku: "rusak_ringan"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPengembalian = pengembalianList.filter(pengembalian =>
    pengembalian.anggota_nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pengembalian.buku_judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPengembalian = pengembalianList.length;
  const pengembalianTepatWaktu = pengembalianList.filter(p => p.status === "tepat_waktu").length;
  const pengembalianTerlambat = pengembalianList.filter(p => p.status === "terlambat").length;
  const totalDenda = pengembalianList.reduce((total, p) => total + (p.denda || 0), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "tepat_waktu": return "default";
      case "terlambat": return "destructive";
      default: return "default";
    }
  };

  const getKondisiColor = (kondisi: string) => {
    switch (kondisi) {
      case "baik": return "default";
      case "rusak_ringan": return "secondary";
      case "rusak_berat": return "destructive";
      default: return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "tepat_waktu": return <CheckCircle className="h-4 w-4" />;
      case "terlambat": return <AlertTriangle className="h-4 w-4" />;
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
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Pengembalian</h1>
            <p className="mt-2 text-gray-600">Proses pengembalian buku</p>
          </div>

          {/* Statistik Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pengembalian</CardTitle>
                <RotateCcw className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPengembalian}</div>
                <p className="text-xs text-muted-foreground">
                  Semua pengembalian
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tepat Waktu</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{pengembalianTepatWaktu}</div>
                <p className="text-xs text-muted-foreground">
                  Pengembalian tepat waktu
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Terlambat</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{pengembalianTerlambat}</div>
                <p className="text-xs text-muted-foreground">
                  Pengembalian terlambat
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Denda</CardTitle>
                <Calendar className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  Rp {totalDenda.toLocaleString('id-ID')}
                </div>
                <p className="text-xs text-muted-foreground">
                  Denda yang terkumpul
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari pengembalian..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
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
                    <TableHead>Tgl Pinjam</TableHead>
                    <TableHead>Jatuh Tempo</TableHead>
                    <TableHead>Tgl Kembali</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Kondisi</TableHead>
                    <TableHead>Denda</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPengembalian.map((pengembalian) => (
                    <TableRow key={pengembalian.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={pengembalian.anggota_foto} />
                            <AvatarFallback>
                              {pengembalian.anggota_nama.split(" ").map(n => n[0]).join("").toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{pengembalian.anggota_nama}</p>
                            <p className="text-sm text-gray-500">{pengembalian.anggota_email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="h-12 w-8 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                          {pengembalian.buku_cover ? (
                            <img src={pengembalian.buku_cover} alt={pengembalian.buku_judul} className="h-full w-full object-cover" />
                          ) : (
                            <RotateCcw className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{pengembalian.buku_judul}</TableCell>
                      <TableCell>{new Date(pengembalian.tanggal_pinjam).toLocaleDateString('id-ID')}</TableCell>
                      <TableCell>{new Date(pengembalian.tanggal_jatuh_tempo).toLocaleDateString('id-ID')}</TableCell>
                      <TableCell>{new Date(pengembalian.tanggal_kembali).toLocaleDateString('id-ID')}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(pengembalian.status)} className="flex items-center space-x-1">
                          {getStatusIcon(pengembalian.status)}
                          <span>
                            {pengembalian.status === "tepat_waktu" ? "Tepat Waktu" : 
                             `Terlambat ${pengembalian.hari_terlambat} hari`}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getKondisiColor(pengembalian.kondisi_buku)}>
                          {pengembalian.kondisi_buku === "baik" ? "Baik" :
                           pengembalian.kondisi_buku === "rusak_ringan" ? "Rusak Ringan" : "Rusak Berat"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {pengembalian.denda ? (
                          <span className="text-red-600 font-medium">
                            Rp {pengembalian.denda.toLocaleString('id-ID')}
                          </span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
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

export default PengembalianAdmin;
