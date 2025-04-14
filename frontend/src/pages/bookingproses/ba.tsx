import { createSignal } from "solid-js";
import { onCleanup } from "solid-js";
import { useNavigate } from "@solidjs/router"; // Kalau kamu pakai routing
import Navbar from "../../components/Navbar";
import Notifikasi from "../../components/Notifikasi";

export default function BookingProses() {
  const [showNotifikasi, setShowNotifikasi] = createSignal(false);
  const navigate = useNavigate(); // untuk pindah halaman secara programatik

  const handleClick = () => {
    setTimeout(() => {
      navigate("/"); // Redirect ke halaman utama setelah 1.5 detik
    },1500); // Bisa kamu atur delay-nya sesuai kebutuhan
  };

  return (
    <div class="flex flex-col items-center justify-center h-screen text-center px-4">
      <Navbar />
      <div class="relative flex justify-center items-center mb-6">
        <div class="w-52 h-auto flex justify-center items-center">
          <img src="@/assets/JK.png" alt="" />
        </div>
      </div>
      <h2 class="text-lg font-semibold mb-2">Permintaan booking di proses</h2>
      <p class="text-gray-500 mb-6 max-w-xs">
        Permintaan kamu telah diteruskan ke pemilik kos. Silahkan menunggu konfirmasi selanjutnya.
      </p>
      <button
        onClick={handleClick}
        class="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700"
      >
        Kembali Ke Dashboard
      </button>

      {/* Komponen Notifikasi */}
      <Notifikasi
        isOpen={showNotifikasi()}
        onClose={() => setShowNotifikasi(false)}
      />
    </div>
  );
}
