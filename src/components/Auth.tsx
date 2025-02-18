import { createSignal } from "solid-js";

const Auth = (props) => {
  const [showLoginPassword, setShowLoginPassword] = createSignal(false);
  const [showRegisterPassword, setShowRegisterPassword] = createSignal(false);
  const [showConfirmPassword, setShowConfirmPassword] = createSignal(false);
  const [isRegister, setIsRegister] = createSignal(false);
  const [userType, setUserType] = createSignal(null);
  const [loginEmail, setLoginEmail] = createSignal("");
  const [registerEmail, setRegisterEmail] = createSignal("");

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
            <button class="w-full flex items-center gap-3 p-3 border rounded-lg bg-white hover:bg-[#FA4040] cursor-pointer" onClick={() => setUserType("pencari")}> 
              <img src="src/assets/pencarikos.png" class="w-16 h-auto" />
              <span>Pencari Kos</span>
            </button>
            <button class="w-full flex items-center gap-3 p-3 border rounded-lg bg-white hover:bg-[#FA4040] cursor-pointer" onClick={() => setUserType("pemilik")}> 
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
              <div class="relative">
                <input 
                  type={showLoginPassword() ? "text" : "password"} 
                  placeholder="Masukkan Password Anda" 
                  class="w-full px-3 py-2 border rounded bg-[#EAEFFA] pr-10" 
                />
                <button type="button" class="absolute right-3 top-2 text-gray-500" onClick={() => setShowLoginPassword(!showLoginPassword())}>
                  <img src={showLoginPassword() ? "src/assets/eye.png" : "src/assets/eye-slash.png"} class="w-5 h-5" />
                </button>
              </div>
              <div class="text-right mt-1">
                <a href="#" class="text-[#F80000] hover:text-[#FA4040] text-sm font-semibold">Lupa Password?</a>
              </div>
            </div>
          )}

          {isRegister() && (
            <>
              <div class="mb-3 relative">
                <input 
                  type={showRegisterPassword() ? "text" : "password"} 
                  placeholder="Masukkan Password Anda" 
                  class="w-full px-3 py-2 border rounded bg-[#EAEFFA] pr-10" 
                />
                <button type="button" class="absolute right-3 top-2 text-gray-500" onClick={() => setShowRegisterPassword(!showRegisterPassword())}>
                  <img src={showRegisterPassword() ? "src/assets/eye.png" : "src/assets/eye-slash.png"} class="w-5 h-5" />
                </button>
              </div>
              <div class="mb-3 relative">
                <input 
                  type={showConfirmPassword() ? "text" : "password"} 
                  placeholder="Konfirmasi Password" 
                  class="w-full px-3 py-2 border rounded bg-[#EAEFFA] pr-10" 
                />
                <button type="button" class="absolute right-3 top-2 text-gray-500" onClick={() => setShowConfirmPassword(!showConfirmPassword())}>
                  <img src={showConfirmPassword() ? "src/assets/eye.png" : "src/assets/eye-slash.png"} class="w-5 h-5" />
                </button>
              </div>
            </>
          )}

          <button class="w-full bg-[#F80000] hover:bg-[#FA4040] text-white py-2 rounded-md text-lg font-semibold mb-3">
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
            <a href="#" class="text-[#F80000] hover:text-[#FA4040] font-semibold" onClick={() => setIsRegister(!isRegister())}>
              {isRegister() ? "Login" : "Daftar"}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Auth;
