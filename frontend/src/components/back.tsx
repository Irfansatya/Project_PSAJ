import { useNavigate } from "@solidjs/router";

export default function KembaliButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <button 
      class="flex items-center mb-4 bg-[#F80000] hover:bg-[#FA4040] text-white p-2 rounded-lg pr-3 transition"
      onClick={handleBack}
    >
      <i class="fas fa-chevron-left text-xl"></i>
      <span class="text-xl font-semibold ml-2">Kembali</span>
    </button>
  );
}