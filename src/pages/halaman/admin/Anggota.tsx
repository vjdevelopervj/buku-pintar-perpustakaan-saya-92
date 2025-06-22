
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Search, Users, UserCheck, UserX, Camera } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Anggota {
  id: number;
  nama_lengkap: string;
  email: string;
  peran: "admin" | "pengunjung";
  foto_profil?: string;
  dibuat_pada: string;
  status: "aktif" | "nonaktif";
}

const AnggotaAdmin = () => {
  const [anggotaList, setAnggotaList] = useState<Anggota[]>([
    {
      id: 1,
      nama_lengkap: "Ahmad Farid",
      email: "ahmad.farid@email.com",
      peran: "pengunjung",
      dibuat_pada: "15 Jan 2024",
      status: "aktif"
    },
    {
      id: 2,
      nama_lengkap: "Siti Nurhaliza",
      email: "siti.nur@email.com",
      peran: "pengunjung",
      dibuat_pada: "20 Jan 2024",
      status: "aktif"
    },
    {
      id: 3,
      nama_lengkap: "Budi Santoso",
      email: "budi.santoso@email.com",
      peran: "admin",
      dibuat_pada: "10 Jan 2024",
      status: "aktif"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAnggota, setSelectedAnggota] = useState<Anggota | null>(null);
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    email: "",
    peran: "pengunjung" as "admin" | "pengunjung",
    kata_sandi: ""
  });

  const filteredAnggota = anggotaList.filter(anggota =>
    anggota.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
    anggota.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAnggota = anggotaList.length;
  const anggotaAktif = anggotaList.filter(a => a.status === "aktif").length;
  const anggotaNonaktif = anggotaList.filter(a => a.status === "nonaktif").length;

  const handleAddAnggota = () => {
    const newAnggota: Anggota = {
      id: Date.now(),
      nama_lengkap: formData.nama_lengkap,
      email: formData.email,
      peran: formData.peran,
      dibuat_pada: new Date().toLocaleDateString('id-ID'),
      status: "aktif"
    };

    setAnggotaList([...anggotaList, newAnggota]);
    setFormData({ nama_lengkap: "", email: "", peran: "pengunjung", kata_sandi: "" });
    setIsAddModalOpen(false);
    toast({
      title: "Berhasil",
      description: "Anggota baru berhasil ditambahkan",
    });
  };

  const handleEditAnggota = () => {
    if (selectedAnggota) {
      const updatedList = anggotaList.map(anggota =>
        anggota.id === selectedAnggota.id
          ? { ...anggota, ...formData }
          : anggota
      );
      setAnggotaList(updatedList);
      setIsEditModalOpen(false);
      setSelectedAnggota(null);
      toast({
        title: "Berhasil",
        description: "Data anggota berhasil diperbarui",
      });
    }
  };

  const handleDeleteAnggota = (id: number) => {
    setAnggotaList(anggotaList.filter(anggota => anggota.id !== id));
    toast({
      title: "Berhasil",
      description: "Anggota berhasil dihapus",
    });
  };

  const openEditModal = (anggota: Anggota) => {
    setSelectedAnggota(anggota);
    setFormData({
      nama_lengkap: anggota.nama_lengkap,
      email: anggota.email,
      peran: anggota.peran,
      kata_sandi: ""
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarUtama namaLengkap="Admin Perpustakaan" />
      <SidebarAdmin />
      
      <div className="lg:pl-64">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Anggota</h1>
            <p className="mt-2 text-gray-600">Kelola data anggota perpustakaan</p>
          </div>

          {/* Statistik Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Anggota</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalAnggota}</div>
                <p className="text-xs text-muted-foreground">
                  Semua anggota terdaftar
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Anggota Aktif</CardTitle>
                <UserCheck className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{anggotaAktif}</div>
                <p className="text-xs text-muted-foreground">
                  Anggota yang aktif
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Anggota Nonaktif</CardTitle>
                <UserX className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{anggotaNonaktif}</div>
                <p className="text-xs text-muted-foreground">
                  Anggota yang nonaktif
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Actions and Search */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari anggota..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Anggota
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Tambah Anggota Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nama">Nama Lengkap</Label>
                    <Input
                      id="nama"
                      value={formData.nama_lengkap}
                      onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="peran">Peran</Label>
                    <select
                      id="peran"
                      value={formData.peran}
                      onChange={(e) => setFormData({ ...formData, peran: e.target.value as "admin" | "pengunjung" })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="pengunjung">Pengunjung</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="password">Kata Sandi</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.kata_sandi}
                      onChange={(e) => setFormData({ ...formData, kata_sandi: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                      Batal
                    </Button>
                    <Button onClick={handleAddAnggota}>
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
                    <TableHead>Foto</TableHead>
                    <TableHead>Nama Lengkap</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Peran</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal Daftar</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAnggota.map((anggota) => (
                    <TableRow key={anggota.id}>
                      <TableCell>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={anggota.foto_profil} />
                          <AvatarFallback>
                            {anggota.nama_lengkap.split(" ").map(n => n[0]).join("").toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{anggota.nama_lengkap}</TableCell>
                      <TableCell>{anggota.email}</TableCell>
                      <TableCell>
                        <Badge variant={anggota.peran === "admin" ? "default" : "secondary"}>
                          {anggota.peran}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={anggota.status === "aktif" ? "default" : "destructive"}>
                          {anggota.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{anggota.dibuat_pada}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(anggota)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteAnggota(anggota.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Edit Modal */}
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Anggota</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-nama">Nama Lengkap</Label>
                  <Input
                    id="edit-nama"
                    value={formData.nama_lengkap}
                    onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-peran">Peran</Label>
                  <select
                    id="edit-peran"
                    value={formData.peran}
                    onChange={(e) => setFormData({ ...formData, peran: e.target.value as "admin" | "pengunjung" })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="pengunjung">Pengunjung</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleEditAnggota}>
                    Simpan
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AnggotaAdmin;
