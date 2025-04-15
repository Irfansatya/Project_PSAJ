import { createSignal } from "solid-js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const Home = () => {
  const rooms = [
    {
      id: 1,
      type: "A",
      roomNumber: "1",
      status: "Sisa 1 kamar",
      image: "src/assets/kamar1.png",
      price: "Rp 1.500.000",
      facilities: ["Kamar Mandi Dalam", "AC", "Kasur", "Lemari"],
      link: "kamar1",
    },
    {
      id: 2,
      type: "B",
      roomNumber: "2",
      status: "Kamar penuh",
      image: "src/assets/kamar2.png",
      price: "Rp 1.700.000",
      facilities: ["Kamar Mandi Dalam", "Water Heater", "Meja Belajar", "WiFi"],
      link: "kamar1",
    },
    {
      id: 3,
      type: "C",
      roomNumber: "3",
      status: "Sisa 1 kamar",
      image: "src/assets/kamar3.png",
      price: "Rp 1.800.000",
      facilities: ["Kamar Mandi Dalam", "AC", "TV", "Dapur Mini"],
      link: "kamar1",
    },
    {
      id: 4,
      type: "D",
      roomNumber: "4",
      status: "Sisa 1 kamar",
      image: "src/assets/kamar4.png",
      price: "Rp 1.600.000",
      facilities: ["Kamar Mandi Dalam", "Kipas Angin", "Meja Belajar", "CCTV 24 Jam"],
      link: "kamar1",
    },
    // {
    //   id: 5,
    //   type: "E",
    //   roomNumber: "5",
    //   status: "Sisa 1 kamar",
    //   image: "src/assets/kamar5.png",
    //   price: "Rp 2.000.000",
    //   facilities: ["Kamar Mandi Dalam", "AC", "Spring Bed", "Balkon Pribadi"],
    //   link: "/pages/kamar5",
    // },
  ];

  return (
    <div class="bg-gray-100 min-h-screen p-6">
        <Navbar />
      <div class="max-w-7xl mt-20 mx-auto">
        <div class="flex items-start gap-6 mb-6">
          {/* Text Section */}
          <div class="w-1/2">
            <h1 class="text-3xl font-bold">Cari Fasilitas Kamar Yang Kamu Mau!</h1>
            <p class="text-gray-600 mb-4">Kami akan tampilkan tipe kamar yang sesuai dengan pencarianmu.</p>
            {/* Search Bar */}
            <div class="flex w-full border rounded-lg overflow-hidden">
              <input type="text" placeholder="Search..." class="w-full p-3 outline-none" />
              <button class="bg-[#f80000] text-white font-medium px-6 py-3 hover:bg-[#FA4040] transition-colors duration-300">
                Cari
              </button>
            </div>
          </div>
          {/* Maps Section */}
          <div class="relative w-1/2">
            <img src="src/assets/maps.png" alt="Lokasi Kos" class="w-full h-auto rounded-lg" />
            <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/Jagoan+Kos/@-7.4331518,109.245757,17z/data=!3m1!4b1!4m6!3m5!1s0x2e655fa0d36d2cb9:0x31db3864f56d0cb8!8m2!3d-7.4331571!4d109.2483319!16s%2Fg%2F11hzyn8phv?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"><button class="absolute bottom-16 right-9 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300">
              Lihat →
            </button></a>
          </div>
        </div>

        {/* Kamar List */}
        <div class="grid grid-cols-4 gap-6">
          {rooms.map((room) => (
            <a href={room.link} class="block h-full">
              <div class="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 h-full flex flex-col">
                <img src={room.image} alt={`Kamar Kos ${room.type}`} class="w-full h-56 object-cover" />
                <div class="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <span class={`text-xs font-medium px-2 py-1 rounded-full ${room.status.includes("penuh") ? 'bg-[#FFE8E8] text-[#f80000]' : 'bg-white border text-gray-400'}`}>
                      {room.status}
                    </span>
                    <h2 class="font-bold text-lg mt-2">Kamar Kos Tipe {room.type} - Kamar {room.roomNumber}</h2>
                    <p class="text-gray-600 text-sm">{room.facilities.join(", ")}</p>
                  </div>
                  <p class="font-semibold mt-2">{room.price} <span class="text-gray-500 text-sm">(Per 6 Bulan)</span></p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
