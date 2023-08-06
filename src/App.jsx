import Kategori from "./pages/kategori/Kategori"
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function App() {

  const handle = useFullScreenHandle();

  return (
    <>
      {/* <button onClick={handle.enter} className="btn-full">
        Enter Fullscreen
      </button> */}
      {/* <FullScreen handle={handle}> */}
        <Kategori />
      {/* </FullScreen> */}
    </>
  )
}

export default App
