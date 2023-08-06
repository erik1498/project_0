import KategoriAddModal from '../components/kategori/KategoriAddModal'
import { useState, useEffect } from 'react'
import KategoriListItem from '../components/kategori/KategoriListItem'
import KategoriUpdateModal from '../components/kategori/KategoriUpdateModal'
import axios from 'axios'

export default function Kategori(){

    const [modalAddHide, setModalAddHide] = useState(true)
    const [modalUpdateHide, setModalUpdateHide] = useState(true)
    const [kategoriListData, setKategoriListData] = useState([])
    const [kategoriData, setKategoriData] = useState([])

    const showModalAdd = () => {
        setModalAddHide(false)
    }

    const hideModalAdd = () => {
        setModalAddHide(true)
    }

    const showModalUpdate = () => {
        setModalUpdateHide(false)
    }

    const hideModalUpdate = () => {
        setModalUpdateHide(true)
    }

    const getKategoriListData = () => {
        axios.get("http://192.168.1.3:8000/api/kategori").then((res) => {
            setKategoriListData(res.data.data)
        })
    }

    useEffect(() => {
            getKategoriListData()
    }, [])
    

    return <>
        <KategoriAddModal hide={modalAddHide} hideModalAdd={hideModalAdd} />
        <KategoriUpdateModal hide={modalUpdateHide} hideModalUpdate={hideModalUpdate} data={kategoriData} />
        <h1>Kategori</h1>
        <p>Manage semua data kategori</p>
        <button className="btn btn-primary mt-3" onClick={showModalAdd}>Tambah Kategori</button>
        <div className="d-flex mt-3">
            <input type="text" placeholder='Cari Kategori' />
        </div>
        <table cellPadding={0} cellSpacing={0} width={"100%"} className={"mt-3"}>
            <thead>
                <tr>
                    <td>No</td>
                    <td>Nama</td>
                    <td>Aksi</td>
                </tr>
            </thead>
            <tbody>
                {
                    kategoriListData.map((data, i) => {
                        return <KategoriListItem data={data} number={i} key={i} showModalUpdate={showModalUpdate} getKategoriListData={getKategoriListData} setKategoriData={setKategoriData} />
                    })
                }
            </tbody>
        </table>
        <div className={"mt-3"}>
            <label>Size : </label>
            <select>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="All">All</option>
            </select>
        </div>
        <div>
            <label>Page Number : </label>
            <select>
                <option value="1">1</option>
            </select>
        </div>
    </>
}