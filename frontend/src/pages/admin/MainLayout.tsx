import { JSX } from "solid-js";
import Sidebar from "../../components/Sidedbar";
import Navbar from "../../components/AdminNavbar";

const MainLayout = (props: { children: JSX.Element }) => {
  return (
    <div class="flex h-screen bg-gray-100">
      <Sidebar />
      <div class="flex-1 flex flex-col overflow-y-auto">
        <Navbar />
        <main class="p-6 overflow-auto">{props.children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
