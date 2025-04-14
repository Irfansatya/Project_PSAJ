import { Component } from 'solid-js';

const Nota: Component = () => {
  return (
    <div class="w-screen h-screen overflow-hidden bg-[#FFFFFF] flex items-center justify-center">
      <img
      src="src/assets/nota.jpg"
        alt="Nota Pembayaran"
        class="w-full h-full object-contain"
      />
    </div>
  );
};

export default Nota;
