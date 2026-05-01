import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Jadwal from "./pages/Jadwal";
import Kegiatan from "./pages/Kegiatan";
import Donasi from "./pages/Donasi";
import ImamJumat from "./pages/ImamJumat";
import Struktural from "./pages/Struktural";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jadwal" element={<Jadwal />} />
          <Route path="/kegiatan" element={<Kegiatan />} />
          <Route path="/donasi" element={<Donasi />} />
          <Route path="/imam-jumat" element={<ImamJumat />} />
          <Route path="/struktural" element={<Struktural />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
