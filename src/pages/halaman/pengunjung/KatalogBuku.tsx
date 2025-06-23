
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
      penulis: "Andrea Hirata",
      sinopsis: "Kisah inspiratif tentang sepuluh anak dari keluarga miskin yang bersekolah di sebuah sekolah Muhammadiyah di Belitung...",
      jumlahBuku: 5,
      tersedia: 3,
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400"
    },
    {
      id: 2,
      judul: "Ayat-Ayat Cinta",
      penulis: "Habiburrahman El Shirazy",
      sinopsis: "Novel romantis yang menceritakan kisah cinta seorang mahasiswa Indonesia di Mesir...",
      jumlahBuku: 8,
      tersedia: 6,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400"
    },
    {
      id: 3,
      judul: "Negeri 5 Menara",
      penulis: "Ahmad Fuadi",
      sinopsis: "Petualangan enam sahabat di pesantren yang bermimpi menggapai bintang...",
      jumlahBuku: 4,
      tersedia: 2,
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    },
    {
      id: 4,
      judul: "Sang Pemimpi",
      penulis: "Andrea Hirata",
      sinopsis: "Kelanjutan dari Laskar Pelangi yang menceritakan perjuangan Ikal dan Arai...",
      jumlahBuku: 6,
      tersedia: 4,
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400"
    },
    {
      id: 5,
      judul: "Perahu Kertas",
      penulis: "Dee Lestari",
      sinopsis: "Kisah cinta Kugy dan Keenan yang diwarnai dengan impian dan rintangan...",
      jumlahBuku: 7,
      tersedia: 5,
      cover: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400"
    },
    {
      id: 6,
      judul: "Rectoverso",
      penulis: "Dee Lestari",
      sinopsis: "Kumpulan cerita pendek tentang cinta dalam berbagai perspektif...",
      jumlahBuku: 3,
      tersedia: 1,
      cover: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400"
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
              <Card key={buku.id} className="hover:shadow-lg transition-all duration-200 border-0 shadow-md overflow-hidden">
                <div className="aspect-[3/4] w-full relative">
                  <img 
                    src={buku.cover} 
                    alt={buku.judul}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback ke icon jika gambar gagal dimuat
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <Book className="h-16 w-16 text-white" />
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {buku.judul}
                  </CardTitle>
                  <p className="text-sm text-gray-600 font-medium">{buku.penulis}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={buku.tersedia > 0 ? "default" : "destructive"}>
                      {buku.tersedia > 0 ? "Tersedia" : "Tidak Tersedia"}
                    </Badge>
                    <Badge variant="outline">
                      {buku.tersedia}/{buku.jumlahBuku}
                    </Badge>
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
