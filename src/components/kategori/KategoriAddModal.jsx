export default function KategoriAddModal({hide, hideModalAdd}){
    return <>
        <div className={hide ? "modal modal-hide" : "modal modal-show"}>
            <div className="modal-header">
                <h1>Tambah Kategori</h1>
            </div>
            <div className="modal-body">
                <form>
                    <input type="hidden" name="id" />
                    <div className="input-form">
                        <label htmlFor="nama">Nama</label>
                        <input type="text" name="nama" autoComplete="off" />
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <button className="btn btn-transparent" onClick={hideModalAdd}>Batal</button>
                <button className="btn btn-primary">Simpan</button>
            </div>
        </div>
    </>
}