import Header from "../common/Header";



const Layout = ({children}) => {
    return(
        <>
        <Header/>
        <div>
            {children}
        </div>
        </>
    )
}

export default Layout;