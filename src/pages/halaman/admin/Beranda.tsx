import NavbarUtama from "@/components/layout/NavbarUtama";
import SidebarAdmin from "@/components/layout/SidebarAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PolarAngleAxis, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { 
  Users, 
  Book, 
  BookOpen, 
  RotateCcw, 
  AlertCircle, 
  DollarSign,
  Plus,
  Search,
  Filter,
  Trophy,
  TrendingUp
} from "lucide-react";

const BerandaAdmin = () => {
  const statistikData = [
    { title: "Total Anggota", value: "1,234", icon: Users, color: "blue" },
    { title: "Buku Tersedia", value: "5,678", icon: Book, color: "green" },
    { title: "Peminjaman Aktif", value: "432", icon: BookOpen, color: "yellow" },
    { title: "Total Pengembalian", value: "8,901", icon: RotateCcw, color: "purple" },
    { title: "Buku Terlambat", value: "23", icon: AlertCircle, color: "red" },
    { title: "Total Denda", value: "Rp 2,450,000", icon: DollarSign, color: "orange" },
  ];

  const pembacaTeraktif = [
    { rank: 1, nama: "Ahmad Farid", buku: 45, foto: "" },
    { rank: 2, nama: "Siti Nurhaliza", buku: 38, foto: "" },
    { rank: 3, nama: "Budi Santoso", buku: 32, foto: "" },
    { rank: 4, nama: "Dewi Lestari", buku: 28, foto: "" },
    { rank: 5, nama: "Eko Prasetyo", buku: 25, foto: "" },
  ];

  const bukuTerpopuler = [
    { rank: 1, judul: "Laskar Pelangi", peminjam: 156, cover: "", fill: "#3b82f6" },
    { rank: 2, judul: "Ayat-Ayat Cinta", peminjam: 142, cover: "", fill: "#10b981" },
    { rank: 3, judul: "Negeri 5 Menara", peminjam: 128, cover: "", fill: "#f59e0b" },
    { rank: 4, judul: "Sang Pemimpi", peminjam: 115, cover: "", fill: "#ef4444" },
    { rank: 5, judul: "Perahu Kertas", peminjam: 98, cover: "", fill: "#8b5cf6" },
  ];

  // Data untuk chart
  const pembacaChartData = pembacaTeraktif.map(p => ({
    nama: p.nama.split(" ")[0], // Hanya nama depan untuk chart
    buku: p.buku
  }));

  const bukuPolarChartData = bukuTerpopuler.map((buku, index) => ({
    judul: buku.judul.length > 10 ? buku.judul.substring(0, 10) + "..." : buku.judul,
    peminjam: buku.peminjam,
    fill: buku.fill
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
      red: "bg-red-500 text-red-50",
      orange: "bg-orange-500 text-orange-50",
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

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarUtama namaLengkap="Admin Perpustakaan" />
      <SidebarAdmin />
      
      <div className="lg:pl-64">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
            <p className="mt-2 text-gray-600">Selamat datang di sistem manajemen perpustakaan</p>
          </div>

          {/* Statistik Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

          {/* Tindakan Cepat */}
          <Card className="mb-8 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                Tindakan Cepat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button className="h-12 bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Anggota
                </Button>
                <Button className="h-12 bg-green-600 hover:bg-green-700">
                  <Book className="mr-2 h-4 w-4" />
                  Tambah Buku
                </Button>
                <Button className="h-12 bg-yellow-600 hover:bg-yellow-700">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Catat Peminjaman
                </Button>
                <Button className="h-12 bg-purple-600 hover:bg-purple-700">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Proses Pengembalian
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

            {/* Chart Buku Terpopuler - Polar Area Chart */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Statistik Buku Terpopuler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <RadialBarChart data={bukuPolarChartData} innerRadius="30%" outerRadius="90%">
                    <PolarGrid />
                    <PolarAngleAxis dataKey="judul" />
                    <PolarRadiusAxis angle={30} domain={[0, 200]} />
                    <RadialBar 
                      dataKey="peminjam" 
                      cornerRadius={4} 
                      fill="#10b981"
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </RadialBarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Peringkat Pembaca Teraktif */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  Pembaca Teraktif
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pembacaTeraktif.map((pembaca) => (
                    <div key={pembaca.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-bold">
                          {getRankIcon(pembaca.rank)}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={pembaca.foto} />
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {pembaca.nama.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{pembaca.nama}</p>
                          <p className="text-sm text-gray-500">{pembaca.buku} buku dipinjam</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{pembaca.buku}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Peringkat Buku Terpopuler */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-green-600" />
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
                        <div className="w-10 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center">
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

export default BerandaAdmin;
