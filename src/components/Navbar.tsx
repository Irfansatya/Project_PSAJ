import { createSignal } from "solid-js";
import Login from "./Auth"; 

const Navbar = () => {
  const [showCariApa, setShowCariApa] = createSignal(false);
  const [showLainya, setShowLainya] = createSignal(false);
  const [isLoginOpen, setIsLoginOpen] = createSignal(false); // State untuk modal login

  return (
    <>
      <nav class="flex items-center justify-between px-6 py-2 border-2 border-black rounded-b-lg shadow-md bg-white fixed top-0 left-0 w-full z-50">
        {/* Logo */}
        <div class="flex items-center gap-2">
          <img src="src/assets/logoJK.png" alt="Logo" class="w-[65px] h-auto" />
          <span class="font-semibold text-lg">JagoanKos</span>
        </div>

        {/* Dropdown Menu dan Tombol Login */}
        <div class="flex items-center gap-6">
          {/* CariApa Dropdown */}
          <div class="relative">
            <button 
              class="font-medium flex items-center gap-1 mr-8"
              onClick={() => setShowCariApa(!showCariApa())}
            >
              CariApa? 
              <span class={`transition-transform duration-[500ms] text-[10px] ${showCariApa() ? 'rotate-[540deg] text-[FFE8E8]' : ''}`}>▼</span>
            </button>
            <div class={`absolute bg-white border rounded-md shadow-md mt-1 w-[130px] transition-all duration-300 ${showCariApa() ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <ul>
                <li class="px-4 py-2 hover:bg-[#FFE8E8] cursor-pointer" onClick={() => setShowCariApa(false)}>
                  <a href="/kamar-a" class="block w-full text-left">Tipe Kamar A</a>
                </li>
                <li class="px-4 py-2 hover:bg-[#FFE8E8] cursor-pointer" onClick={() => setShowCariApa(false)}>
                  <a href="/kamar-b" class="block w-full text-left">Tipe Kamar B</a>
                </li>
                <li class="px-4 py-2 hover:bg-[#FFE8E8] cursor-pointer" onClick={() => setShowCariApa(false)}>
                  <a href="/kamar-c" class="block w-full text-left">Tipe Kamar C</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Lainya Dropdown */}
          <div class="relative">
            <button 
              class="font-medium flex items-center gap-1 mr-8"
              onClick={() => setShowLainya(!showLainya())}
            >
              Lainnya 
              <span class={`transition-transform duration-[500ms] text-[10px] ${showLainya() ? 'rotate-[540deg] text-[FFE8E8]' : ''}`}>▼</span>
            </button>
            <div class={`absolute bg-white border rounded-md shadow-md mt-1 w-[130px] transition-all duration-300 ${showLainya() ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <ul>
                <li class="px-4 py-2 hover:bg-[#FFE8E8] cursor-pointer" onClick={() => setShowLainya(false)}>
                  <a href="/profile" class="block w-full text-left">Profile</a>
                </li>
                <li class="px-4 py-2 hover:bg-[#FFE8E8] cursor-pointer" onClick={() => setShowLainya(false)}>
                  <a href="/notifikasi" class="block w-full text-left">Notifikasi</a>
                </li>
                <li class="px-4 py-2 hover:bg-[#FFE8E8] cursor-pointer" onClick={() => setShowLainya(false)}>
                  <a href="https://wa.me/6289620753988" class="block w-full text-left">Chat</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Tombol Login - Trigger Modal */}
          <button 
            class="border-2 border-[#F80000] text-[#F80000] font-medium py-2 px-4 rounded-md transition-colors duration-300 hover:bg-[#f80000] hover:text-white hover:border-[#f80000]"
            onClick={() => setIsLoginOpen(true)}
          >
            Masuk
          </button>
        </div>
      </nav>

      {/* Panggil Modal Login */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;
