import { useState, useEffect} from "react"

export default function KategoriUpdateModal({hide, hideModalUpdate, data}){
    const [nama, setNama] = useState('')

    const handleNama = (event) => {
        setNama(event.target.value);
    };

    return <>
        <div className={hide ? "modal modal-hide" : "modal modal-show"}>
            <div className="modal-header">
                <h1>Edit Kategori</h1>
            </div>
            <div className="modal-body">
                <form>
                    <div className="input-form">
                        <label htmlFor="nama">Nama</label>
                        <input type="text" autoComplete="off" value={nama} onChange={handleNama}/>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <button className="btn btn-transparent" onClick={hideModalUpdate}>Batal</button>
                <button className="btn btn-primary">Simpan</button>
            </div>
        </div>
    </>
}