import { createSignal, onMount } from "solid-js";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const Navbar = () => {
  const [notifOpen, setNotifOpen] = createSignal(false);
  const [dropdownOpen, setDropdownOpen] = createSignal(false);
  const [showDatePicker, setShowDatePicker] = createSignal(false);

  const toggleNotif = () => {
    setNotifOpen(!notifOpen());
    setDropdownOpen(false);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker());
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen());
    setNotifOpen(false);
  };

  const [notifications, setNotifications] = createSignal([
    {
      id: 1,
      title: "Pembayaran Belum Selesai",
      message: "Segera lakukan pembayaran untuk kamar A12.",
    },
  ]);

  const removeNotification = (id) => {
    setNotifications(notifications().filter((n) => n.id !== id));
  };

  let calendarRef;

  onMount(() => {
    flatpickr(calendarRef, {
      inline: true,
      defaultDate: new Date(),
    });
  });

  return (
    <div class="flex items-center justify-between px-6 py-4 bg-[#F1F2FA] relative">
      {/* Search */}
      <div class="relative w-[350px]">
        <input
          type="text"
          placeholder="Cari data disini.."
          class="w-full py-2 pl-10 pr-4 rounded-lg bg-white shadow text-sm"
        />
        <img src="/search.png" class="w-4 absolute left-3 top-2.5 opacity-60" />
      </div>

      {/* Icons + Profile */}
      <div class="flex items-center space-x-5">
        {/* Tanggal */}
        <div class="relative">
          <button onClick={toggleDatePicker}>
            <img src="/calendar.png" alt="calendar" class="w-5" />
          </button>
          {showDatePicker() && (
            <div class="absolute right-0 mt-2 z-50 bg-white rounded-xl shadow-lg p-4">
              <div ref={calendarRef}></div>
            </div>
          )}
        </div>

        {/* Notifikasi */}
        <div class="relative">
          <button onClick={toggleNotif}>
            <img src="/notif.png" alt="notif" class="w-5" />
          </button>

          {notifOpen() && (
            <div class="absolute right-0 mt-2 bg-white w-[350px] rounded-lg shadow-lg z-50">
              <div class="border-b px-5 py-3 font-semibold flex items-center">
                <img src="/notif.png" class="w-5 mr-2" />
                Notifikasi ({notifications().length})
              </div>

              <div class="max-h-[300px] overflow-y-auto p-4">
                {notifications().length > 0 ? (
                  notifications().map((notif) => (
                    <div class="border-b pb-3 mb-3">
                      <p class="font-semibold">{notif.title}</p>
                      <p class="text-sm text-gray-600">{notif.message}</p>
                      <button
                        onClick={() => removeNotification(notif.id)}
                        class="text-red-600 hover:underline text-sm mt-1"
                      >
                        Hapus
                      </button>
                    </div>
                  ))
                ) : (
                  <div class="text-center text-gray-500 py-8">
                    <img src="/notif.png" class="w-16 mx-auto opacity-40" />
                    <p class="mt-2 font-medium">Tidak ada notifikasi</p>
                    <p class="text-xs text-gray-400">Informasi terbaru akan muncul di sini</p>
                  </div>
                )}
              </div>

              <div class="p-2 border-t text-left text-sm">
                <button onClick={toggleNotif} class="hover:underline text-gray-600">
                  ✕ Tutup
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Avatar + Nama */}
        <div class="relative">
          <div
            class={`flex items-center space-x-2 cursor-pointer hover:text-red-600 transition`}
            onClick={toggleDropdown}
          >
            <div class="w-9 h-9 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold text-lg">
              S
            </div>
            <div class="text-sm">
              <p class="font-medium flex items-center">
                Irfan Satya
                <svg
                  class={`w-4 h-4 ml-1 transform transition-transform duration-300 ${
                    dropdownOpen() ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </p>
              <p class="text-gray-500 text-xs">Owner</p>
            </div>
          </div>

          {dropdownOpen() && (
            <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
              <a href="/profile" class="block px-4 py-2 hover:bg-red-100 text-sm">
                Profile Saya
              </a>
              <a
                href="/logout"
                class="block px-4 py-2 hover:bg-red-100 text-sm text-red-600 font-semibold"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
