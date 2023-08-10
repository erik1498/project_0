import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { FaPen, FaTrashAlt, FaPlus } from "react-icons/fa"

export default function KategoriJabatanList() {

    const [kategoriJabatan, setKategoriJabatan] = useState([])

    useEffect(() => {
        getKategoriJabatan();
    }, [])

    const getKategoriJabatan = async () => {
        const response = await axios.get("http://192.168.1.14:8000/api/kategori_jabatan")
        setKategoriJabatan(response.data.data)
    }

    const deleteKategoriJabatan = async (id) => {
        await axios.delete(`http://192.168.1.14:8000/api/kategori_jabatan/${id}`)
        getKategoriJabatan();
    }

    return <>
        <h1 className="title">Kategori Jabatan</h1>
        <h2 className="subtitle">Daftar Kategori Jabatan</h2>
        <Link to={"/kategori_jabatan/add"} className="button is-success mb-3"><FaPlus className="mr-2" /> Kategori Jabatan</Link>
        <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {
                    kategoriJabatan.map((data, i) => (
                        <tr key={data.id}>
                            <td>{i + 1}</td>
                            <td>{data.nama}</td>
                            <td>
                                <Link to={`/kategori_jabatan/edit/${data.id}`} className="button is-small is-info">
                                    <FaPen />
                                </Link>
                                <button className="button is-small is-danger" onClick={() => deleteKategoriJabatan(data.id)}>
                                    < FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </>
}