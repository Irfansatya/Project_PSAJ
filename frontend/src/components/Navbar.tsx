import { createSignal, onMount } from "solid-js";
import Login from "./Auth";
import Notifikasi from "./Notifikasi"; // Import Notifikasi

const ContactModal = (props) => {
  const [selectedMessage, setSelectedMessage] = createSignal("");
  const phoneNumber = "6289620753988";

  const sendMessage = () => {
    console.log("Selected Message:", selectedMessage());
    if (!selectedMessage()) return;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(selectedMessage())}`;
    window.open(url, "_blank");
    props.onClose();
  };

  return (
    <div class={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${props.isOpen ? '' : 'hidden'}`}>
      <div class="bg-white p-6 rounded-lg w-[500px]">
        <h1 class="text-2xl pl-6 py-6 text-black font-semibold">Hubungi kos</h1>
        <div class="bg-red-100 text-black text-xs p-4 my-2 rounded text-center">
          Anda akan terhubung dengan pemilik langsung melalui chatroom
        </div>
        <div>
          <p class="mb-2 pl-6 pt-6 font-medium text-black">Pilih pertanyaan</p>
          <div class="space-y-2 py-6 pl-6">
            {["Boleh saya tanya tanya?", "Cara menghubungi pemilik?", "Boleh bawa hewan?", "Masih ada kamar?", "Menanyakan seputar fasilitas kos?"].map((msg) => (
              <label class="flex items-center space-x-2 cursor-pointer font-medium transition-colors duration-300 hover:text-[#F80000]">
                <input type="radio" name="question" value={msg} onInput={(e) => setSelectedMessage(e.target.value)} />
                <span class="">{msg}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          class="w-full mt-4 bg-[#F80000] hover:bg-[#FA4040] transition-all duration-300 text-white py-2 rounded-md"
          onClick={sendMessage}
        >
          Kirim
        </button>
        <button class="mt-2 text-gray-600 block w-full py-2 text-center transition-all duration-300 hover:border rounded-md" onClick={props.onClose}>Batal</button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [showCariApa, setShowCariApa] = createSignal(false);
  const [isLoginOpen, setIsLoginOpen] = createSignal(false); // State untuk modal login
  const [isNotifOpen, setIsNotifOpen] = createSignal(false); // State untuk modal notifikasi
  const [isModalOpen, setIsModalOpen] = createSignal(false);
  const [user, setUser] = createSignal(null);
  const [profileImage, setProfileImage] = createSignal(
    localStorage.getItem("profileImage") || "src/assets/image-15.png"
  );
  const [showProfileDropdown, setShowProfileDropdown] = createSignal(false); // State untuk dropdown profil
  const phoneNumber = "6289620753988";
  const message = "Hai, Saya ingin menanyakan sesuatu!";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  // Ambil data user dari localStorage saat komponen dimuat
  onMount(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  });

  // Function untuk menangani login sukses
  const handleLoginSuccess = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // Update state user
    setIsLoginOpen(false); // Tutup modal login
  };

  // Function untuk logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Hapus user dari localStorage
    localStorage.removeItem("profileImage"); // Hapus gambar profil jika ada
    setUser(null); // Reset state user
    setShowProfileDropdown(false); // Tutup dropdown
    location.reload(); // Refresh halaman
  };

  return (
    <>
      <nav class="flex items-center justify-between px-6 py-2 border border-gray-200 shadow-md bg-white fixed top-0 left-0 w-full z-50">
        {/* Logo */}
        <div class="flex items-center gap-2">
          <img src="src/assets/logoJK.png" alt="Logo" class="w-[65px] h-auto" />
          <span class="font-medium text-lg text-[#F80000]">jagoanKos</span>
        </div>

        {/* Menu dan Tombol Login */}
        <div class="flex items-center gap-10">
          {/* Cari Apa Dropdown */}
          <div class="relative">
            <button
              class="font-medium transition-colors duration-300 hover:text-[#F80000] flex items-center gap-1"
              onClick={() => setShowCariApa(!showCariApa())}
            >
              Cari Apa?
              <span
                class={`transition-transform duration-500 text-[10px] ${
                  showCariApa() ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            <div
              class={`absolute bg-white border rounded-md shadow-md mt-1 w-[160px] transition-all duration-300 ${
                showCariApa()
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <ul>
                <li
                  class="flex items-center gap-2 px-4 py-2 transition-colors duration-300 hover:bg-[#FFE8E8] cursor-pointer"
                  onClick={() => setShowCariApa(false)}
                >
                  <img src="src/assets/bed.png" alt="kasur" class="w-5 h-5" />
                  <a href="/kamar-a" class="w-full text-left">
                    Tipe Kamar A
                  </a>
                </li>
                <li
                  class="flex items-center gap-2 px-4 py-2 transition-colors duration-300 hover:bg-[#FFE8E8] cursor-pointer"
                  onClick={() => setShowCariApa(false)}
                >
                  <img src="src/assets/bed.png" alt="kasur" class="w-5 h-5" />
                  <a href="/kamar-b" class="w-full text-left">
                    Tipe Kamar B
                  </a>
                </li>
                <li
                  class="flex items-center gap-2 px-4 py-2 transition-colors duration-300 hover:bg-[#FFE8E8] cursor-pointer"
                  onClick={() => setShowCariApa(false)}
                >
                  <img src="src/assets/bed.png" alt="kasur" class="w-5 h-5" />
                  <a href="/kamar-c" class="w-full text-left">
                    Tipe Kamar C
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Menu Utama */}
          <button
            class="font-medium transition-colors duration-300 hover:text-[#F80000]"
            onClick={() => setIsNotifOpen(true)}
          >
            Notifikasi
          </button>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.google.com/maps/place/Jagoan+Kos/"
            class="font-medium transition-colors duration-300 hover:text-[#F80000]"
          >
            Lokasi Kos
          </a>
          <a class="">
            {" "}
            <button
        class="font-medium transition-colors duration-300 hover:text-[#F80000]"
          onClick={() => setIsModalOpen(true)}
        >
          Hubungi Kami
        </button>
        <ContactModal isOpen={isModalOpen()} onClose={() => setIsModalOpen(false)} />
          </a>

          {/* Ganti Tombol Login dengan Gambar Profil Jika Sudah Login */}
          {user() ? (
            <div class="relative">
              <button
                class="flex items-center gap-2 mr-10 transition-colors duration-300 hover:text-[#F80000]"
                onClick={() => setShowProfileDropdown(!showProfileDropdown())}
              >
                <img
                  src={profileImage()}
                  alt="Profile"
                  class="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                />
                <span
                  class={`transition-transform duration-500 text-[10px] ${
                    showProfileDropdown() ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Dropdown Profil */}
              <div
                class={`absolute right-0 mt-2 w-[160px] bg-white border border-gray-200 rounded-md shadow-md transition-all duration-300 ${
                  showProfileDropdown()
                    ? "opacity-100 max-h-40"
                    : "opacity-0 max-h-0 overflow-hidden"
                }`}
              >
                <ul class="text-sm">
                  <li
                    class="flex items-center gap-2 px-4 py-2 transition-colors duration-300 hover:bg-[#FFE8E8] cursor-pointer"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <img
                      src="src/assets/setting-2.png"
                      alt="Pengaturan"
                      class="w-5 h-5"
                    />
                    <a href="/profile" class="block w-full">
                      Pengaturan
                    </a>
                  </li>
                  <li
                    class="flex items-center gap-2 px-4 py-2 transition-colors duration-300 hover:bg-[#FFE8E8] cursor-pointer"
                    onClick={handleLogout}
                  >
                    <img
                      src="src/assets/logout.png"
                      alt="Keluar"
                      class="w-5 h-5"
                    />
                    <span>Keluar</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <button
              class="border-2 border-[#F80000] text-[#F80000] font-medium py-2 px-4 rounded-md transition-colors duration-300 hover:bg-[#f80000] hover:text-white hover:border-[#f80000]"
              onClick={() => setIsLoginOpen(true)}
            >
              Masuk
            </button>
          )}
        </div>
      </nav>

      {/* Modal Notifikasi */}
      <Notifikasi
        isOpen={isNotifOpen()}
        onClose={() => setIsNotifOpen(false)}
      />

      {/* Modal Login */}
      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Navbar;
