import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { FaPen, FaTrashAlt, FaPlus } from "react-icons/fa"

export default function KategoriList() {

    const [kategori, setKategori] = useState([])

    useEffect(() => {
        getKategori();
    }, [])

    const getKategori = async () => {
        const response = await axios.get("http://192.168.1.14:8000/api/kategori")
        setKategori(response.data.data)
    }

    const deleteKategori = async (id) => {
        await axios.delete(`http://192.168.1.14:8000/api/kategori/${id}`)
        getKategori();
    }

    return <>
        <h1 className="title">Kategori</h1>
        <h2 className="subtitle">Daftar Kategori</h2>
        <Link to={"/kategori/add"} className="button is-success mb-3"><FaPlus className="mr-2" /> Kategori</Link>
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
                    kategori.map((data, i) => (
                        <tr key={data.id}>
                            <td>{i + 1}</td>
                            <td>{data.nama}</td>
                            <td>
                                <Link to={`/kategori/edit/${data.id}`} className="button is-small is-info">
                                    <FaPen />
                                </Link>
                                <button className="button is-small is-danger" onClick={() => deleteKategori(data.id)}>
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