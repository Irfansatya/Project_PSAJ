import { createSignal, onMount } from "solid-js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  const [profileData, setProfileData] = createSignal({
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
    password: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = createSignal(
    localStorage.getItem("profileImage") || "/default-profile.png"
  );

  const [isEditing, setIsEditing] = createSignal(false);
  const [isAlertOpen, setIsAlertOpen] = createSignal(false);
  const [isSaveAlertOpen, setIsSaveAlertOpen] = createSignal(false);
  let fileInput!: HTMLInputElement;

  let originalProfileData = { ...profileData() }; // Simpan salinan data profil

  const selectImage = () => fileInput.click();

  const updateProfileImage = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return;

    const file = target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setProfileImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  onMount(() => {
    const savedProfile = localStorage.getItem("profileData");
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfileData(parsedProfile);
      originalProfileData = { ...parsedProfile }; // Simpan salinan data profil saat mount
    }
  });

  const toggleAlert = () => setIsAlertOpen(!isAlertOpen());
  const toggleSaveAlert = () => setIsSaveAlertOpen(!isSaveAlertOpen());

  const handleCancel = () => {
    if (isEditing()) {
      toggleAlert(); // Tampilkan alert konfirmasi
    } else {
      setIsEditing(false);
    }
  };

  const confirmCancel = () => {
    setProfileData(originalProfileData); // Kembalikan data ke salinan
    setIsEditing(false);
    toggleAlert(); // Tutup alert
  };

  return (
    <div class="p-6 px-10">
      <Navbar/>
      <div class="flex justify-between pt-10 items-center mb-6">
        <h1 class="font-bold">Pengaturan</h1>
        <div class="text-gray-500 text-sm">
          <span class="mr-2">Dashboard</span> /{" "}
          <span class="text-red-500 font-semibold">Pengaturan</span>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-6">
        <div class={`bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 border border-gray-300 flex flex-col items-center max-w-[350px] min-h-[500px] ${isEditing() ? "hidden" : ""}`}>
          <div class="relative w-56 h-56 mt-8 mb-5">
            <img src={profileImage()} alt="Profile" class="rounded-full w-full h-full object-cover border-4 border-white shadow-md" />
            <button onClick={selectImage} class="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md border">
              <img src="src/assets/edit-05.png" class="w-5 h-5" />
            </button>
            <input type="file" ref={fileInput} class="hidden" onChange={updateProfileImage} />
          </div>
          <p class="text-lg font-semibold mt-4">{profileData().nama}</p>
          <p class="text-gray-600 mb-6">{profileData().email}</p>
        </div>

        <div class={`bg-white rounded-lg shadow-lg flex-1 border border-gray-300 max-h-[400px] max-w-[700px] ${isEditing() ? "hidden" : ""}`}>
          <div class="flex justify-between items-center border-b-2 border-gray-400 mb -4">
            <h3 class="text-xl p-6 font-semibold">Informasi Profil</h3>
            <button class="flex items-center mr-6 bg-white text-black font-bold border border-gray-400 px-4 py-2 rounded-lg shadow hover:bg-[#FA4040] hover:text-white transition" onClick={() => setIsEditing(true)}>
              <img src="src/assets/edit-05.png" class="w-5 h-5 mr-2" />
              Edit
            </button>
          </div>
          <div class="space-y-4 p-6">
            {["nama", "email", "telepon", "alamat"].map((key) => (
              <div class="flex flex-col">
                <p class="font-bold">{key.charAt(0).toUpperCase() + key.slice(1)}:</p>
                <p>{profileData()[key]}</p>
              </div>
            ))}
          </div>
        </div>

        <div class={`bg-white rounded-lg shadow-lg flex-1 border border-gray-300 max-w-[1200px] p-6 ${isEditing() ? "" : "hidden"}`}>
          <div class="flex items-center mb-6">
            <div class="w-1 h-8 bg-red-500 mr-3"></div>
            <h3 class="text-2xl font-semibold">Edit Pelanggan</h3>
          </div>

          <div class="space-y-5">
            {[
              { label: "Nama Lengkap", key: "nama", type: "text" },
              { label: "Email", key: "email", type: "email" },
              { label: "Nomor Telepon", key: "telepon", type: "text" },
              { label: "Alamat", key: "alamat", type: "text" },
              { label: "Kata Sandi", key: "password", type: "password" },
              { label: "Konfirmasi Kata Sandi", key: "confirmPassword", type: "password" },
            ].map((field) => (
              <div class="grid grid-cols-3 gap-4 items-center">
                <label class="font-semibold">{field.label}</label>
                <input type={field.type} class="col-span-2 border border-gray-300 rounded-[8px] p-2 w-full" value={profileData()[field.key]} onInput={(e) => setProfileData({ ...profileData(), [field.key]: e.target.value })} />
              </div>
            ))}
          </div>

          <div class="flex justify-end mt-6 space-x-4">
            <button class="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition" onClick={handleCancel}>
              Batal
            </button>
            <button class="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition" onClick={toggleSaveAlert}>
              Simpan
            </button>
          </div>
        </div>
      </div>

      {isAlertOpen() && (
        <div class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative">
            <div class="flex justify-center">
                <div class="bg-red-600 p-4 rounded-full flex items-center justify-center w-20 h-20">
                <img src="src/assets/atlert.png" alt="Alert Icon" class="w-12 h-12" />
                </div>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mt-4">Batal!</h2>
            <p class="text-gray-600 mt-2">Semua data yang Anda masukkan tidak akan disimpan.</p>
            <div class="flex justify-center gap-4 mt-6">
                <button class="bg-gray-200 px-6 py-2 rounded-lg font-semibold text-gray-800 border border-gray-400 hover:bg-gray-300 transition" onClick={toggleAlert}>
                Batal
                </button>
                <button class="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition" onClick={confirmCancel}>
                Lanjut
                </button>
            </div>
            </div>
        </div>
        )}


      {isSaveAlertOpen() && (
        <div class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div class="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 class="text-xl font-bold text-green-600 mb-4">Data Berhasil Tersimpan!</h2>
            <div class="flex justify-center">
                <div class="bg-green-600 p-4 rounded-full flex items-center justify-center w-20 h-20">
                <img src="src/assets/checklist.png" alt="Alert Icon" class="w-12 h-12" />
                </div>
            </div>
            <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-4" onClick={() => { localStorage.setItem("profileData", JSON.stringify(profileData())); setIsEditing(false); toggleSaveAlert(); }}>Okay</button>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Profile;