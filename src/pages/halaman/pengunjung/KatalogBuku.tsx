
import NavbarUtama from "@/components/layout/NavbarUtama";
import SidebarPengunjung from "@/components/layout/SidebarPengunjung";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Book, Search, Filter, BookOpen } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const KatalogBuku = () => {
  const daftarBuku = [
    {
      id: 1,
      judul: "Laskar Pelangi",
      sinopsis: "Kisah inspiratif tentang sepuluh anak dari keluarga miskin yang bersekolah di sebuah sekolah Muhammadiyah di Belitung...",
      jumlahBuku: 5,
      tersedia: 3,
      cover: ""
    },
    {
      id: 2,
      judul: "Ayat-Ayat Cinta",
      sinopsis: "Novel romantis yang menceritakan kisah cinta seorang mahasiswa Indonesia di Mesir...",
      jumlahBuku: 8,
      tersedia: 6,
      cover: ""
    },
    {
      id: 3,
      judul: "Negeri 5 Menara",
      sinopsis: "Petualangan enam sahabat di pesantren yang bermimpi menggapai bintang...",
      jumlahBuku: 4,
      tersedia: 2,
      cover: ""
    },
    {
      id: 4,
      judul: "Sang Pemimpi",
      sinopsis: "Kelanjutan dari Laskar Pelangi yang menceritakan perjuangan Ikal dan Arai...",
      jumlahBuku: 6,
      tersedia: 4,
      cover: ""
    },
    {
      id: 5,
      judul: "Perahu Kertas",
      sinopsis: "Kisah cinta Kugy dan Keenan yang diwarnai dengan impian dan rintangan...",
      jumlahBuku: 7,
      tersedia: 5,
      cover: ""
    },
    {
      id: 6,
      judul: "Rectoverso",
      sinopsis: "Kumpulan cerita pendek tentang cinta dalam berbagai perspektif...",
      jumlahBuku: 3,
      tersedia: 1,
      cover: ""
    }
  ];

  const handlePinjam = (judul: string) => {
    toast({
      title: "Permintaan Peminjaman",
      description: `Permintaan peminjaman buku "${judul}" telah diajukan`,
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
            <h1 className="text-3xl font-bold text-gray-900">Katalog Buku</h1>
            <p className="mt-2 text-gray-600">Temukan dan pinjam buku favorit Anda</p>
          </div>

          {/* Search and Filter */}
          <Card className="mb-8 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Cari judul buku, penulis, atau kategori..." 
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="md:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Katalog Buku Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {daftarBuku.map((buku) => (
              <Card key={buku.id} className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Book className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {buku.judul}
                      </CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge variant={buku.tersedia > 0 ? "default" : "destructive"}>
                          {buku.tersedia > 0 ? "Tersedia" : "Tidak Tersedia"}
                        </Badge>
                        <Badge variant="outline">
                          {buku.tersedia}/{buku.jumlahBuku}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {buku.sinopsis}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Stok: </span>
                      {buku.tersedia} dari {buku.jumlahBuku} buku
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handlePinjam(buku.judul)}
                      disabled={buku.tersedia === 0}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Pinjam
                    </Button>
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

export default KatalogBuku;
