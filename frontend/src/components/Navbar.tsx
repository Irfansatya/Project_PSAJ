import { createSignal, onMount } from "solid-js";
import Login from "./Auth"; 
import Notifikasi from "./Notifikasi"; // Import Notifikasi

const Navbar = () => {
  const [showCariApa, setShowCariApa] = createSignal(false);
  const [isLoginOpen, setIsLoginOpen] = createSignal(false); // State untuk modal login
  const [isNotifOpen, setIsNotifOpen] = createSignal(false); // State untuk modal notifikasi
  const [user, setUser] = createSignal(null);
  const [profileImage, setProfileImage] = createSignal(
    localStorage.getItem("profileImage") || "/default-profile.png"
  );
  const [showProfileDropdown, setShowProfileDropdown] = createSignal(false); // State untuk dropdown profil

  // Ambil data user dari localStorage saat komponen dimuat
  onMount(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  });

  // Function untuk menangani login sukses
  const handleLoginSuccess = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // Update state user
    setIsLoginOpen(false); // Tutup modal login
  };

  // Function untuk logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Hapus user dari localStorage
    localStorage.removeItem("profileImage"); // Hapus gambar profil jika ada
    setUser(null); // Reset state user
    setShowProfileDropdown(false); // Tutup dropdown
    location.reload(); // Refresh halaman
  };

  return (
    <>
      <nav class="flex items-center justify-between px-6 py-2 border border-gray-200 shadow-md bg-white fixed top-0 left-0 w-full z-50">
        {/* Logo */}
        <div class="flex items-center gap-2">
          <img src="src/assets/logoJK.png" alt="Logo" class="w-[65px] h-auto" />
          <span class="font-medium text-lg text-[#F80000]">jagoanKos</span>
        </div>

        {/* Menu dan Tombol Login */}
        <div class="flex items-center gap-10">
          {/* Cari Apa Dropdown */}
          <div class="relative">
            <button 
              class="font-medium transition-colors duration-300 hover:text-[#F80000] flex items-center gap-1"
              onClick={() => setShowCariApa(!showCariApa())}
            >
              Cari Apa?
              <span class={`transition-transform duration-500 text-[10px] ${showCariApa() ? 'rotate-180' : ''}`}>▼</span>
            </button>

            <div class={`absolute bg-white border rounded-md shadow-md mt-1 w-[160px] transition-all duration-300 ${showCariApa() ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <ul>
                <li class="flex items-center gap-2 px-4 py-2 transition-colors duration-300 hover:bg-[#FFE8E8] cursor-pointer" onClick={() => setShowCariApa(false)}>
                  <img src="src/assets/bed.png" alt="kasur" class="w-5 h-5" />
                  <a href="/kamar-a" class="w-full text-left">Tipe Kamar A</a>
                </li>
                <li class="flex items-center gap-2 px-4 py-2 transition-colors duration-300 hover:bg-[#FFE8E8] cursor-pointer" onClick={() => setShowCariApa(false)}>
                  <img src="src/assets/bed.png" alt="kasur" class="w-5 h-5" />
                  <a href="/kamar-b" class="w-full text-left">Tipe Kamar B</a>
                </li>
                <li class="flex items-center gap-2 px-4 py-2 transition-colors duration-300 hover:bg-[#FFE8E8] cursor-pointer" onClick={() => setShowCariApa(false)}>
                  <img src="src/assets/bed.png" alt="kasur" class="w-5 h-5" />
                  <a href="/kamar-c" class="w-full text-left">Tipe Kamar C</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Menu Utama */}
          <button class="font-medium transition-colors duration-300 hover:text-[#F80000]" onClick={() => setIsNotifOpen(true)}>
            Notifikasi
          </button>
          <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/Jagoan+Kos/" class="font-medium transition-colors duration-300 hover:text-[#F80000]">Lokasi Kos</a>
          <a target="_blank" rel="noopener noreferrer" href="https://wa.me/6289620753988" class="font-medium transition-colors duration-300 hover:text-[#F80000]">Hubungi Kami</a>
          
          {/* Ganti Tombol Login dengan Gambar Profil Jika Sudah Login */}
          {user() ? (
            <div class="relative">
              <button class="flex items-center gap-2 mr-10 transition-colors duration-300 hover:text-[#F80000]" onClick={() => setShowProfileDropdown(!showProfileDropdown())}>
                <img src={profileImage()} alt="Profile" class="w-10 h-10 rounded-full border border-gray-300 cursor-pointer" />
                <span class={`transition-transform duration-500 text-[10px] ${showProfileDropdown() ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {/* Dropdown Profil */}
              <div class={`absolute right-0 mt-2 w-[160px] bg-white border border-gray-200 rounded-md shadow-md transition-all duration-300 ${showProfileDropdown() ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"}`}>
                <ul class="text-sm">
                  <li class="flex items-center gap-2 px-4 py-2 transition-colors duration-300 hover:bg-[#FFE8E8] cursor-pointer" onClick={() => setShowProfileDropdown(false)}>
                    <img src="src/assets/setting-2.png" alt="Pengaturan" class="w-5 h-5" />
                    <a href="/profile" class="block w-full">Pengaturan</a>
                  </li>
                  <li class="flex items-center gap-2 px-4 py-2 transition-colors duration-300 hover:bg-[#FFE8E8] cursor-pointer" onClick={handleLogout}>
                    <img src="src/assets/logout.png" alt="Keluar" class="w-5 h-5" />
                    <span>Keluar</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <button 
              class="border-2 border-[#F80000] text-[#F80000] font-medium py-2 px-4 rounded-md transition-colors duration-300 hover:bg-[#f80000] hover:text-white hover:border-[#f80000]"
              onClick={() => setIsLoginOpen(true)}
            >
              Masuk
            </button>
          )}
        </div>
      </nav>

      {/* Modal Notifikasi */}
      <Notifikasi isOpen={isNotifOpen()} onClose={() => setIsNotifOpen(false)} />

      {/* Modal Login */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
    </>
  );
};

export default Navbar;
