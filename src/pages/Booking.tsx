import { createSignal, onMount } from "solid-js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function KosDetail() {
  const [isVideoMode, setIsVideoMode] = createSignal(false);
  const [isSticky, setIsSticky] = createSignal(false);
  const [isSaved, setIsSaved] = createSignal(false);

  onMount(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  // Fungsi Bagikan
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Link berhasil disalin!");
    });
  };

  return (
    <div class="flex mt-10 flex-col md:flex-row gap-6 p-4">
      <Navbar />
      {/* Bagian Kiri (Gambar/Video) */}
      <div class="flex-1 relative">
        {!isVideoMode() ? (
          <div class="grid grid-cols-3 grid-rows-2 gap-2">
            {/* Gambar Utama */}
            <img
              src="src/assets/kamar1.png"
              alt="Gambar Utama"
              class="col-span-2 row-span-2 w-full h-full rounded-lg object-cover"
            />
            
            {/* Gambar Kecil */}
            <img
              src="src/assets/kamar2.png"
              alt="Gambar 2"
              class="w-full h-full rounded-lg object-cover"
            />
            <div class="relative">
              <img
                src="src/assets/kamar3.png"
                alt="Gambar 3"
                class="w-full h-full rounded-lg object-cover"
              />
              <button class="absolute bottom-2 right-2 bg-white text-sm px-3 py-1 rounded-lg shadow-md">
                lihat semua foto
              </button>
            </div>
          </div>
        ) : (
          <video controls class="w-full h-auto rounded-lg">
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Tombol Pilihan Foto & Video di Bawah Gambar */}
        <div class="flex gap-2 mt-3">
          <button
            class="px-4 py-2 border rounded-lg flex items-center gap-2"
            classList={{ "bg-gray-200": !isVideoMode() }}
            onClick={() => setIsVideoMode(false)}
          >
            <img src="src/assets/picture.png" alt="Foto" class="w-5 h-5" />
            Foto
          </button>
          <button
            class="px-4 py-2 border rounded-lg flex items-center gap-2"
            classList={{ "bg-gray-200": isVideoMode() }}
            onClick={() => setIsVideoMode(true)}
          >
            <img src="src/assets/video.png" alt="Video" class="w-5 h-5" />
            Video
          </button>
        </div>

        {/* Informasi Kos */}
        <div class="mt-4">
          <h2 class="text-xl font-semibold">Kos Tipe B Jagoankos Purwokerto Kulon</h2>
          <p class="text-gray-500">Kos Putra • Kecamatan Mrangen</p>
          <div class="flex gap-2 mt-2">
            <span class="bg-green-100 text-green-700 px-2 py-1 rounded">Tipe A</span>
            <span class="text-gray-500">Sisa 1 kamar</span>
          </div>

          {/* Tombol Simpan & Bagikan */}
          <div class="flex pl-[75%] border-b pb-5 gap-4 mt-3">
            <button
              class="min-w-[115px] px-4 py-2 border rounded-lg flex items-center gap-2"
              onClick={() => setIsSaved(!isSaved())}
            >
              <img
                src={`src/assets/${isSaved() ? "love2.png" : "love.png"}`}
                alt="Simpan"
                class="w-5 h-5"
              />
              Simpan
            </button>
            <button
              class="min-w-[115px] px-4 py-2 border rounded-lg flex items-center gap-2"
              onClick={handleShare}
            >
              <img src="src/assets/share.png" alt="Bagikan" class="w-5 h-5" />
              Bagikan
            </button>
          </div>
        </div>
        <div class="p-4 md:p-8">
          {/* Bagian: Yang Kamu Dapatkan di Jagoankos */}
          <div class="mb-6">
            <h2 class="text-lg font-semibold">Yang kamu dapatkan di Jagoankos</h2>
            <div class="mt-4 space-y-4">
              {[
                { 
                  title: "Asuransi Khusus Penyewa", 
                  desc: "Perlindungan selama ngekos atas kompensasi kehilangan barang dan kerusakan fasilitas pada unit kamar. Disediakan oleh PT Great Eastern Insurance Indonesia. Syarat & Ketentuan berlaku." 
                },
                { 
                  title: "Pro Service", 
                  desc: "Ditangani secara profesional oleh tim Jagoankos. Selama kamu ngekos di sini, ada tim dari Jagoankos yang akan merespon saran dan komplainmu." 
                },
                { 
                  title: "Dikelola Jagoankos, Terjamin Nyaman", 
                  desc: "Kos ini operasionalnya dikelola dan distandarisasi oleh Jagoankos." 
                },
                { 
                  title: "Bisa Refund", 
                  desc: "Sesuai dengan ketentuan dan kebijakan refund yang berlaku di Jagoankos.", 
                  link: "Bagaimana ketentuannya?" 
                }
              ].map((item) => (
                <div class="flex items-start gap-2">
                  <img src="-" alt="Icon" class="w-5 h-5" />
                  <div>
                    <p class="font-semibold">{item.title}</p>
                    <p class="text-gray-500 text-sm">{item.desc}</p>
                    {item.link && <p class="text-blue-600 text-sm cursor-pointer">{item.link}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bagian: Spesifikasi Tipe Kamar */}
          <div class="mb-6">
            <h2 class="text-lg font-semibold">Spesifikasi tipe kamar</h2>
            <ul class="mt-2 space-y-2 text-gray-600">
              {[
                { text: "3 x 4 meter" },
                { text: "Termasuk listrik" },
                { text: "Termasuk Air PDAM" }
              ].map((item) => (
                <li class="flex items-center gap-2">
                  <img src="-" alt="Icon" class="w-5 h-5" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Bagian: Fasilitas Kamar */}
          <div class="mb-6">
            <h2 class="text-lg font-semibold">Fasilitas kamar</h2>
            <div class="grid grid-cols-2 gap-2 text-gray-600">
              {["Lemari", "Bantal", "Kasur spring bed", "Sprei", "Meja kecil"].map((item) => (
                <div class="flex items-center gap-2">
                  <img src="-" alt="Icon" class="w-5 h-5" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Bagian: Fasilitas Kamar Mandi */}
          <div>
            <h2 class="text-lg font-semibold">Fasilitas kamar mandi</h2>
            <div class="grid grid-cols-2 gap-2 text-gray-600">
              {["K. mandi dalam", "Shower", "Closet duduk"].map((item) => (
                <div class="flex items-center gap-2">
                  <img src="-" alt="Icon" class="w-5 h-5" />
                  {item}
                </div>
              ))}
            </div>
          </div>
           {/* Bagian: Peraturan Khusus Tipe Kamar */}
  <div class="mb-6">
    <h2 class="text-lg font-semibold">Peraturan khusus tipe kamar ini</h2>
    <ul class="mt-2 space-y-2 text-gray-600">
      {[ 
        "Tamu menginap dikenakan biaya", 
        "Tipe ini bisa diisi maks. 2 orang/kamar", 
        "Tidak untuk pasutri", 
        "Tidak boleh membawa anak"
      ].map((item) => (
        <li class="flex items-center"> <img src="-" alt="icon" class="w-5 h-5 mr-2" /> {item} </li>
      ))}
    </ul>
  </div>

  {/* Bagian: Tipe Kamar Lainnya */}
  <div class="mb-6">
    <h2 class="text-lg font-semibold">Tipe kamar lainnya</h2>
    <p class="text-gray-600">Kost Singgahsini Griya Pastika D2</p>
    
    <div class="mt-4 p-4 border rounded-lg shadow-md max-w-sm">
      <img src="-" alt="kamar" class="w-full h-32 object-cover rounded-md" />
      <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full mt-2 inline-block">Sisa 1 kamar</span>
      
      <h3 class="text-md font-semibold mt-2">Tipe B</h3>
      <p class="text-gray-500 text-sm">K. Mandi Dalam · WiFi · AC · Closet Duduk · Kasur · Akses 24 Jam</p>
      
      <ul class="mt-2 space-y-1 text-gray-600 text-sm">
        {[ 
          "3 x 4.5 meter", 
          "Kasur", 
          "Termasuk listrik", 
          "Maks. 2 orang/kamar", 
          "Tidak untuk pasutri", 
          "Tidak boleh bawa anak"
        ].map((item) => (
          <li class="flex items-center"> <img src="-" alt="icon" class="w-4 h-4 mr-2" /> {item} </li>
        ))}
      </ul>
      
      <p class="text-red-600 font-bold mt-2">Rp 1.875.000/bulan</p>
      
      <div class="mt-4 flex gap-2">
        <button class="px-4 py-2 border rounded text-red-600 border-red-600">Lihat Detail</button>
        <button class="px-4 py-2 bg-red-600 text-white rounded">Ajukan Sewa</button>
      </div>
    </div>
  </div>
  
        </div>        
      </div>
      

      {/* Bagian Harga (Sticky di Scroll) */}
      <div class="w-full md:w-1/3 self-start">
        <div
          class={`bg-white p-4 rounded-lg shadow-lg transition-all w-full max-w-md ${
            isSticky() ? "fixed top-20 w-80" : ""
          }`}
        >
          <div class="mt-2">
            <p class="text-xl font-semibold">Rp722.500</p>
            <p class="text-gray-500 text-sm">(Bulan pertama)</p>
          </div>

          <div class="mt-4 flex gap-2">
            <input
              type="date"
              class="w-1/2 border p-2 rounded-lg"
              placeholder="Mulai kos"
            />
            <select class="w-1/2 border p-2 rounded-lg">
              <option>Per Bulan</option>
              <option>6 Bulan</option>
              <option>1 Tahun</option>
            </select>
          </div>

          <div class="mt-4 flex flex-col gap-2">
            <button class="w-full border border-red-500 text-red-500 p-2 rounded-lg flex items-center justify-center gap-1">
              <span>🗨</span> Tanya Pemilik
            </button>
            <button class="w-full bg-red-500 text-white p-2 rounded-lg">
              Ajukan Sewa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
