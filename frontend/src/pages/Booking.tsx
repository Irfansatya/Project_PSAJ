import { createSignal, onMount, createMemo, onCleanup } from "solid-js";
import { useNavigate } from "@solidjs/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function KosDetail() {
  const navigate = useNavigate();
  const [isVideoMode, setIsVideoMode] = createSignal(false);
  const [isSticky, setIsSticky] = createSignal(false);
  const [isSaved, setIsSaved] = createSignal(false);
  const [isOpen, setIsOpen] = createSignal(false);
  const [selected, setSelected] = createSignal("Per Bulan");
  const [showNota, setShowNota] = createSignal(false);
  const [showPopup, setShowPopup] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);
  const [showPaymentPopup, setShowPaymentPopup] = createSignal(false);
  const [paymentType, setPaymentType] = createSignal("");
  const [finalPrice, setFinalPrice] = createSignal(0);
  const [tanggalMulai, setTanggalMulai] = createSignal("");

  const baseHarga = 1722500;

  const handleDateChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setTanggalMulai(target.value);
    localStorage.setItem("tanggalMulai", target.value);
  };

  const handleSelectDuration = (option: string) => {
    setSelected(option);
    setShowNota(true);
    setIsOpen(false);
    localStorage.setItem("durasiSewa", option);
  };

  const harga = createMemo(() => {
    switch (selected()) {
      case "Per 3 Bulan":
        return baseHarga * 3;
      case "Per 6 Bulan":
        return baseHarga * 6;
      case "Per Tahun":
        return baseHarga * 12;
      default:
        return baseHarga;
    }
  });
  // Menghitung DP (30%) dan pelunasan
  const uangMuka = () => Math.round(harga() * 0.3);
  const pelunasan = () => harga() - uangMuka();

  const handleConfirm = () => {
    setShowPopup(false);
    setIsLoading(true);
    alert(
      `Pembayaran ${
        paymentType() === "full" ? "Lunas" : "DP 30%"
      } sebesar Rp${finalPrice().toLocaleString()} dikonfirmasi!`
    );
    setShowPaymentPopup(false);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/pembayaran");
    }, 2000);
  };

  const handlePayment = (type: string) => {
    const price = type === "full" ? harga() : harga() * 0.3;
    setPaymentType(type);
    setFinalPrice(harga()); // Simpan harga penuh
    localStorage.setItem("paymentType", type);
    localStorage.setItem("finalPrice", harga().toString()); // Simpan harga penuh
    setShowPopup(false);
    setShowPaymentPopup(true);
  };

  const rooms = [
    {
      id: 1,
      type: "A",
      roomNumber: "1",
      status: "Sisa 1 kamar",
      image: "src/assets/kamar1.png",
      price: "Rp 1.500.000",
      facilities: ["Kamar Mandi Dalam", "AC", "Kasur", "Lemari"],
      link: "/pages/kamar1",
    },
    {
      id: 2,
      type: "B",
      roomNumber: "2",
      status: "Kamar penuh",
      image: "src/assets/kamar2.png",
      price: "Rp 1.700.000",
      facilities: ["Kamar Mandi Dalam", "Water Heater", "Meja Belajar", "WiFi"],
      link: "/pages/kamar2",
    },
    {
      id: 3,
      type: "C",
      roomNumber: "3",
      status: "Sisa 1 kamar",
      image: "src/assets/kamar3.png",
      price: "Rp 1.800.000",
      facilities: ["Kamar Mandi Dalam", "AC", "TV", "Dapur Mini"],
      link: "/pages/kamar3",
    },
    {
      id: 4,
      type: "D",
      roomNumber: "4",
      status: "Sisa 1 kamar",
      image: "src/assets/kamar4.png",
      price: "Rp 1.600.000",
      facilities: [
        "Kamar Mandi Dalam",
        "Kipas Angin",
        "Meja Belajar",
        "CCTV 24 Jam",
      ],
      link: "/pages/kamar4",
    },
  ];

  onMount(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 15); // Sesuaikan nilai ini sesuai kebutuhan
    };

    window.addEventListener("scroll", handleScroll);
    onCleanup(() => window.removeEventListener("scroll", handleScroll));
  });
  // Fungsi Bagikan
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Link berhasil disalin!");
    });
  };

  return (
    <div class="flex mt-20 flex-col md:flex-row gap-6 p-4">
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
          <h2 class="text-xl font-semibold">
            Kos Tipe B Jagoankos Purwokerto Kulon
          </h2>
          <p class="text-gray-500">Kos Putra • Kecamatan Mrangen</p>
          <div class="flex gap-2 mt-2">
            <span class="bg-green-100 text-green-700 px-2 py-1 rounded">
              Tipe A
            </span>
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
            <h2 class="text-lg font-semibold">
              Yang kamu dapatkan di Jagoankos
            </h2>
            <div class="mt-4 space-y-4">
              {[
                {
                  title: "Asuransi Khusus Penyewa",
                  desc: "Perlindungan selama ngekos atas kompensasi kehilangan barang dan kerusakan fasilitas pada unit kamar. Disediakan oleh PT Great Eastern Insurance Indonesia. Syarat & Ketentuan berlaku.",
                  img: "src/assets/Shild.png",
                },
                {
                  title: "Pro Service",
                  desc: "Ditangani secara profesional oleh tim Jagoankos. Selama kamu ngekos di sini, ada tim dari Jagoankos yang akan merespon saran dan komplainmu.",
                  img: "src/assets/Markzukebert.png",
                },
                {
                  title: "Dikelola Jagoankos, Terjamin Nyaman",
                  desc: "Kos ini operasionalnya dikelola dan distandarisasi oleh Jagoankos.",
                  img: "src/assets/image-15.png",
                },
                {
                  title: "Bisa Refund",
                  desc: "Sesuai dengan ketentuan dan kebijakan refund yang berlaku di Jagoankos.",
                  link: "Bagaimana ketentuannya?",
                  img: "src/assets/img.png",
                },
              ].map((item) => (
                <div class="flex items-start gap-2">
                  <img src={item.img} alt="Icon" class="w-6 my-2 h-6" />
                  <div>
                    <p class="font-semibold">{item.title}</p>
                    <p class="text-gray-500 text-sm">{item.desc}</p>
                    {item.link && (
                      <p class="text-blue-600 text-sm cursor-pointer">
                        {item.link}
                      </p>
                    )}
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
                {
                  text: "3 x 4 meter",
                  icon: "src/assets/noun-house-7458210 1.png",
                },
                { text: "Termasuk listrik", icon: "src/assets/image 6.png" },
                { text: "Termasuk Air PDAM", icon: "src/assets/image-12.png" },
              ].map((item) => (
                <li class="flex items-center gap-2">
                  <img src={item.icon} alt="Icon" class="w-5 my-2 h-5" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Bagian: Fasilitas Kamar */}
          <div class="mb-10">
            <h2 class="text-lg font-semibold">Fasilitas kamar</h2>
            <div class="grid grid-cols-2 gap-2 text-gray-600">
              {[
                { text: "Lemari", icon: "src/assets/image-11.png" },
                { text: "Bantal", icon: "src/assets/image 7.png" },
                { text: "Kasur spring bed", icon: "src/assets/image-8.png" },
                { text: "Sprei", icon: "src/assets/image-9.png" },
                { text: "Meja kecil", icon: "src/assets/image-10.png" },
              ].map((item) => (
                <div class="flex items-center gap-2">
                  <img src={item.icon} alt="Icon" class="w-5 my-2 h-5" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Bagian: Fasilitas Kamar Mandi */}
          <div class="mb-10">
            <h2 class="text-lg font-semibold">Fasilitas kamar mandi</h2>
            <div class="grid grid-cols-2 gap-2 text-gray-600">
              {[
                { text: "K. mandi dalam", icon: "src/assets/image-5.png" },
                { text: "Shower", icon: "src/assets/image-6.png" },
                // { text: "Closet duduk", icon: "src/assets/toilet.png" }
              ].map((item) => (
                <div class="flex items-center gap-2">
                  <img src={item.icon} alt="Icon" class="w-5 my-2 h-5" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Bagian: Peraturan Khusus Tipe Kamar */}
          <div class="mb-6">
            <h2 class="text-lg font-semibold">
              Peraturan khusus tipe kamar ini
            </h2>
            <ul class="mt-2 space-y-2 text-gray-600">
              {[
                {
                  text: "Tamu menginap dikenakan biaya",
                  icon: "src/assets/image 8.png",
                },
                {
                  text: "Tipe ini bisa diisi maks. 2 orang/kamar",
                  icon: "src/assets/image-15.png",
                },
                {
                  text: "Tidak untuk pasutri",
                  icon: "src/assets/image-13.png",
                },
                {
                  text: "Tidak boleh membawa anak",
                  icon: "src/assets/image-14.png",
                },
              ].map((item) => (
                <li class="flex items-center">
                  <img src={item.icon} alt="icon" class="w-5 h-5 my-2 mr-2" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Bagian: Tipe Kamar Lainnya */}
          <div class="mb-6">
            <h2 class="text-lg font-semibold">Tipe kamar lainnya</h2>
            {/* Kamar List */}
            <div class="grid grid-cols-4 gap-6">
              {rooms.map((room) => (
                <a href={room.link} class="block h-full">
                  <div class="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 h-full flex flex-col">
                    <img
                      src={room.image}
                      alt={`Kamar Kos ${room.type}`}
                      class="w-full h-56 object-cover"
                    />
                    <div class="p-4 flex flex-col flex-grow justify-between">
                      <div>
                        <span
                          class={`text-xs font-medium px-2 py-1 rounded-full ${
                            room.status.includes("penuh")
                              ? "bg-[#FFE8E8] text-[#f80000]"
                              : "bg-white border text-gray-400"
                          }`}
                        >
                          {room.status}
                        </span>
                        <h2 class="font-bold text-lg mt-2">
                          Kamar Kos Tipe {room.type} - Kamar {room.roomNumber}
                        </h2>
                        <p class="text-gray-600 text-sm">
                          {room.facilities.join(", ")}
                        </p>
                      </div>
                      <p class="font-semibold mt-2">
                        {room.price}{" "}
                        <span class="text-gray-500 text-sm">(Per 6 Bulan)</span>
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Bagian: Lokasi dan Lingkungan Sekitar */}
          <div class="mb-6">
            <h2 class="text-lg font-semibold">Lokasi dan lingkungan sekitar</h2>
            <p class="text-gray-500 text-sm">Purwokerto kulon, Banyumas</p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.google.com/maps/place/Jagoan+Kos/@-7.4331518,109.245757,17z/data=!3m1!4b1!4m6!3m5!1s0x2e655fa0d36d2cb9:0x31db3864f56d0cb8!8m2!3d-7.4331571!4d109.2483319!16s%2Fg%2F11hzyn8phv?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
            >
              <img
                src="src/assets/maps2.png"
                alt="Lokasi Kos"
                class="w-full h-auto cursor-pointer rounded-lg transition-shadow duration-300 hover:shadow-lg"
              />
            </a>
            <div class="mt-4">
              <button class="px-4 py-2 bg-gray-200 rounded-lg">Terdekat</button>
              <button class="px-4 py-2 bg-gray-200 rounded-lg ml-2">
                Transportasi
              </button>
            </div>
            <ul class="mt-10 space-y-2 text-gray-600">
              {[
                { icon: "image 9.png", text: "Warteg Bu Wito 1.2 km" },
                { icon: "image 10.png", text: "Alfamart 1.3 km" },
                { icon: "image 11.png", text: "Masjid Darussalam 1.3 km" },
                { icon: "image 12.png", text: "Bank Mandiri 1.3 km" },
                {
                  icon: "image 13.png",
                  text: "Universitas Gadjah Mada 1.3 km",
                },
                { icon: "image 14.png", text: "RS DKT 1.3 km" },
              ].map((item) => (
                <li class="flex items-center gap-2">
                  <img
                    src={`src/assets/${item.icon}`}
                    alt="icon"
                    class="w-5 my-2 h-5"
                  />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Bagian: Ketentuan Pengajuan Sewa */}
          <div class="mb-6">
            <h2 class="text-lg py-2 font-semibold">Ketentuan pengajuan sewa</h2>
            <p class="text-gray-500 text-sm">Bisa bayar DP (uang muka) dulu</p>
            <p class="text-gray-500 text-sm">
              Biaya DP adalah 30% dari biaya yang dipilih
            </p>
            <div class="mt-4 grid grid-cols-2 gap-2 text-gray-600">
              {[
                {
                  icon: "image 15.png",
                  text: "Waktu mulai kos terdekat: Bisa hari H setelah pengajuan sewa",
                },
                {
                  icon: "image 15.png",
                  text: "Waktu mulai kos terjauh: setelah 1 bulan pengajuan sewa",
                },
              ].map((item) => (
                <div class="flex items-center gap-2">
                  <img
                    src={`src/assets/${item.icon}`}
                    alt="icon"
                    class="w-5 h-5"
                  />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <div class="w-full md:w-1/3 self-start">
        <div
          class={`bg-white p-4 rounded-lg shadow-lg transition-all w-full max-w-md ${
            isSticky() ? "fixed top-20 w-96" : ""
          }`}
        >
          <div class="mt-2">
            <p class="text-xl font-semibold">Rp{harga().toLocaleString()}</p>
            <p class="text-gray-500 text-sm">(Bulan pertama)</p>
          </div>

          {/* Input Tanggal & Dropdown */}
          <div class="mt-4 flex gap-2">
            <input
              type="date"
              class="w-1/2 border p-2 rounded-lg"
              placeholder="Mulai kos"
              value={tanggalMulai()}
              onInput={handleDateChange}
            />
            <div class="relative w-1/2">
              <button
                class="w-full border p-2 rounded-lg flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen())}
              >
                {selected()}
                <span
                  class={`transition-transform duration-500 text-[10px] ${
                    isOpen() ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* List Dropdown */}
              <div
                class={`absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-10 transition-all ${
                  isOpen()
                    ? "opacity-100 visible scale-100"
                    : "opacity-0 invisible scale-95"
                }`}
              >
                {["Per Bulan", "Per 3 Bulan", "Per 6 Bulan", "Per Tahun"].map(
                  (option) => (
                    <label
                      class="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        handleSelectDuration(option);
                        setSelected(option);
                        setShowNota(true);
                        setIsOpen(false);
                      }}
                    >
                      <input
                        type="radio"
                        name="durasi"
                        value={option}
                        checked={selected() === option}
                        class="form-radio text-red-500"
                      />
                      {option}
                    </label>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Nota Pembayaran */}
          {showNota() && (
            <div class="mt-4 p-4 border rounded-lg bg-gray-50">
              <p class="text-sm font-semibold">Jika kamu bayar pakai DP:</p>
              <div class="flex justify-between text-sm mt-1">
                <span>Uang muka (DP)</span>
                <span>Rp{(harga() * 0.3).toLocaleString()}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span>Pelunasan</span>
                <span>Rp{(harga() * 0.7).toLocaleString()}</span>
              </div>

              <p class="text-sm font-semibold mt-2">
                Jika kamu pakai pembayaran penuh:
              </p>
              <div class="flex justify-between text-sm">
                <span>Pembayaran penuh</span>
                <span>Rp{harga().toLocaleString()}</span>
              </div>

              <hr class="my-2" />
              <div class="flex justify-between font-semibold">
                <span>Total pembayaran pertama</span>
                <span>Rp{(harga() + 55).toLocaleString()}</span>
              </div>

              <div class="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <span>ℹ</span>
                <span>Bisa bayar pakai DP</span>
              </div>
            </div>
          )}

          {/* Tombol Aksi */}
          <div class="mt-4 flex flex-col gap-2">
            <button class="w-full border transition-colors duration-300 border-red-500 text-red-500 p-2 rounded-lg flex items-center justify-center gap-1">
              🗨 Tanya Pemilik
            </button>
            <button
              class="w-full bg-red-500 transition-colors duration-300 text-white p-2 rounded-lg"
              onClick={() => setShowPopup(true)}
            >
              Ajukan Sewa
            </button>
          </div>
        </div>

        {/* Popup Konfirmasi */}
        {showPopup() && (
          <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 class="text-lg font-semibold mb-4">
                Pilih Metode Pembayaran
              </h2>
              <p class="text-gray-700">Silakan pilih cara pembayaran:</p>

              <div class="mt-4 flex flex-col gap-2">
                <button
                  class="w-full bg-[#F80000] text-white hover:bg-[#FA4040] transition-colors duration-300 p-2 rounded-lg"
                  onClick={() => handlePayment("full")}
                >
                  Bayar Lunas (Rp {harga().toLocaleString()})
                </button>

                <button
                  class="w-full bg-[#F80000] text-white  hover:bg-[#FA4040] transition-colors duration-300 p-2 rounded-lg"
                  onClick={() => handlePayment("dp")}
                >
                  Bayar DP 30% (Rp {(harga() * 0.3).toLocaleString()})
                </button>
              </div>

              <div class="flex justify-end mt-4">
                <button
                  onClick={() => setShowPopup(false)}
                  class="transition-colors duration-300 px-4 py-2 bg-white text-[#f80000] border border-[#f80000] hover:bg-[#ffe8e8] hover:text-[#f80000]  hover:border-[#ffe8e8] rounded"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Popup Pembayaran */}
        {showPaymentPopup() && (
          <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 class="text-lg font-semibold mb-4">Konfirmasi Pembayaran</h2>
              <p class="text-gray-700">Anda memilih pembayaran:</p>

              {paymentType() === "full" ? (
                <p class="text-xl font-bold ">
                  Bayar Lunas: Rp {harga().toLocaleString()}
                </p>
              ) : (
                <div>
                  <p class="text-xl font-bold ">
                    Bayar DP: Rp {(harga() * 0.3).toLocaleString()}
                  </p>
                  <p class="mt-2">
                    Pelunasan:{" "}
                    <span class="font-semibold">
                      Rp {(harga() * 0.7).toLocaleString()}
                    </span>
                  </p>
                </div>
              )}

              <div class="flex justify-end mt-10">
                <button
                  onClick={() => setShowPaymentPopup(false)}
                  class="bg-white transition-colors duration-300 text-[#f80000] border-[#f80000] hover:bg-[#ffe8e8] hover:text-[#f80000]  hover:border-[#ffe8e8] mr-2 px-4 py-2 border rounded"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirm}
                  class="px-4 py-2 bg-[#F80000] transition-colors duration-300 text-white  hover:bg-[#FA4040] rounded"
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Loading Screen */}
        {isLoading() && (
          <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div class="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              <p class="mt-2 text-red-500">Loading</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
