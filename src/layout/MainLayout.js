import React from "react";
import Navbar from "../components/Navbar";

function MainLayout({children}) {
    return (
        <div>
            <Navbar></Navbar>
            <div><h1>{children}</h1></div>
        </div>
    )
}

export default MainLayout