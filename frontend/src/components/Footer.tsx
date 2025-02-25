import { createSignal } from "solid-js";

const Footer = () => {
  const [copied, setCopied] = createSignal(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("081329876001");
    setCopied(true);

    // Reset status setelah 2 detik
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div class="relative">
      {/* Konten utama */}
      <main class="pb-24"> 
        {/* Tambahkan padding-bottom agar konten tidak tertutup footer */}
      </main>

      {/* Footer Sticky */}
      <footer class="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md text-gray-500 text-xs px-6 py-3">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          
          {/* Bagian Kiri: Logo */}
          <span class="text-xl font-bold text-black">jagoanKos.</span>

          {/* Bagian Tengah: Menu */}
          <ul class="flex gap-16 text-sm font-medium text-black">
            <li><a href="#" class="hover:text-[#F80000] transition-colors duration-300">Tentang Kami</a></li>
            <li><a href="#" class="hover:text-[#F80000] transition-colors duration-300">Pusat Bantuan</a></li>
            <li><a href="#" class="hover:text-[#F80000] transition-colors duration-300">Syarat & Ketentuan</a></li>
            <li><a href="#" class="hover:text-[#F80000] transition-colors duration-300">Kebijakan Privasi</a></li>
            <li><a href="#" class="hover:text-[#F80000] transition-colors duration-300">Blog jagoanKos</a></li>
          </ul>

          {/* Bagian Kanan: Ikon Sosial Media */}
          <div class="flex gap-4">
            <img src="src/assets/email.png" alt="Email" class="w-8 h-auto cursor-pointer" />
            <img src="src/assets/facebook.png" alt="Facebook" class="w-8 h-auto cursor-pointer" />
            <img src="src/assets/instagram.png" alt="Instagram" class="w-8 h-auto cursor-pointer" />
            <img src="src/assets/twitter.png" alt="Twitter" class="w-8 h-auto cursor-pointer" />
          </div>
        </div>

         {/* Bagian Bawah: Nomor & Copyright */}
         <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between mt-2">
          <p class="flex items-center gap-2">
            Hubungi nomor berikut untuk bantuan lebih lanjut: 
            <span class="font-bold ">081329876001</span>
            
            {/* Tombol Copy */}
            <img 
              src="src/assets/copy.png" 
              alt="copy" 
              class="w-4 h-auto cursor-pointer transition-transform duration-200 active:scale-90"
              onClick={copyToClipboard}
            />

            {/* Notifikasi Copy */}
            {copied() && <span class="text-green-500 text-xs">Tersalin!</span>}
          </p>
          <p>2025 jagoanKos.com. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
