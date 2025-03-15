import { createSignal, onMount } from "solid-js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Back from "../components/back";
import Notifikasi from "../components/Notifikasi";

const Popup = ({ title, onClose, children }) => {
  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white rounded-lg p-6 w-[400px] shadow-lg relative">
        {/* Header */}
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">{title}</h2>
          <button class="text-gray-500 hover:text-red-600" onClick={onClose}>
            X
          </button>
        </div>
        <div class="mt-2">{children}</div>
      </div>
    </div>
  );
};
function PengajuanSewa() {
  const [finalPrice, setFinalPrice] = createSignal(0);
  const [notifications, setNotifications] = createSignal([]);
  const [tanggalMulai, setTanggalMulai] = createSignal("");
  const [durasiSewa, setDurasiSewa] = createSignal(0); // Durasi dalam bulan
  const [tanggalAkhir, setTanggalAkhir] = createSignal("");
  const [showNotifikasi, setShowNotifikasi] = createSignal(false);
  const [isChecked, setIsChecked] = createSignal(false);
  const [showRules, setShowRules] = createSignal(false);
  const [showFacilities, setShowFacilities] = createSignal(false);
  const [paymentType, setPaymentType] = createSignal("");
  const baseHarga = 1722500; // Harga dasar
  const [isOpen, setIsOpen] = createSignal(false);
  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);
  const [profileData, setProfileData] = createSignal({
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
  });
  const addNotification = (title, message) => {
    const newNotification = {
      id: Date.now(), // Menggunakan timestamp sebagai ID unik
      title: title,
      message: message,
    };
    const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    storedNotifications.push(newNotification);
    localStorage.setItem("notifications", JSON.stringify(storedNotifications));
  };

  const handlePengajuan = () => {
    addNotification(
      "BOOKING KOS DI TERIMA!!!",
      "Kamu memiliki waktu 24 jam untuk melakukan pembayaran Jagoankos Purwokerto kulon. Transaksi akan dibatalkan secara otomatis apabila pembayaran tidak dilakukan."
    );
    setShowNotifikasi(true); // Menampilkan notifikasi

    localStorage.setItem("finalPrice", finalPrice().toString());
    localStorage.setItem("profileData", JSON.stringify(profileData()));
    localStorage.setItem("tanggalMulai", tanggalMulai());
    localStorage.setItem("tanggalAkhir", tanggalAkhir());
  };
  const openRulesPopup = () => {
    setShowRules(true);
    closePopup(); // Tutup popup utama
  };
  const openFacilitiesPopup = () => {
    setShowFacilities(true);
    closePopup(); // Tutup popup utama
  };

  // Mengambil data dari localStorage saat komponen dimuat
  onMount(() => {
    const storedPaymentType = localStorage.getItem("paymentType");
    const storedFinalPrice = localStorage.getItem("finalPrice");

    if (storedPaymentType) {
      setPaymentType(storedPaymentType);
    }

    if (storedFinalPrice) {
      setFinalPrice(parseInt(storedFinalPrice, 10)); // Mengonversi string ke integer
    }
  });

  // Menghitung DP (30% dari total harga)
  const uangMuka = () => Math.round(finalPrice() * 0.3);
  const pelunasan = () => Math.round(finalPrice() * 0.7);

  onMount(() => {
    const savedProfile = localStorage.getItem("profileData");
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
    const storedPrice = localStorage.getItem("finalPrice");
    if (storedPrice) {
      setFinalPrice(parseInt(storedPrice, 10)); // Mengonversi string ke integer
    }
    const storedTanggal = localStorage.getItem("tanggalMulai");
    if (storedTanggal) {
      setTanggalMulai(storedTanggal);
    }
  });

  onMount(() => {
    const storedTanggal = localStorage.getItem("tanggalMulai");
    const storedDurasi = localStorage.getItem("durasiSewa");

    if (storedTanggal) {
      setTanggalMulai(storedTanggal);
    }

    if (storedDurasi) {
      // Mengonversi durasi sewa ke dalam bulan
      switch (storedDurasi) {
        case "Per Bulan":
          setDurasiSewa(1);
          break;
        case "Per 3 Bulan":
          setDurasiSewa(3);
          break;
        case "Per 6 Bulan":
          setDurasiSewa(6);
          break;
        case "Per Tahun":
          setDurasiSewa(12);
          break;
        default:
          setDurasiSewa(0);
      }
    }

    // Menghitung tanggal akhir
    if (storedTanggal) {
      const startDate = new Date(storedTanggal);
      startDate.setMonth(startDate.getMonth() + durasiSewa()); // Menambahkan durasi sewa
      setTanggalAkhir(startDate.toLocaleDateString()); // Mengonversi ke format tanggal yang sesuai
    }
  });

  const [catatan, setCatatan] = createSignal("");

  // Mengambil catatan dari localStorage saat komponen dimuat
  onMount(() => {
    const storedCatatan = localStorage.getItem("catatanTambahan");
    if (storedCatatan) {
      setCatatan(storedCatatan);
    }
  });

  // Menangani perubahan pada textarea
  const handleCatatanChange = (event) => {
    const newCatatan = event.target.value;
    setCatatan(newCatatan);
    localStorage.setItem("catatanTambahan", newCatatan); // Simpan ke localStorage
  };

  return (
    <div class="max-w-7xl mx-auto p-4">
      <Navbar />
      <div class="bg-white p-6 pt-14 rounded-lg shadow-md">
        <Back />
        <h2 class="text-2xl font-semibold mb-6">Pengajuan Sewa</h2>
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-[#F80000] rounded-full flex items-center justify-center text-white">
                1
              </div>
              <span class="ml-2">Ajukan Sewa</span>
            </div>
            <div class="w-8 h-1 bg-[#F80000]"></div>
            <div class="flex items-center">
              <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                2
              </div>
              <span class="ml-2">Pemilik Menyetujui</span>
            </div>
            <div class="w-8 h-1 bg-gray-300"></div>
            <div class="flex items-center">
              <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                3
              </div>
              <span class="ml-2">Bayar Sewa Pertama</span>
            </div>
            <div class="w-8 h-1 bg-gray-300"></div>
            <div class="flex items-center">
              <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                4
              </div>
              <span class="ml-2">Check-in</span>
            </div>
          </div>
        </div>
        <div class="bg-red-100 text-red-600 p-4 rounded-lg mb-6 flex items-start">
          <img src="src/assets/image 39.png" alt="Info" class="w-6 h-6 mr-2" />{" "}
          <p>
            <i class="fas fa-exclamation-circle"></i>
            Sisa satu kamar, jangan sampai kehabisan
          </p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2">
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-4">Informasi Penyewa</h3>
              <div class="bg-gray-100 p-4 rounded-lg">
                <div class="flex justify-between items-center mb-4">
                  <div>
                    <p>Nama Penyewa</p>
                    <p class="font-semibold">{profileData().nama}</p>
                  </div>
                </div>
                <div class="mb-4">
                  <p>Email</p>
                  <p class="font-semibold">{profileData().email}</p>
                </div>
                <div class="mb-4">
                  <p>Nomor Telepon</p>
                  <p class="font-semibold">{profileData().telepon}</p>
                </div>
                <div class="mb-4">
                  <p>Jenis Kelamin</p>
                  <p class="font-semibold">Laki-laki</p>
                </div>
                <div class="mb-4">
                  <p>Alamat</p>
                  <p class="font-semibold">{profileData().alamat}</p>
                </div>
              </div>
            </div>

            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-4">Biaya Sewa Kos</h3>
              <div class="bg-gray-100 p-4 rounded-lg">
                <div class="flex justify-between items-center my-4">
                  <div>
                    <p>Harga Per Bulan</p>
                  </div>
                  <div class="font-semibold">Rp 1.722.500</div>
                </div>
              </div>
            </div>
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-4">Catatan Tambahan</h3>
              <textarea
                class="w-full p-4 border rounded-lg"
                placeholder="Tambahkan Catatan Pengajuan Sewa Kos (Opsional)"
                rows="4"
                value={catatan()} // Mengikat nilai textarea dengan state catatan
                onInput={handleCatatanChange} // Menangani perubahan input
              ></textarea>
            </div>
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-4">Tanggal Mulai Ngekos</h3>
              <div class="bg-gray-100 p-4 rounded-lg">
                <p>
                  {tanggalMulai() || "Belum ditentukan"} -{" "}
                  {tanggalAkhir() || "Belum ditentukan"}
                </p>
              </div>
            </div>
            <button class="mb-6">
              <h3 class="text-lg font-semibold border-t pt-6 mb-4">
                FAQ Tentang Pengajuan Sewa<span class="pl-[535px]">»</span>
              </h3>
            </button>
            <div class="p-4">
              {/* Tombol Ajukan Sewa */}
              <div class="flex items-center cursor-pointer" onClick={openPopup}>
                <button
                  class="w-full bg-[#F80000] hover:bg-[#FA4040] text-white py-4 rounded-lg text-lg font-semibold transition"
                >
                  Ajukan Sewa
                </button>
              </div>

              {/* Modal Popup */}
              {isOpen() && (
                <Popup
                  title="Pastikan kamu sudah membaca informasi kos secara lengkap"
                  onClose={closePopup}
                >
                  <p class="text-gray-500 text-sm mt-2">
                    Karena, setelah pengajuan disetujui pemilik, kamu akan
                    melakukan pembayaran pertama.
                  </p>

                  {/* Informasi Kos */}
                  <div class="flex items-start gap-4 mt-4">
                    <img
                      src="src/assets/kamar1.png"
                      alt="Kos"
                      class="w-20 h-20 rounded-md object-cover"
                    />
                    <div>
                      <span class="bg-gray-200 text-xs px-2 py-1 rounded-full">
                        Putra
                      </span>
                      <p class="text-sm font-semibold mt-1">
                        Kos Tipe A, Jogjakarta, Purwokerto, Murah dan Nyaman
                      </p>
                      <p class="text-xs text-gray-500">
                        Kasur · WiFi · K. Mandi Dalam · Kloset Duduk
                      </p>
                    </div>
                  </div>

                  {/* Tombol Peraturan Kos & Fasilitas Kos */}
                  <div class="mt-4">
                    <button
                      class="w-full flex justify-between items-center py-6 rounded-lg px-6 border-b "
                      onClick={openRulesPopup}
                    >
                      <span class="font-bold">Peraturan Kos</span>{" "}
                      <span>➝</span>
                    </button>
                    <button
                      class="w-full flex justify-between items-center rounded-lg px-6 py-6 "
                      onClick={openFacilitiesPopup}
                    >
                      <span class="font-bold">Fasilitas Kos</span>{" "}
                      <span>➝</span>
                    </button>
                  </div>

                  {/* Checkbox Syarat & Tombol Kirim */}
                  <div class="mt-4">
                    <label class="flex items-center text-xs">
                      <input
                        type="checkbox"
                        class="mr-2"
                        checked={isChecked()}
                        onChange={(e) => setIsChecked(e.target.checked)}
                      />
                      Saya telah membaca, memahami, dan menyetujui{" "}
                      <a href="#" class="text-blue-500">
                        Syarat Ketentuan
                      </a>{" "}
                      serta{" "}
                      <a href="#" class="text-blue-500">
                        Kebijakan Privasi
                      </a>
                    </label>
                  </div>

                  <button
                    
                    class={`mt-4 w-full py-3 rounded-lg font-semibold transition ${
                      isChecked()
                        ? "bg-[#F80000] hover:bg-[#FA4040]"
                        : "bg-gray-400 cursor-not-allowed"
                    } text-white`}
                    disabled={!isChecked()}
                    onClick={handlePengajuan}
                  >
                    Kirim pengajuan ke pemilik
                  </button>
                  {/* Notifikasi */}
                <Notifikasi
                  isOpen={showNotifikasi()}
                  onClose={() => setShowNotifikasi(false)}
                />
                </Popup>
              )}

              {/* Popup untuk Peraturan Kos */}
              {showRules() && (
                <Popup title="" onClose={() => setShowRules(false)}>
                  <div class="my-4 mx-14 space-y-4">
                    <h3 class="text-lg font-semibold">Peraturan kos</h3>
                    <ul class="space-y-6 pb-10">
                      <li class="flex items-center gap-3">
                        <img
                          src="src/assets/image 8.png"
                          alt=""
                          class="w-5 h-5"
                        />
                        <span>Tamu menginap wajib izin</span>
                      </li>
                      <li class="flex items-center gap-3">
                        <img
                          src="src/assets/image-15.png"
                          alt="Listrik"
                          class="w-5 h-5"
                        />
                        <span>Tipe ini diisi maks. 1 orang per kamar</span>
                      </li>
                      <li class="flex items-center gap-3">
                        <img
                          src="src/assets/image-13.png"
                          alt="PDAM"
                          class="w-5 h-5"
                        />
                        <span>Tidak untuk pasutri</span>
                      </li>
                    </ul>
                  </div>
                </Popup>
              )}

              {/* Popup untuk Fasilitas Kos */}
              {showFacilities() && (
                <Popup title="" onClose={() => setShowFacilities(false)}>
                  <div class="my-4 mx-20 space-y-4 ">
                    <h3 class="text-lg font-semibold">Fasilitas kos</h3>
                    <ul class="space-y-2">
                      <li class="flex items-center gap-3">
                        <img
                          src="src/assets/image-13.png"
                          alt="Ukuran"
                          class="w-5 h-5"
                        />
                        <span>3 x 4 meter</span>
                      </li>
                      <li class="flex items-center gap-3">
                        <img
                          src="src/assets/image-13.png"
                          alt="Listrik"
                          class="w-5 h-5"
                        />
                        <span>Termasuk listrik</span>
                      </li>
                      <li class="flex items-center gap-3">
                        <img
                          src="src/assets/image-13.png"
                          alt="PDAM"
                          class="w-5 h-5"
                        />
                        <span>Termasuk Air PDAM</span>
                      </li>
                    </ul>

                    <h3 class="text-lg font-semibold">Fasilitas kamar</h3>
                    <ul class="space-y-2">
                      <li class="flex items-center gap-3">
                        <img
                          src="src/assets/image-13.png"
                          alt="Lemari"
                          class="w-5 h-5"
                        />
                        <span>Lemari</span>
                      </li>
                      <li class="flex items-center gap-3">
                        <img
                          src="src/assets/image-13.png"
                          alt="Bantal"
                          class="w-5 h-5"
                        />
                        <span>Bantal</span>
                      </li>
                      <li class="flex items-center gap-3">
                        <img
                          src="src/assets/image-13.png"
                          alt="Kasur"
                          class="w-5 h-5"
                        />
                        <span>Kasur spring bed</span>
                      </li>
                      <li class="flex items-center gap-3">
                        <img
                          src="src/assets/image-13.png"
                          alt="Sprei"
                          class="w-5 h-5"
                        />
                        <span>Sprei</span>
                      </li>
                      <li class="flex items-center gap-3">
                        <img
                          src="src/assets/image-13.png"
                          alt="Meja"
                          class="w-5 h-5"
                        />
                        <span>Meja kecil</span>
                      </li>
                    </ul>

                    <h3 class="text-lg font-semibold">Fasilitas kamar mandi</h3>
                    <ul class="space-y-2 pb-10">
                      <li class="flex items-center  gap-3">
                        <img
                          src="src/assets/image-13.png"
                          alt="Kamar mandi dalam"
                          class="w-5 h-5"
                        />
                        <span>K. mandi dalam</span>
                      </li>
                      <li class="flex items-center gap-3">
                        <img
                          src="src/assets/image-13.png"
                          alt="Shower"
                          class="w-5 h-5"
                        />
                        <span>Shower</span>
                      </li>
                    </ul>
                  </div>
                </Popup>
              )}
            </div>
          </div>
          <div>
            <div class="bg-white p-6 rounded-lg shadow-md">
              <img
                alt="Room image"
                class="w-full h-48 object-cover rounded-lg mb-4"
                src="src/assets/kamar1.png"
              />
              <h3 class="text-lg font-semibold mb-4">
                Kos Tipe A, Jogjakarta, Purwokerto, Murah dan Nyaman
              </h3>

              {/* Menampilkan informasi pembayaran */}
              {paymentType() === "dp" ? (
                <>
                  <div class="mb-4">
                    <p class="font-semibold">Pembayaran Pertama (DP)</p>
                    <p>Rp {uangMuka().toLocaleString()}</p>
                  </div>
                  <div class="mb-4">
                    <p class="font-semibold">Total Pembayaran Pelunasan (DP)</p>
                    <p>Rp {pelunasan().toLocaleString()}</p>
                  </div>
                </>
              ) : (
                <>
                  <div class="mb-4">
                    <p class="font-semibold">Pembayaran Pertama (DP)</p>
                    <p>Rp 0</p>
                  </div>
                  <div class="mb-4">
                    <p class="font-semibold">Total Pembayaran Pelunasan (DP)</p>
                    <p>Rp {finalPrice().toLocaleString()}</p>
                  </div>
                </>
              )}

              <div class="mb-4">
                <p class="font-semibold">Total Pembayaran</p>
                <p>Rp {finalPrice().toLocaleString()}</p>
              </div>

              <div class=" p-4 rounded-lg border flex items-start">
                <img
                  src="src/assets/image 47.png"
                  alt="Info"
                  class="w-8 h-8 mt-8 mr-2"
                />
                <p>
                  <i class="fas fa-exclamation-circle"></i>
                  Jika DP makan pembayaran pelunasan dilakukan maksimal 1 bulan
                  setelah masuk kos! Info lebih lanjut tanyakan kepada pemilik
                  kost
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PengajuanSewa;
