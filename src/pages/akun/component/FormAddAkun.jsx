import axios from "axios";
import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import { FaSave } from "react-icons/fa";
import Loading from "../../../component/Loading";

export default function FormAddAkun() {
    const [nama, setNama] = useState("")
    const [password, setPassword] = useState("")
    const [msgNama, setMsgNama] = useState("")
    const [msgPassword, setMsgPassword] = useState("")
    const [msgJabatan, setMsgJabatan] = useState("")
    const [msgKategoriJabatan, setMsgKategoriJabatan] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [jabatanIdSelect, setJabatanIdSelect] = useState(0)
    const [kategoriJabatanIdSelect, setKategoriJabatanIdSelect] = useState(0)
    const [jabatan, setJabatan] = useState([])
    const [kategoriJabatan, setKategoriJabatan] = useState([])

    const navigate = useNavigate()

    const getAllJabatanAndKategoriJabatan = async () => {
        setIsLoading(true)
        const responseJabatan = await axios.get("http://192.168.1.14:8000/api/jabatan")
        setJabatan(responseJabatan.data.data)
        
        const responseKategoriJabatan = await axios.get("http://192.168.1.14:8000/api/kategori_jabatan")
        setKategoriJabatan(responseKategoriJabatan.data.data)
        setIsLoading(false)
    }
    useEffect(() => {
        getAllJabatanAndKategoriJabatan()
    }, [])

    useEffect(() => {
        if (jabatan.length > 0) {
            setJabatanIdSelect(jabatan[0].id)
        }
        if (kategoriJabatan.length > 0) {
            setKategoriJabatanIdSelect(kategoriJabatan[0].id)
        }
    }, [jabatan, kategoriJabatan])

    const simpanAkun = async (e) => {
        e.preventDefault();
        setMsgNama("")
        setMsgPassword("")
        try {
            setIsLoading(true)
            await axios.post("http://192.168.1.14:8000/api/akun", {
                nama: nama,
                password:password,
                jabatan_id:jabatanIdSelect,
                kategori_jabatan_id:kategoriJabatanIdSelect
            })
            setIsLoading(false)
            navigate("/akun")
        } catch (error) {
            setIsLoading(false);
            if (error.response.status == 400) {
                setMsgNama(error.response.data.message.nama ? error.response.data.message.nama[0] : "")
                setMsgJabatan(error.response.data.message.jabatan_id ? error.response.data.message.jabatan_id[0] : "")
                setMsgKategoriJabatan(error.response.data.message.kategori_jabatan_id ? error.response.data.message.kategori_jabatan_id[0] : "")
                setMsgPassword(error.response.data.message.password ? error.response.data.message.password[0] : "")
            }
        }
    }

    return <>
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <div>
                        <h1 className="title">Akun</h1>
                        <h2 className="subtitle">Tambah Akun</h2>
                        <form onSubmit={simpanAkun}>
                            <div className="field">
                                <label className="label">Nama</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)}/>
                                </div>
                                <p className="has-text-danger">{msgNama}</p>
                            </div>
                            <div className="field">
                                <label className="label">Jabatan</label>
                                <div className="select is-fullwidth">
                                    <select value={jabatanIdSelect} onChange={(e) => setJabatanIdSelect(e.target.value)}>
                                    {
                                        jabatan.map((data, i) => (
                                            <option value={data.id} key={i}>{data.nama}</option>
                                        ))
                                    }
                                    </select>
                                </div>
                                <p className="has-text-danger">{msgJabatan}</p>
                            </div>
                            <div className="field">
                                <label className="label">Kategori Jabatan</label>
                                <div className="select is-fullwidth">
                                    <select value={kategoriJabatanIdSelect} onChange={(e) => setKategoriJabatanIdSelect(e.target.value)}>
                                    {
                                        kategoriJabatan.map((data, i) => (
                                            <option value={data.id} key={i}>{data.nama}</option>
                                        ))
                                    }
                                    </select>
                                </div>
                                <p className="has-text-danger">{msgKategoriJabatan}</p>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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
                    </div>
                )
            }
        </>
}