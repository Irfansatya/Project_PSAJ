const Sidebar = () => {
    return (
      <aside class="w-64 bg-white shadow-lg p-4 flex flex-col">
        <div class="flex items-center mb-6">
          <img src="src\assets\logoJK.png" alt="Logo JagoanKos" class="w-20 h-auto" />
          <h1 class="text-xl font-bold text-red-600">JagoanKos</h1>
        </div>
  
        <nav class="space-y-2">
          <a
            href="/dashboard"
            class="flex items-center gap-3 p-2 rounded hover:bg-red-100 hover:text-red-600"
          >
            <img src="src/assets/category-2.png" alt="icon" class="w-5 h-5" />
            Dashboard
          </a>
          <a
            href="/DataKamarr"
            class="flex items-center gap-3 p-2 rounded hover:bg-red-100 hover:text-red-600"
          >
            <img src="src/assets/document.png" alt="icon" class="w-5 h-5" />
            Data Kamar
          </a>
          <a
            href="/Pengaturan"
            class="flex items-center gap-3 p-2 rounded hover:bg-red-100 hover:text-red-600"
          >
            <img src="src/assets/setting-22.png" alt="icon" class="w-5 h-5" />
            Pengaturan
          </a>
          <a
            href="/Keluar"
            class="flex items-center gap-3 p-2 rounded hover:bg-red-100 hover:text-red-600"
          >
            <img src="src/assets/logout.png" alt="icon" class="w-5 h-5" />
            Keluar
          </a>
        </nav>
      </aside>
    );
  };
  
  export default Sidebar;
  