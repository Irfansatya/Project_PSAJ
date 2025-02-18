import { createSignal } from "solid-js";
import Login from "./Auth"; 
import Notifikasi from "./Notifikasi"; // Import Notifikasi

const Navbar = () => {
  const [showCariApa, setShowCariApa] = createSignal(false);
  const [isLoginOpen, setIsLoginOpen] = createSignal(false); // State untuk modal login
  const [isNotifOpen, setIsNotifOpen] = createSignal(false); // State untuk modal notifikasi

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
              class="font-medium flex items-center gap-1"
              onClick={() => setShowCariApa(!showCariApa())}
            >
              Cari Apa?
              <span class={`transition-transform duration-[500ms] text-[10px] ${showCariApa() ? 'rotate-[540deg]' : ''}`}>▼</span>
            </button>
            <div class={`absolute bg-white border rounded-md shadow-md mt-1 w-[130px] transition-all duration-300 ${showCariApa() ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <ul>
                <li class="px-4 py-2 transition-colors duration-300 hover:bg-[#FFE8E8] cursor-pointer" onClick={() => setShowCariApa(false)}>
                  <a href="/kamar-a" class="block w-full text-left">Tipe Kamar A</a>
                </li>
                <li class="px-4 py-2 transition-colors duration-300 hover:bg-[#FFE8E8] cursor-pointer" onClick={() => setShowCariApa(false)}>
                  <a href="/kamar-b" class="block w-full text-left">Tipe Kamar B</a>
                </li>
                <li class="px-4 py-2 transition-colors duration-300 hover:bg-[#FFE8E8] cursor-pointer" onClick={() => setShowCariApa(false)}>
                  <a href="/kamar-c" class="block w-full text-left">Tipe Kamar C</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Menu Utama (Tanpa Dropdown) */}
          <button class="font-medium transition-colors duration-300 hover:text-[#F80000]" onClick={() => setIsNotifOpen(true)}>
            Notifikasi
          </button>
          <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/Jagoan+Kos/@-7.4331518,109.245757,17z/data=!3m1!4b1!4m6!3m5!1s0x2e655fa0d36d2cb9:0x31db3864f56d0cb8!8m2!3d-7.4331571!4d109.2483319!16s%2Fg%2F11hzyn8phv?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D" class="font-medium transition-colors duration-300 hover:text-[#F80000]">Lokasi Kos</a>
          <a target="_blank" rel="noopener noreferrer" href="https://wa.me/6289620753988" class="font-medium transition-colors duration-300 hover:text-[#F80000]">Hubungi Kami</a>
          {/* Tombol Login */}
          <button 
            class="border-2 border-[#F80000] text-[#F80000] font-medium py-2 px-4 rounded-md transition-colors duration-300 hover:bg-[#f80000] hover:text-white hover:border-[#f80000]"
            onClick={() => setIsLoginOpen(true)}
          >
            Masuk
          </button>
        </div>
      </nav>

      {/* Modal Notifikasi */}
      <Notifikasi isOpen={isNotifOpen()} onClose={() => setIsNotifOpen(false)} />

      {/* Modal Login */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;
