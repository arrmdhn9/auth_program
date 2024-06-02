exports.getSuperAdminData = async () => {
  // Logika untuk mengambil data Super Admin
  return { secret: "Data rahasia Super Admin" };
};

exports.getAdminData = async () => {
  // Logika untuk mengambil data Admin
  return { info: "Informasi penting untuk Admin" };
};

exports.getUserData = async () => {
  // Logika untuk mengambil data User
  return { message: "Selamat datang User" };
};
