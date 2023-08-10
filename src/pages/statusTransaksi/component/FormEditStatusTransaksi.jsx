import axios from "axios";
import React, {useState, useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
import { FaSave } from "react-icons/fa";

export default function FormEditStatusTransaksi() {
    const [nama, setNama] = useState("")
    const [msg, setMsg] = useState("")
    
    const { id } = useParams()

    const navigate = useNavigate()

    const simpanStatusTransaksi = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://192.168.1.14:8000/api/status_transaksi/${id}`, {
                nama: nama
            })
            navigate("/status_transaksi")
        } catch (error) {
            if (error.response.status == 400) {
                setMsg(error.response.data.message.nama[0])
            }
        }
    }

    useEffect(() => {
        const getStatusTransaksiById = async () => {
            try {
                const response = await axios.get(`http://192.168.1.14:8000/api/status_transaksi/${id}`)
                setNama(response.data.data.nama)
            } catch (error) {
                if (error.response.status == 400) {
                    setMsg(error.response.data.message.nama[0])
                }
            }
        }
        getStatusTransaksiById();
    }, [id])

    return <>
            <h1 className="title">Status Transaksi</h1>
            <h2 className="subtitle">Edit Status Transaksi</h2>
            <form onSubmit={simpanStatusTransaksi}>
                <div className="field">
                    <label className="label">Nama</label>
                    <div className="control">
                        <input type="text" className="input" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)}/>
                    </div>
                    <p className="has-text-danger">{msg}</p>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="button is-success" type="submit">
                            <FaSave className="mr-3" />
                            Simpan
                        </button>
                    </div>
                </div>
            </form>
        </>
}