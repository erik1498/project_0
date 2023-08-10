import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { FaPen, FaTrashAlt, FaPlus } from "react-icons/fa"
import Loading from "../../../component/Loading"

export default function AsetList() {

    const [aset, setAset] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getAset();
    }, [])

    const getAset = async () => {
        setIsLoading(true)
        const response = await axios.get("http://192.168.1.14:8000/api/aset")
        setAset(response.data.data)
        setIsLoading(false)
    }

    const deleteAset = async (id) => {
        setIsLoading(true)
        await axios.delete(`http://192.168.1.14:8000/api/aset/${id}`)
        getAset();
    }

    return <>
        {
            isLoading ? (
                <Loading />
            ) : (
                <div>
                    <h1 className="title">Aset</h1>
                    <h2 className="subtitle">Daftar Aset</h2>
                    <Link to={"/aset/add"} className="button is-success mb-3"><FaPlus className="mr-2" /> Aset</Link>
                    <table className="table is-striped is-fullwidth">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Jumlah</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                aset.map((data, i) => (
                                    <tr key={data.id}>
                                        <td>{i + 1}</td>
                                        <td>{data.nama}</td>
                                        <td>{data.jumlah}</td>
                                        <td>
                                            <Link to={`/aset/edit/${data.id}`} className="button is-small is-info">
                                                <FaPen />
                                            </Link>
                                            <button className="button is-small is-danger" onClick={() => deleteAset(data.id)}>
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