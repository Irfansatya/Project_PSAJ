import { createSignal } from "solid-js";

const Notifikasi = (props: { isOpen: boolean; onClose: () => void }) => {
  return (
    <>
      {props.isOpen && (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white w-[400px] rounded-lg shadow-lg relative">
            {/* Header Notifikasi */}
            <div class="bg-[#F80000] text-white px-6 py-6 rounded-t-lg flex justify-between items-center">
              <span class="text-lg font-semibold">Notifikasi</span>
            </div>

            {/* Konten Notifikasi dengan Scroll Selalu Ada */}
            <div class="p-6 text-center pb-16 relative max-h-[350px] overflow-y-scroll">
              <button class="absolute top-0 left-4 bg-white text-black text-sm border-black px-3 ml-3 mt-6 py-1 rounded-full border">
                ⓘ Utama
              </button>
              <div class="mx-auto pt-10 rounded-full flex items-center justify-center">
                <img src="src/assets/lonceng.png" alt="Notifikasi Kosong" class="w-44 h-44 opacity-50" />
              </div>
              <p class="text-gray-500 font-semibold mt-4">Tidak ada notifikasi</p>
              <p class="text-gray-400 text-sm">Informasi terbaru akan ditampilkan di sini</p>
            </div>

            {/* Tombol Tutup */}
            <div class="p-3 border-t flex justify-start">
              <button
                class="mx-2 px-[5px] text-gray-700 border border-gray-700 text-sm font-semibold rounded-full hover:bg-gray-200 transition"
                onClick={props.onClose}
              >
                ✕
              </button>
              Tutup
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notifikasi;
