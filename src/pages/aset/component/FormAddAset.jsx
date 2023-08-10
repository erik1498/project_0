import axios from "axios";
import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import { FaSave } from "react-icons/fa"

export default function FormAddAset() {
    const [nama, setNama] = useState("")
    const [jumlah, setJumlah] = useState(0)
    const [msgNama, setMsgNama] = useState("")
    const [msgJumlah, setMsgJumlah] = useState("")

    const navigate = useNavigate()

    const simpanAset = async (e) => {
        e.preventDefault();
        setMsgNama("")
        setMsgJumlah("")
        try {
            const response = await axios.post("http://192.168.1.14:8000/api/aset", {
                nama: nama,
                jumlah: jumlah
            })
            navigate("/aset")
        } catch (error) {
            if (error.response.status == 400) {
                setMsgNama(error.response.data.message.nama ? error.response.data.message.nama[0] : "")
                setMsgJumlah(error.response.data.message.jumlah ? error.response.data.message.jumlah[0] : "")
            }
        }
    }

    return <>
            <h1 className="title">Aset</h1>
            <h2 className="subtitle">Tambah Aset</h2>
            <form onSubmit={simpanAset}>
                <div className="field">
                    <label className="label">Nama</label>
                    <div className="control">
                        <input type="text" className="input" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)}/>
                    </div>
                    <p className="has-text-danger">{msgNama}</p>
                </div>
                <div className="field">
                    <label className="label">Jumlah</label>
                    <div className="control">
                        <input type="number" className="input" placeholder="Jumlah" value={jumlah} onChange={(e) => setJumlah(e.target.value)}/>
                    </div>
                    <p className="has-text-danger">{msgJumlah}</p>
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