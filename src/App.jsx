import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Jadwal from "./pages/Jadwal";
import Kegiatan from "./pages/Kegiatan";
import Donasi from "./pages/Donasi";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jadwal" element={<Jadwal />} />
          <Route path="/kegiatan" element={<Kegiatan />} />
          <Route path="/donasi" element={<Donasi />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
