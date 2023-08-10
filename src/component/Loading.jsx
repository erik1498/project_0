export default function Loading() {

    const fixedTopStyle = {
        position: 'fixed',
        top: 0,
        left:0,
        right:0,
        bottom:0,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    };


    return <>
        <div className="loader-wrapper" style={fixedTopStyle}>
            <div className="loader is-loading"></div>
            <h1 className="mt-5">Loading</h1>
        </div>
    </>
}