import { createSignal, onMount } from "solid-js";

const Notifikasi = (props) => {
  const [notifications, setNotifications] = createSignal([]);

  // Mengambil notifikasi dari localStorage saat komponen dimuat
  onMount(() => {
    const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);
  });

  const removeNotification = (id) => {
    const updatedNotifications = notifications().filter((notif) => notif.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications)); // Simpan ke localStorage
  };

  return (
    <>
      {props.isOpen && (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white w-[400px] rounded-lg shadow-lg relative">
            {/* Header Notifikasi */}
            <div class="bg-[#F80000] text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
              <span class="text-lg font-semibold">Notifikasi</span>
            </div>

            {/* Konten Notifikasi dengan Scroll Selalu Ada */}
            <div class="p-4 text-center pb-16 relative max-h-[350px] overflow-y-scroll">
              {notifications().length > 0 ? (
                notifications().map((notif) => (
                  <div class="flex justify-between border-b pb-6 items-center mb-4">
                    <div class="flex items-center ">
                      <img src="src/assets/lonceng.png" alt="Notifikasi" class="w-12 h-auto mr-4" />
                      <div class="text-left">
                        <p class="font-semibold">{notif.title}</p>
                        <p class="text-gray-700">{notif.message}</p>
                        <a href="/nota" class="text-red-500 hover:underline">Lakukan pembayaran</a>
                      </div>
                    </div>
                    <button
                      class="text-red-500 hover:text-red-700  ml-4"
                      onClick={() => removeNotification(notif.id)}
                    >
                      Hapus
                    </button>
                  </div>
                ))
              ) : (
                <div>
                  <div class="mx-auto pt-10 rounded-full flex items-center justify-center">
                    <img src="src/assets/lonceng.png" alt="Notifikasi Kosong" class="w-44 h-44 opacity-50" />
                  </div>
                  <p class="text-gray-500 font-semibold mt-4">Tidak ada notifikasi</p>
                  <p class="text-gray-400 text-sm">Informasi terbaru akan ditampilkan di sini</p>
                </div>
              )}
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