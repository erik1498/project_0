import {BrowserRouter, Routes, Route} from "react-router-dom"
import Kategori from "./pages/kategori/Kategori"
import AddKategori from "./pages/kategori/AddKategori"
import EditKategori from "./pages/kategori/EditKategori"
import Akun from "./pages/akun/Akun"
import AddAkun from "./pages/akun/AddAkun"
import EditAkun from "./pages/akun/EditAkun"
import StatusTransaksi from "./pages/statusTransaksi/StatusTransaksi"
import AddStatusTransaksi from "./pages/statusTransaksi/AddStatusTransaksi"
import EditStatusTransaksi from "./pages/statusTransaksi/EditStatusTransaksi"
import Aset from "./pages/aset/Aset"
import AddAset from "./pages/aset/AddAset"
import EditAset from "./pages/aset/EditAset"
import Jabatan from "./pages/jabatan/Jabatan"
import AddJabatan from "./pages/jabatan/AddJabatan"
import EditJabatan from "./pages/jabatan/EditJabatan"
import KategoriJabatan from "./pages/kategoriJabatan/KategoriJabatan"
import AddKategoriJabatan from "./pages/kategoriJabatan/AddKategoriJabatan"
import EditKategoriJabatan from "./pages/kategoriJabatan/EditKategoriJabatan"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/kategori" element={<Kategori />} />
          <Route path="/kategori/add" element={<AddKategori/>} />
          <Route path="/kategori/edit/:id" element={<EditKategori/>} />
          <Route path="/akun" element={<Akun />} />
          <Route path="/akun/add" element={<AddAkun/>} />
          <Route path="/akun/edit/:id" element={<EditAkun/>} />
          <Route path="/status_transaksi" element={<StatusTransaksi />} />
          <Route path="/status_transaksi/add" element={<AddStatusTransaksi/>} />
          <Route path="/status_transaksi/edit/:id" element={<EditStatusTransaksi/>} />
          <Route path="/aset" element={<Aset />} />
          <Route path="/aset/add" element={<AddAset/>} />
          <Route path="/aset/edit/:id" element={<EditAset/>} />
          <Route path="/jabatan" element={<Jabatan />} />
          <Route path="/jabatan/add" element={<AddJabatan/>} />
          <Route path="/jabatan/edit/:id" element={<EditJabatan/>} />
          <Route path="/kategori_jabatan" element={<KategoriJabatan />} />
          <Route path="/kategori_jabatan/add" element={<AddKategoriJabatan/>} />
          <Route path="/kategori_jabatan/edit/:id" element={<EditKategoriJabatan/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
