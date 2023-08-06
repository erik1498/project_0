import { FaPen, FaTrashAlt } from 'react-icons/fa'
import axios from 'axios'

export default function KategoriListItem({data, number, showModalUpdate, setKategoriData, getKategoriListData}) {
    const showAndsetKategoriUpdateData = () => {
        showModalUpdate()
        setKategoriData(data)
    }

    const deleteKategoriData = (id) => {
        axios.delete("http://192.168.1.3:8000/api/kategori/" + id).then((res) => {
            getKategoriListData()
        })
    }

    return <>
        <tr>
            <td>{number + 1}</td>
            <td>{data.nama}</td>
            <td>
                <button className={"badge"} onClick={showAndsetKategoriUpdateData}>
                    <FaPen size={12} className={"icon"} color='black'/>
                </button>
                <button className={"badge"} onClick={() => deleteKategoriData(data.id)}>
                    <FaTrashAlt size={12} className={"icon"} color='red'/>
                </button>
            </td>
        </tr>
    </>
}