import React from "react";

const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => {
    return (
        <>
            <header className="text-center mt-2">Livraria Online</header>
            {children}
            <footer></footer>
        </>
    );
}

export default Layout;