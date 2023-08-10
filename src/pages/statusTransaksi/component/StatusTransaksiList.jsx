import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { FaPen, FaTrashAlt, FaPlus } from "react-icons/fa"
import Loading from "../../../component/Loading"

export default function StatusTransaksiList() {

    const [statusTransaksi, setStatusTransaksi] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getStatusTransaksi();
    }, [])

    const getStatusTransaksi = async () => {
        setIsLoading(true)
        const response = await axios.get("http://192.168.1.14:8000/api/status_transaksi")
        setStatusTransaksi(response.data.data)
        setIsLoading(false)
    }

    const deleteStatusTransaksi = async (id) => {
        setIsLoading(true)
        await axios.delete(`http://192.168.1.14:8000/api/status_transaksi/${id}`)
        getStatusTransaksi();
    }

    return <>
        {
            isLoading ? (
                <Loading />
            ) : (
                <div>
                    <h1 className="title">Status Transaksi</h1>
                    <h2 className="subtitle">Daftar Status Transaksi</h2>
                    <Link to={"/status_transaksi/add"} className="button is-success mb-3"><FaPlus className="mr-2" /> Status Transaksi</Link>
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
                                statusTransaksi.map((data, i) => (
                                    <tr key={data.id}>
                                        <td>{i + 1}</td>
                                        <td>{data.nama}</td>
                                        <td>
                                            <Link to={`/status_transaksi/edit/${data.id}`} className="button is-small is-info">
                                                <FaPen />
                                            </Link>
                                            <button className="button is-small is-danger" onClick={() => deleteStatusTransaksi(data.id)}>
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