import axios from "axios";
import React, {useState, useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
import { FaSave } from "react-icons/fa";

export default function FormEditAkun() {
    const [nama, setNama] = useState("")
    const [password, setPassword] = useState("")
    const [msgNama, setMsgNama] = useState("")
    const [msgPassword, setMsgPassword] = useState("")
    
    const { id } = useParams()

    const navigate = useNavigate()

    const simpanAkun = async (e) => {
        e.preventDefault();
        setMsgNama("")
        setMsgPassword("")
        try {
            await axios.put(`http://192.168.1.14:8000/api/akun/${id}`, {
                nama: nama,
                password:password
            })
            navigate("/akun")
        } catch (error) {
            if (error.response.status == 400) {
                setMsgNama(error.response.data.message.nama ? error.response.data.message.nama[0] : "")
                setMsgPassword(error.response.data.message.password ? error.response.data.message.password[0] : "")
            }
        }
    }

    useEffect(() => {
        const getAkunById = async () => {
            try {
                const response = await axios.get(`http://192.168.1.14:8000/api/akun/${id}`)
                setNama(response.data.data.nama)
            } catch (error) {
                console.log(error)
            }
        }
        getAkunById();
    }, [id])

    return <>
            <h1 className="title">Akun</h1>
            <h2 className="subtitle">Edit Akun</h2>
            <form onSubmit={simpanAkun}>
                <div className="field">
                    <label className="label">Nama</label>
                    <div className="control">
                        <input type="text" className="input" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)}/>
                    </div>
                    <p className="has-text-danger">{msgNama}</p>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input type="text" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <p className="has-text-danger">{msgPassword}</p>
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