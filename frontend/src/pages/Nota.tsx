import { createSignal, onMount } from "solid-js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Nota() {
  const [profileData, setProfileData] = createSignal({
    nama: "",
    telepon: "",
  });
  const [finalPrice, setFinalPrice] = createSignal(0);
  const [tanggalMulai, setTanggalMulai] = createSignal("");
  const [tanggalAkhir, setTanggalAkhir] = createSignal("");
  const [durasiSewa, setDurasiSewa] = createSignal("");
  const baseHarga = 1722500;

  // Fungsi untuk memformat tanggal
  const formatTanggal = (dateString: string) => {
    if (!dateString) return "Belum ditentukan"; // Menangani kasus tanggal tidak valid
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
  };

  // Mengambil data dari localStorage saat komponen dimuat
  onMount(() => {
    const storedProfileData = JSON.parse(localStorage.getItem("profileData")) || {};
    const storedFinalPrice = localStorage.getItem("finalPrice") || "0";
    const storedTanggalMulai = localStorage.getItem("tanggalMulai") || "";
    const storedDurasiSewa = localStorage.getItem("durasiSewa") || "";

    setProfileData(storedProfileData);
    setFinalPrice(parseInt(storedFinalPrice, 10));
    setTanggalMulai(storedTanggalMulai);
    setDurasiSewa(storedDurasiSewa);

    // Menghitung tanggal akhir
    if (storedTanggalMulai) {
      const startDate = new Date(storedTanggalMulai);
      let monthsToAdd = 0;

      switch (storedDurasiSewa) {
        case "Per Bulan":
          monthsToAdd = 1;
          break;
        case "Per 3 Bulan":
          monthsToAdd = 3;
          break;
        case "Per 6 Bulan":
          monthsToAdd = 6;
          break;
        case "Per Tahun":
          monthsToAdd = 12;
          break;
        default:
          monthsToAdd = 1; // Default ke 1 bulan
      }

      startDate.setMonth(startDate.getMonth() + monthsToAdd);
      setTanggalAkhir(startDate.toISOString().split('T')[0]); // Simpan dalam format YYYY-MM-DD
    }
  });

  return (
    <div class="bg-white text-gray-900">
      <div class="max-w-7xl mx-auto p-4">
        <div class="flex items-center mb-4">
          <i class="fas fa-arrow-left text-xl"></i>
          <span class="ml-2 text-lg">Kembali</span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <div class="mb-8">
              <h2 class="text-2xl font-semibold mb-4">Waktu booking</h2>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="font-medium">Tanggal masuk</p>
                </div>
                <div>
                  <p>{formatTanggal(tanggalMulai()) || "Belum ditentukan"}</p>
                </div>
                <div>
                  <p class="font-medium">Tanggal keluar</p>
                </div>
                <div>
                  <p>{formatTanggal(tanggalAkhir()) || "Belum ditentukan"}</p>
                </div>
                <div>
                  <p class="font-medium">Hitungan sewa</p>
                </div>
                <div>
                  <p>Bulanan</p>
                </div>
                <div>
                  <p class="font-medium">Durasi sewa</p>
                </div>
                <div>
                  <p>{durasiSewa() || "Belum ditentukan"}</p>
                </div>
              </div>
            </div>
            <div class="mb-8">
              <h2 class="text-2xl font-semibold mb-4">Data diri penyewa</h2>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="font-medium">Nama lengkap</p>
                </div>
                <div>
                  <p>{profileData().nama || "Belum ditentukan"}</p>
                </div>
                <div>
                  <p class="font-medium">Jenis Kelamin</p>
                </div>
                <div>
                  <p>Laki-laki</p>
                </div>
                <div>
                  <p class="font-medium">No Handphone</p>
                </div>
                <div>
                  <p>{profileData().telepon || "Belum ditentukan"}</p>
                </div>
              </div>
            </div>
            <div>
              <h2 class="text-2xl font-semibold mb-4">Keterangan biaya lain</h2>
              <p>Sewa kamar menjadi Rp.{baseHarga.toLocaleString()}/bulan</p>
              <p>Biaya kebersihan free/bulan</p>
              <p>Biaya sampah free/bulan</p>
            </div>
          </div>
          <div class="lg:col-span-1">
            <div class="border rounded-lg p-4 w-full lg:w-96">
              <div class="flex items-center mb-4">
                <img
                  alt="Room image"
                  class="w-24 h-24 rounded-lg mr-4"
                  src="src/assets/kamar1.png"
                />
                <div>
                  <span class="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                    Putra
                  </span>
                  <p class="font-semibold">Kos Tipe A Jagoankos Purwokerto kulon</p>
                  <p class="text-sm text-gray-600">Kasur · WiFi · K. Mandi Dalam · Kloset Duduk · K. Mandi Luar ·...</p>
                </div>
              </div>
              <div class="mb-4">
                <h3 class="font-semibold">Pembayaran Pertama (DP):</h3>
                <div class="flex justify-between">
                  <p>Uang muka (DP)</p>
                  <p>Rp.{(finalPrice() * 0.3).toLocaleString()}</p>
                </div>
                <div class="flex justify-between font-semibold">
                  <p>Total Pembayaran Pertama (DP)</p>
                  <p>Rp.{(finalPrice() * 0.3).toLocaleString()}</p>
                </div>
              </div>
              <div class="mb-4">
                <h3 class="font-semibold">Pembayaran Pertama (Pelunasan):</h3>
                <div class="flex justify-between">
                  <p>Pelunasan</p>
                  <p>Rp.{finalPrice().toLocaleString()}</p>
                </div>
                <div class="flex justify-between font-semibold">
                  <p>Total Pembayaran Pertama (Pelunasan)</p>
                  <p>Rp.{finalPrice().toLocaleString()}</p>
                </div>
              </div>
              <div class="bg-white border p-4 flex items-center rounded-lg" role="alert">
                <img alt="Alert icon" class="w-6 h-6 mr-2" src="src/assets/image 47.png" />
                <p class="font-medium">Khusus Pembayaran pelunasan DP dilakukan maksimal 1 bulan setelah masuk kos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}