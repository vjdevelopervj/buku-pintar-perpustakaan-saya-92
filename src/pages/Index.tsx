
import { useState } from "react";
import { Navigate } from "react-router-dom";
import HalamanMasuk from "./halaman/Masuk";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'pengunjung' | null>(null);

  // Jika sudah login, redirect ke dashboard sesuai role
  if (isAuthenticated && userRole) {
    return <Navigate to={userRole === 'admin' ? '/admin/beranda' : '/pengunjung/beranda'} replace />;
  }

  return <HalamanMasuk onLogin={setIsAuthenticated} onRoleChange={setUserRole} />;
};

export default Index;
