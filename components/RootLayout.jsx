import React from 'react'
import Head from 'next/head'
import HeaderSection from './HeaderSection'

const RootLayout = ({ children, keywords }) => {
    return (
        <div className='root'>
            <Head>
                <meta keywords={'rifatikkkk, portfolio ' + keywords}></meta>
                <title>rifatikkkk</title>
            </Head>

            <HeaderSection />

            <div className="content">
                {children}
            </div>

        </div>
    )
}

export default RootLayout