import React, { ReactNode } from 'react';
import Header from '../common/Header';



//interface for pages component props 
interface ComponentProps {
    children: ReactNode
}

const Layout: React.FC<ComponentProps> = ({ children }) => {
    return (
        <>
            <Header />
            <div>
            {children}
        </div >
        </>
    )
}

export default Layout;