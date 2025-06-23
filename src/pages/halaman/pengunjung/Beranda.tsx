
import NavbarUtama from "@/components/layout/NavbarUtama";
import SidebarPengunjung from "@/components/layout/SidebarPengunjung";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { 
  BookOpen, 
  Book, 
  RotateCcw, 
  Clock,
  Trophy,
  Search,
  TrendingUp
} from "lucide-react";

const BerandaPengunjung = () => {
  const statistikData = [
    { title: "Total Peminjaman", value: "45", icon: BookOpen, color: "blue" },
    { title: "Sedang Dipinjam", value: "3", icon: Clock, color: "yellow" },
    { title: "Telah Dikembalikan", value: "42", icon: RotateCcw, color: "green" },
    { title: "Buku Tersedia", value: "5,678", icon: Book, color: "purple" },
  ];

  const bukuSedangDipinjam = [
    { judul: "Laskar Pelangi", tanggalKembali: "2024-06-25", status: "Normal" },
    { judul: "Ayat-Ayat Cinta", tanggalKembali: "2024-06-28", status: "Normal" },
    { judul: "Negeri 5 Menara", tanggalKembali: "2024-06-20", status: "Terlambat" },
  ];

  const bukuTerpopuler = [
    { rank: 1, judul: "Laskar Pelangi", peminjam: 156 },
    { rank: 2, judul: "Ayat-Ayat Cinta", peminjam: 142 },
    { rank: 3, judul: "Negeri 5 Menara", peminjam: 128 },
    { rank: 4, judul: "Sang Pemimpi", peminjam: 115 },
    { rank: 5, judul: "Perahu Kertas", peminjam: 98 },
  ];

  // Data untuk chart - Pembaca Teraktif (Top 5)
  const pembacaTeraktif = [
    { nama: "Ahmad Farid", buku: 45 },
    { nama: "Siti Nurhaliza", buku: 38 },
    { nama: "Budi Santoso", buku: 32 },
    { nama: "Dewi Lestari", buku: 28 },
    { nama: "Eko Prasetyo", buku: 25 },
  ];

  // Data untuk chart
  const pembacaChartData = pembacaTeraktif.map(p => ({
    nama: p.nama.split(" ")[0], // Hanya nama depan untuk chart
    buku: p.buku
  }));

  const bukuChartData = bukuTerpopuler.map(b => ({
    judul: b.judul.length > 15 ? b.judul.substring(0, 15) + "..." : b.judul,
    peminjam: b.peminjam
  }));

  const chartConfig = {
    buku: {
      label: "Jumlah Buku",
      color: "#3b82f6",
    },
    peminjam: {
      label: "Jumlah Peminjam",
      color: "#10b981",
    },
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500 text-blue-50",
      green: "bg-green-500 text-green-50",
      yellow: "bg-yellow-500 text-yellow-50",
      purple: "bg-purple-500 text-purple-50",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getRankIcon = (rank: number) => {
    const icons = {
      1: "🥇",
      2: "🥈", 
      3: "🥉"
    };
    return icons[rank as keyof typeof icons] || `${rank}`;
  };

  const getStatusColor = (status: string) => {
    return status === "Terlambat" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarUtama namaLengkap="Ahmad Farid" />
      <SidebarPengunjung />
      
      <div className="lg:pl-64">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Pengunjung</h1>
            <p className="mt-2 text-gray-600">Selamat datang kembali, Ahmad Farid!</p>
          </div>

          {/* Statistik Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statistikData.map((stat, index) => (
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

          {/* Aksi Cepat */}
          <Card className="mb-8 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-600" />
                Aksi Cepat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-12 bg-blue-600 hover:bg-blue-700">
                  <Book className="mr-2 h-4 w-4" />
                  Jelajahi Katalog
                </Button>
                <Button className="h-12 bg-green-600 hover:bg-green-700">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Lihat Peminjaman
                </Button>
                <Button className="h-12 bg-purple-600 hover:bg-purple-700">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Kembalikan Buku
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Chart Statistik */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Chart Pembaca Teraktif */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Statistik Pembaca Teraktif
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <BarChart data={pembacaChartData}>
                    <XAxis 
                      dataKey="nama" 
                      tickLine={false}
                      axisLine={false}
                      className="text-xs"
                    />
                    <YAxis 
                      tickLine={false}
                      axisLine={false}
                      className="text-xs"
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                    />
                    <Bar 
                      dataKey="buku" 
                      fill="var(--color-buku)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Chart Buku Terpopuler */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Statistik Buku Terpopuler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <BarChart data={bukuChartData}>
                    <XAxis 
                      dataKey="judul" 
                      tickLine={false}
                      axisLine={false}
                      className="text-xs"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      tickLine={false}
                      axisLine={false}
                      className="text-xs"
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
                    />
                    <Bar 
                      dataKey="peminjam" 
                      fill="var(--color-peminjam)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Buku Sedang Dipinjam */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  Buku Sedang Dipinjam
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bukuSedangDipinjam.map((buku, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center">
                          <Book className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{buku.judul}</p>
                          <p className="text-sm text-gray-500">Kembali: {buku.tanggalKembali}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(buku.status)}>
                        {buku.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Buku Terpopuler */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  Buku Terpopuler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bukuTerpopuler.map((buku) => (
                    <div key={buku.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-bold">
                          {getRankIcon(buku.rank)}
                        </div>
                        <div className="w-10 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded flex items-center justify-center">
                          <Book className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{buku.judul}</p>
                          <p className="text-sm text-gray-500">{buku.peminjam} kali dipinjam</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{buku.peminjam}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BerandaPengunjung;
