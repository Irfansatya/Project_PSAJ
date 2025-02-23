import { createSignal } from "solid-js";

const Auth = (props) => {
  const [showLoginPassword, setShowLoginPassword] = createSignal(false);
  const [showRegisterPassword, setShowRegisterPassword] = createSignal(false);
  const [showConfirmPassword, setShowConfirmPassword] = createSignal(false);
  const [isRegister, setIsRegister] = createSignal(false);
  const [userType, setUserType] = createSignal(null);
  const [loginEmail, setLoginEmail] = createSignal("");
  const [registerEmail, setRegisterEmail] = createSignal("");
  const [loginPassword, setLoginPassword] = createSignal("");
  const [registerPassword, setRegisterPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [rememberMe, setRememberMe] = createSignal(false);


  const handleLogin = () => {
    console.log("Login dengan", loginEmail(), loginPassword());
  
    // Simulasi user login sukses (karena belum ada backend)
    const userData = {
      email: loginEmail(),
      name: "User Demo", // Bisa diganti sesuai backend nanti
    };
  
    // Simpan ke localStorage
    localStorage.setItem("user", JSON.stringify(userData));
  
    // Panggil function dari Navbar agar state user berubah
    if (props.onLoginSuccess) {
      props.onLoginSuccess(userData);
    }
  
    // Tutup modal setelah login sukses
    props.onClose();
  };

  const handleRegister = () => {
    if (registerPassword() !== confirmPassword()) {
      alert("Password tidak cocok!");
      return;
    }
  
    console.log("Registrasi dengan", registerEmail(), registerPassword());
  
    // Simpan email yang baru didaftarkan ke localStorage (opsional)
    localStorage.setItem("registeredEmail", registerEmail());
  
    // Setelah register, alihkan ke mode login
    setIsRegister(false);
    setLoginEmail(registerEmail()); // Isi otomatis email di form login
  };
  

  return (
    <div
      class={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity ${
        props.isOpen() ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {!userType() ? (
        <div class="bg-white p-6 rounded-lg shadow-md w-96 border border-gray-300 relative">
          <button class="absolute top-3 right-3 text-xl font-bold" onClick={props.onClose}>✖</button>
          <h2 class="text-2xl font-semibold text-center mb-8">Masuk ke <span class="text-red-500">jagoanKos</span></h2>
          <p class="mb-2">Masuk sebagai...</p>
          <div class="flex flex-col gap-3">
            <button class="w-full flex items-center gap-3 p-3 border rounded-lg  bg-white transition-colors duration-300 hover:bg-[#FA4040] cursor-pointer" onClick={() => setUserType("pencari")}>
              <img src="src/assets/pencarikos.png" class="w-16 h-auto" />
              <span>Pencari Kos</span>
            </button>
            <button class="w-full flex items-center gap-3 p-3 border rounded-lg bg-white transition-colors duration-300 hover:bg-[#FA4040] cursor-pointer" onClick={() => setUserType("pemilik")}>
              <img src="src/assets/pemilikkos.png" class="w-16 h-auto" />
              <span>Pemilik Kos</span>
            </button>
          </div>
        </div>
      ) : (
        <div class="bg-white p-6 rounded-lg shadow-md w-96 border border-gray-300 relative">
          <button class="absolute top-3 right-3 text-xl font-bold" onClick={props.onClose}>✖</button>
          <div class="flex justify-center mb-4">
            <img src="src/assets/logoJK.png" alt="Logo" class="w-24 h-auto" />
          </div>
          <h2 class="text-2xl font-semibold text-center mb-4">
            {isRegister() ? "Buat Akun Baru" : "Masukan Akun Anda"}
          </h2>

          {isRegister() && (
            <div class="flex gap-2 mb-3">
              <input type="text" placeholder="Nama Depan" class="w-1/2 px-3 py-2 border rounded bg-[#EAEFFA]" />
              <input type="text" placeholder="Nama Akhir" class="w-1/2 px-3 py-2 border rounded bg-[#EAEFFA]" />
            </div>
          )}

          <div class="mb-3">
            <input 
              type="email" 
              placeholder="Masukkan Email Anda" 
              class="w-full px-3 py-2 border rounded bg-[#EAEFFA]" 
              value={isRegister() ? registerEmail() : loginEmail()}
              onInput={(e) => isRegister() ? setRegisterEmail(e.target.value) : setLoginEmail(e.target.value)}
            />
          </div>

          {!isRegister() && (
            <div class="mb-3">
              <input 
                type="password" 
                placeholder="Masukkan Password Anda" 
                class="w-full px-3 py-2 border rounded bg-[#EAEFFA]"
                value={loginPassword()}
                onInput={(e) => setLoginPassword(e.target.value)}
              />
              <div class="text-right mt-1">
                <a href="#" class="text-[#F80000] hover:text-[#FA4040] transition-colors duration-300 text-sm font-semibold">Lupa Password?</a>
              </div>
            </div>
          )}

          {isRegister() && (
            <>
              <div class="mb-3">
                <input 
                  type="password" 
                  placeholder="Masukkan Password Anda" 
                  class="w-full px-3 py-2 border rounded bg-[#EAEFFA]"
                  value={registerPassword()}
                  onInput={(e) => setRegisterPassword(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <input 
                  type="password" 
                  placeholder="Konfirmasi Password" 
                  class="w-full px-3 py-2 border rounded bg-[#EAEFFA]"
                  value={confirmPassword()}
                  onInput={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </>
          )}

          <button 
            class="w-full bg-[#F80000] hover:bg-[#FA4040] transition-colors duration-300 text-white py-2 rounded-md text-lg font-semibold mb-3"
            onClick={isRegister() ? handleRegister : handleLogin}
          >
            {isRegister() ? "Daftar" : "Confirm"}
          </button>

          <button class="w-full flex items-center justify-center gap-2 border py-2 rounded-md bg-[#EAEFFA]">
            <img src="src/assets/google (2).png" class="w-5 h-5" />
            Lanjutkan dengan Google
          </button>

          <p class="text-xs text-center mt-3 text-gray-600">
            Dengan melanjutkan, anda menyetujui <span class="font-semibold">Kebijakan Privasi</span> dan <span class="font-semibold">Syarat & Ketentuan</span> yang berlaku di Monitor.
          </p>

          <p class="text-sm text-center mt-3">
            {isRegister() ? "Sudah punya akun? " : "Belum punya akun? "}
            <a href="#" class="text-[#F80000] hover:text-[#FA4040] transition-colors duration-300 font-semibold" onClick={() => setIsRegister(!isRegister())}>
              {isRegister() ? "Login" : "Daftar"}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Auth;
