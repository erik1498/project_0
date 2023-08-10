import axios from "axios";
import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import { FaSave } from "react-icons/fa"
import Loading from "../../../component/Loading";

export default function FormAddJabatan() {
    const [nama, setNama] = useState("")
    const [msg, setMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const simpanJabatan = async (e) => {
        e.preventDefault();
        setMsg("")
        try {
            setIsLoading(true)
            await axios.post("http://192.168.1.14:8000/api/jabatan", {
                nama: nama
            })
            setIsLoading(false)
            navigate("/jabatan")
        } catch (error) {
            setIsLoading(false);
            if (error.response.status == 400) {
                setMsg(error.response.data.message.nama ? error.response.data.message.nama[0] : "")
            }
        }
    }

    return <>
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <div>
                        <h1 className="title">Jabatan</h1>
                        <h2 className="subtitle">Tambah Jabatan</h2>
                        <form onSubmit={simpanJabatan}>
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