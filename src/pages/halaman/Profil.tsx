
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUtama from "@/components/layout/NavbarUtama";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, ArrowLeft, Upload, Link } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Profil = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    nama_lengkap: "Ahmad Farid",
    email: "ahmad.farid@email.com",
    kata_sandi_lama: "",
    kata_sandi_baru: "",
    konfirmasi_kata_sandi: ""
  });
  const [profileImage, setProfileImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = () => {
    // Validasi kata sandi
    if (profileData.kata_sandi_baru && profileData.kata_sandi_baru !== profileData.konfirmasi_kata_sandi) {
      toast({
        title: "Error",
        description: "Konfirmasi kata sandi tidak cocok",
        variant: "destructive"
      });
      return;
    }

    // Simulasi penyimpanan data
    toast({
      title: "Berhasil",
      description: "Profil berhasil diperbarui",
    });

    // Reset password fields
    setProfileData(prev => ({
      ...prev,
      kata_sandi_lama: "",
      kata_sandi_baru: "",
      konfirmasi_kata_sandi: ""
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
        setIsModalOpen(false);
        toast({
          title: "Berhasil",
          description: "Foto profil berhasil diubah",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlUpload = () => {
    if (imageUrl) {
      setProfileImage(imageUrl);
      setImageUrl("");
      setIsModalOpen(false);
      toast({
        title: "Berhasil",
        description: "Foto profil berhasil diubah",
      });
    }
  };

  const handleBackToDashboard = () => {
    // Asumsikan ini adalah pengunjung, bisa disesuaikan dengan role pengguna
    navigate('/pengunjung/beranda');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarUtama namaLengkap="Ahmad Farid" />
      
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profil Pengguna</h1>
            <p className="mt-2 text-gray-600">Kelola informasi akun Anda</p>
          </div>
          <Button onClick={handleBackToDashboard} variant="outline" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Foto Profil */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Foto Profil</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32 border-4 border-blue-200">
                <AvatarImage src={profileImage} />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-2xl font-bold">
                  AF
                </AvatarFallback>
              </Avatar>
              
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Camera className="mr-2 h-4 w-4" />
                    Ubah Foto
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Ubah Foto Profil</DialogTitle>
                  </DialogHeader>
                  <Tabs defaultValue="upload" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="upload">Upload File</TabsTrigger>
                      <TabsTrigger value="url">Gunakan Link</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload" className="space-y-4">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-full">
                          <Label htmlFor="photo-upload" className="block text-sm font-medium mb-2">
                            Pilih foto dari device
                          </Label>
                          <Input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="url" className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="image-url" className="block text-sm font-medium mb-2">
                            URL Gambar
                          </Label>
                          <Input
                            id="image-url"
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                          />
                        </div>
                        <Button onClick={handleUrlUpload} className="w-full">
                          <Link className="mr-2 h-4 w-4" />
                          Gunakan URL
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Informasi Profil */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Informasi Profil</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nama_lengkap">Nama Lengkap</Label>
                      <Input 
                        id="nama_lengkap" 
                        value={profileData.nama_lengkap}
                        onChange={(e) => handleInputChange('nama_lengkap', e.target.value)}
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
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
                          value={profileData.kata_sandi_lama}
                          onChange={(e) => handleInputChange('kata_sandi_lama', e.target.value)}
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="kata_sandi_baru">Kata Sandi Baru</Label>
                          <Input 
                            id="kata_sandi_baru" 
                            type="password"
                            value={profileData.kata_sandi_baru}
                            onChange={(e) => handleInputChange('kata_sandi_baru', e.target.value)}
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="konfirmasi_kata_sandi">Konfirmasi Kata Sandi</Label>
                          <Input 
                            id="konfirmasi_kata_sandi" 
                            type="password"
                            value={profileData.konfirmasi_kata_sandi}
                            onChange={(e) => handleInputChange('konfirmasi_kata_sandi', e.target.value)}
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6">
                    <Button variant="outline" onClick={() => navigate('/pengunjung/beranda')}>
                      Batal
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveChanges}>
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
