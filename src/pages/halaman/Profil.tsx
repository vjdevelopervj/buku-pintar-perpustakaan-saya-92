
import NavbarUtama from "@/components/layout/NavbarUtama";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

const Profil = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarUtama namaLengkap="Ahmad Farid" />
      
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profil Pengguna</h1>
          <p className="mt-2 text-gray-600">Kelola informasi akun Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Foto Profil */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Foto Profil</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32 border-4 border-blue-200">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-2xl font-bold">
                  AF
                </AvatarFallback>
              </Avatar>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Camera className="mr-2 h-4 w-4" />
                Ubah Foto
              </Button>
            </CardContent>
          </Card>

          {/* Informasi Profil */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Informasi Profil</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nama_lengkap">Nama Lengkap</Label>
                      <Input 
                        id="nama_lengkap" 
                        defaultValue="Ahmad Farid"
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        defaultValue="ahmad.farid@email.com"
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="peran">Peran</Label>
                      <Input 
                        id="peran" 
                        defaultValue="Pengunjung" 
                        disabled
                        className="bg-gray-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tanggal_daftar">Tanggal Daftar</Label>
                      <Input 
                        id="tanggal_daftar" 
                        defaultValue="15 Januari 2024" 
                        disabled
                        className="bg-gray-100"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Ubah Kata Sandi</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="kata_sandi_lama">Kata Sandi Lama</Label>
                        <Input 
                          id="kata_sandi_lama" 
                          type="password"
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="kata_sandi_baru">Kata Sandi Baru</Label>
                          <Input 
                            id="kata_sandi_baru" 
                            type="password"
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="konfirmasi_kata_sandi">Konfirmasi Kata Sandi</Label>
                          <Input 
                            id="konfirmasi_kata_sandi" 
                            type="password"
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6">
                    <Button variant="outline">
                      Batal
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Simpan Perubahan
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
