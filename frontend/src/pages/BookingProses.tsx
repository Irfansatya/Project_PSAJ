import { createSignal } from "solid-js";
import Navbar from "../components/Navbar";

export default function BookingProses() {
  return (
    <div class="flex flex-col items-center justify-center h-screen text-center px-4">
        <Navbar/>
      <div class="relative flex justify-center items-center mb-6">
        <div class="w-52 h-auto flex justify-center items-center">
            <img src="src/assets/plane.png" alt="" />
        </div>
      </div>
      <h2 class="text-lg font-semibold mb-2">Permintaan booking di proses</h2>
      <p class="text-gray-500 mb-6 max-w-xs">
        Permintaan kamu telah diteruskan ke pemilik kos. Silahkan menunggu konfirmasi selanjutnya.
      </p>
      <a href="nota.sfx" class="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700">
        Lihat daftar booking
      </a>
    </div>
  );
}
