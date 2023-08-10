import axios from "axios";
import React, {useState, useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
import { FaSave } from "react-icons/fa";
import Loading from "../../../component/Loading";

export default function FormEditKategoriJabatan() {
    const [nama, setNama] = useState("")
    const [msg, setMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    
    const { id } = useParams()

    const navigate = useNavigate()

    const simpanKategoriJabatan = async (e) => {
        e.preventDefault();
        setMsg("")
        try {
            setIsLoading(true)
            await axios.put(`http://192.168.1.14:8000/api/kategori_jabatan/${id}`, {
                nama: nama
            })
            setIsLoading(false)
            navigate("/kategori_jabatan")
        } catch (error) {
            setIsLoading(false);
            if (error.response.status == 400) {
                setMsg(error.response.data.message.nama ? error.response.data.message.nama[0] : "")
            }
        }
    }

    useEffect(() => {
        const getKategoriJabatanById = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`http://192.168.1.14:8000/api/kategori_jabatan/${id}`)
                setNama(response.data.data.nama)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false);
                if (error.response.status == 400) {
                    setMsg(error.response.data.message.nama[0])
                }
            }
        }
        getKategoriJabatanById();
    }, [id])

    return <>
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <div>
                        <h1 className="title">Kategori Jabatan</h1>
                        <h2 className="subtitle">Edit Kategori Jabatan</h2>
                        <form onSubmit={simpanKategoriJabatan}>
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
                    </div>
                )
            }
        </>
}