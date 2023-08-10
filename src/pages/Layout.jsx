import React from "react"

export default function Layout({children}) {
    return (
        <React.Fragment>
            <div className="columns" style={ { minHeight:"100vh" } }>
                <div className="column p-5">
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </React.Fragment>
    )
}