
import { useState } from "react";
import NavbarUtama from "@/components/layout/NavbarUtama";
import SidebarAdmin from "@/components/layout/SidebarAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Search, Book, BookOpen, Eye, Upload, Image } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Buku {
  id: number;
  judul: string;
  penulis: string;
  isbn: string;
  kategori: string;
  deskripsi: string;
  cover?: string;
  jumlah_total: number;
  jumlah_tersedia: number;
  tahun_terbit: number;
  status: "tersedia" | "habis";
}

const DaftarBukuAdmin = () => {
  const [bukuList, setBukuList] = useState<Buku[]>([
    {
      id: 1,
      judul: "Laskar Pelangi",
      penulis: "Andrea Hirata",
      isbn: "978-602-291-001-1",
      kategori: "Fiksi",
      deskripsi: "Novel tentang perjuangan anak-anak di Belitung untuk mendapatkan pendidikan",
      jumlah_total: 10,
      jumlah_tersedia: 7,
      tahun_terbit: 2005,
      status: "tersedia"
    },
    {
      id: 2,
      judul: "Bumi Manusia",
      penulis: "Pramoedya Ananta Toer",
      isbn: "978-602-291-002-2",
      kategori: "Sejarah",
      deskripsi: "Novel sejarah tentang pergerakan nasional Indonesia",
      jumlah_total: 5,
      jumlah_tersedia: 0,
      tahun_terbit: 1980,
      status: "habis"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedBuku, setSelectedBuku] = useState<Buku | null>(null);
  const [formData, setFormData] = useState({
    judul: "",
    penulis: "",
    isbn: "",
    kategori: "",
    deskripsi: "",
    cover: "",
    jumlah_total: 0,
    tahun_terbit: new Date().getFullYear()
  });
  const [coverFile, setCoverFile] = useState<string>("");
  const [coverUrl, setCoverUrl] = useState("");

  const filteredBuku = bukuList.filter(buku =>
    buku.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buku.penulis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buku.kategori.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBuku = bukuList.length;
  const bukuTersedia = bukuList.filter(b => b.status === "tersedia").length;
  const bukuHabis = bukuList.filter(b => b.status === "habis").length;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCoverFile(result);
        setFormData({ ...formData, cover: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlUpload = () => {
    if (coverUrl) {
      setCoverFile(coverUrl);
      setFormData({ ...formData, cover: coverUrl });
      setCoverUrl("");
    }
  };

  const handleAddBuku = () => {
    const status: "tersedia" | "habis" = formData.jumlah_total > 0 ? "tersedia" : "habis";
    
    const newBuku: Buku = {
      id: Date.now(),
      ...formData,
      jumlah_tersedia: formData.jumlah_total,
      status
    };

    setBukuList([...bukuList, newBuku]);
    setFormData({
      judul: "",
      penulis: "",
      isbn: "",
      kategori: "",
      deskripsi: "",
      cover: "",
      jumlah_total: 0,
      tahun_terbit: new Date().getFullYear()
    });
    setCoverFile("");
    setIsAddModalOpen(false);
    toast({
      title: "Berhasil",
      description: "Buku baru berhasil ditambahkan",
    });
  };

  const handleEditBuku = () => {
    if (selectedBuku) {
      const status: "tersedia" | "habis" = formData.jumlah_total > 0 ? "tersedia" : "habis";
      
      const updatedList = bukuList.map(buku =>
        buku.id === selectedBuku.id
          ? { ...buku, ...formData, status }
          : buku
      );
      setBukuList(updatedList);
      setIsEditModalOpen(false);
      setSelectedBuku(null);
      setCoverFile("");
      toast({
        title: "Berhasil",
        description: "Data buku berhasil diperbarui",
      });
    }
  };

  const handleDeleteBuku = (id: number) => {
    setBukuList(bukuList.filter(buku => buku.id !== id));
    toast({
      title: "Berhasil",
      description: "Buku berhasil dihapus",
    });
  };

  const openEditModal = (buku: Buku) => {
    setSelectedBuku(buku);
    setFormData({
      judul: buku.judul,
      penulis: buku.penulis,
      isbn: buku.isbn,
      kategori: buku.kategori,
      deskripsi: buku.deskripsi,
      cover: buku.cover || "",
      jumlah_total: buku.jumlah_total,
      tahun_terbit: buku.tahun_terbit
    });
    setCoverFile(buku.cover || "");
    setIsEditModalOpen(true);
  };

  const openDetailModal = (buku: Buku) => {
    setSelectedBuku(buku);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarUtama namaLengkap="Admin Perpustakaan" />
      <SidebarAdmin />
      
      <div className="lg:pl-64">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Daftar Buku</h1>
            <p className="mt-2 text-gray-600">Kelola koleksi buku perpustakaan</p>
          </div>

          {/* Statistik Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Buku</CardTitle>
                <Book className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalBuku}</div>
                <p className="text-xs text-muted-foreground">
                  Semua buku di perpustakaan
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Buku Tersedia</CardTitle>
                <BookOpen className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{bukuTersedia}</div>
                <p className="text-xs text-muted-foreground">
                  Buku yang bisa dipinjam
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Buku Habis</CardTitle>
                <Book className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{bukuHabis}</div>
                <p className="text-xs text-muted-foreground">
                  Buku yang tidak tersedia
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Actions and Search */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari buku..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Buku
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Tambah Buku Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="judul">Judul Buku</Label>
                      <Input
                        id="judul"
                        value={formData.judul}
                        onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="penulis">Penulis</Label>
                      <Input
                        id="penulis"
                        value={formData.penulis}
                        onChange={(e) => setFormData({ ...formData, penulis: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="isbn">ISBN</Label>
                      <Input
                        id="isbn"
                        value={formData.isbn}
                        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="kategori">Kategori</Label>
                      <Input
                        id="kategori"
                        value={formData.kategori}
                        onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="jumlah">Jumlah Total</Label>
                      <Input
                        id="jumlah"
                        type="number"
                        value={formData.jumlah_total}
                        onChange={(e) => setFormData({ ...formData, jumlah_total: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tahun">Tahun Terbit</Label>
                      <Input
                        id="tahun"
                        type="number"
                        value={formData.tahun_terbit}
                        onChange={(e) => setFormData({ ...formData, tahun_terbit: parseInt(e.target.value) || new Date().getFullYear() })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="deskripsi">Deskripsi/Sinopsis</Label>
                    <Textarea
                      id="deskripsi"
                      value={formData.deskripsi}
                      onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Cover Buku</Label>
                    <Tabs defaultValue="upload" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upload">Upload File</TabsTrigger>
                        <TabsTrigger value="url">Gunakan Link</TabsTrigger>
                      </TabsList>
                      <TabsContent value="upload" className="space-y-4">
                        <div className="flex flex-col space-y-4">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="cursor-pointer"
                          />
                          {coverFile && (
                            <div className="flex justify-center">
                              <img src={coverFile} alt="Preview" className="h-32 w-24 object-cover rounded border" />
                            </div>
                          )}
                        </div>
                      </TabsContent>
                      <TabsContent value="url" className="space-y-4">
                        <div className="space-y-4">
                          <Input
                            type="url"
                            placeholder="https://example.com/cover.jpg"
                            value={coverUrl}
                            onChange={(e) => setCoverUrl(e.target.value)}
                          />
                          <Button onClick={handleUrlUpload} className="w-full">
                            <Image className="mr-2 h-4 w-4" />
                            Gunakan URL
                          </Button>
                          {coverFile && (
                            <div className="flex justify-center">
                              <img src={coverFile} alt="Preview" className="h-32 w-24 object-cover rounded border" />
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                      Batal
                    </Button>
                    <Button onClick={handleAddBuku}>
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
                    <TableHead>Cover</TableHead>
                    <TableHead>Judul</TableHead>
                    <TableHead>Penulis</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBuku.map((buku) => (
                    <TableRow key={buku.id}>
                      <TableCell>
                        <div className="h-16 w-12 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                          {buku.cover ? (
                            <img src={buku.cover} alt={buku.judul} className="h-full w-full object-cover" />
                          ) : (
                            <Book className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{buku.judul}</TableCell>
                      <TableCell>{buku.penulis}</TableCell>
                      <TableCell>{buku.kategori}</TableCell>
                      <TableCell>{buku.jumlah_tersedia}/{buku.jumlah_total}</TableCell>
                      <TableCell>
                        <Badge variant={buku.status === "tersedia" ? "default" : "destructive"}>
                          {buku.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDetailModal(buku)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(buku)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteBuku(buku.id)}
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

          {/* Detail Modal */}
          <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Detail Buku</DialogTitle>
              </DialogHeader>
              {selectedBuku && (
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="h-32 w-24 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                      {selectedBuku.cover ? (
                        <img src={selectedBuku.cover} alt={selectedBuku.judul} className="h-full w-full object-cover" />
                      ) : (
                        <Book className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{selectedBuku.judul}</h3>
                      <p className="text-gray-600">oleh {selectedBuku.penulis}</p>
                      <p className="text-sm text-gray-500 mt-2">ISBN: {selectedBuku.isbn}</p>
                      <p className="text-sm text-gray-500">Kategori: {selectedBuku.kategori}</p>
                      <p className="text-sm text-gray-500">Tahun: {selectedBuku.tahun_terbit}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Deskripsi:</h4>
                    <p className="text-gray-700 text-sm">{selectedBuku.deskripsi}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Ketersediaan:</h4>
                    <p className="text-sm">
                      {selectedBuku.jumlah_tersedia} dari {selectedBuku.jumlah_total} buku tersedia
                    </p>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Edit Modal - similar structure to Add Modal */}
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Buku</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="judul">Judul Buku</Label>
                    <Input
                      id="judul"
                      value={formData.judul}
                      onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="penulis">Penulis</Label>
                    <Input
                      id="penulis"
                      value={formData.penulis}
                      onChange={(e) => setFormData({ ...formData, penulis: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      value={formData.isbn}
                      onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="kategori">Kategori</Label>
                    <Input
                      id="kategori"
                      value={formData.kategori}
                      onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jumlah">Jumlah Total</Label>
                    <Input
                      id="jumlah"
                      type="number"
                      value={formData.jumlah_total}
                      onChange={(e) => setFormData({ ...formData, jumlah_total: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tahun">Tahun Terbit</Label>
                    <Input
                      id="tahun"
                      type="number"
                      value={formData.tahun_terbit}
                      onChange={(e) => setFormData({ ...formData, tahun_terbit: parseInt(e.target.value) || new Date().getFullYear() })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="deskripsi">Deskripsi/Sinopsis</Label>
                  <Textarea
                    id="deskripsi"
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Cover Buku</Label>
                  <Tabs defaultValue="upload" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="upload">Upload File</TabsTrigger>
                      <TabsTrigger value="url">Gunakan Link</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload" className="space-y-4">
                      <div className="flex flex-col space-y-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="cursor-pointer"
                        />
                        {coverFile && (
                          <div className="flex justify-center">
                            <img src={coverFile} alt="Preview" className="h-32 w-24 object-cover rounded border" />
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="url" className="space-y-4">
                      <div className="space-y-4">
                        <Input
                          type="url"
                          placeholder="https://example.com/cover.jpg"
                          value={coverUrl}
                          onChange={(e) => setCoverUrl(e.target.value)}
                        />
                        <Button onClick={handleUrlUpload} className="w-full">
                          <Image className="mr-2 h-4 w-4" />
                          Gunakan URL
                        </Button>
                        {coverFile && (
                          <div className="flex justify-center">
                            <img src={coverFile} alt="Preview" className="h-32 w-24 object-cover rounded border" />
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleEditBuku}>
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

export default DaftarBukuAdmin;
