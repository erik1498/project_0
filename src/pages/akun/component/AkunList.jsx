import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { FaPen, FaTrashAlt, FaPlus } from "react-icons/fa"

export default function AkunList() {

    const [akun, setAkun] = useState([])

    useEffect(() => {
        getAkun();
    }, [])

    const getAkun = async () => {
        const response = await axios.get("http://192.168.1.14:8000/api/akun")
        setAkun(response.data.data)
    }

    const deleteAkun = async (id) => {
        await axios.delete(`http://192.168.1.14:8000/api/akun/${id}`)
        getAkun();
    }

    return <>
        <h1 className="title">Akun</h1>
        <h2 className="subtitle">Daftar Akun</h2>
        <Link to={"/akun/add"} className="button is-success mb-3"><FaPlus className="mr-2" /> Akun</Link>
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
                    akun.map((data, i) => (
                        <tr key={data.id}>
                            <td>{i + 1}</td>
                            <td>{data.nama}</td>
                            <td>
                                <Link to={`/akun/edit/${data.id}`} className="button is-small is-info">
                                    <FaPen />
                                </Link>
                                <button className="button is-small is-danger" onClick={() => deleteAkun(data.id)}>
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