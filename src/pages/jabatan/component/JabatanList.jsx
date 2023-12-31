import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { FaPen, FaTrashAlt, FaPlus } from "react-icons/fa"
import Loading from "../../../component/Loading"

export default function JabatanList() {

    const [Jabatan, setJabatan] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getJabatan();
    }, [])

    const getJabatan = async () => {
        setIsLoading(true)
        const response = await axios.get("http://192.168.1.14:8000/api/jabatan")
        setJabatan(response.data.data)
        setIsLoading(false)
    }

    const deleteJabatan = async (id) => {
        setIsLoading(true)
        await axios.delete(`http://192.168.1.14:8000/api/jabatan/${id}`)
        getJabatan();
    }

    return <>
        {
            isLoading ? (
                <Loading />
            ) : (
                <div>
                    <h1 className="title">Jabatan</h1>
                    <h2 className="subtitle">Daftar Jabatan</h2>
                    <Link to={"/jabatan/add"} className="button is-success mb-3"><FaPlus className="mr-2" /> Jabatan</Link>
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
                                Jabatan.map((data, i) => (
                                    <tr key={data.id}>
                                        <td>{i + 1}</td>
                                        <td>{data.nama}</td>
                                        <td>
                                            <Link to={`/jabatan/edit/${data.id}`} className="button is-small is-info">
                                                <FaPen />
                                            </Link>
                                            <button className="button is-small is-danger" onClick={() => deleteJabatan(data.id)}>
                                                < FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )
        }
    </>
}