import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, Footer } from './index'

const AppLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default AppLayout