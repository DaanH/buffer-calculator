import { createContext, ReactNode, useState, useContext } from "react";

interface INav {
    activePage: string;
    setActivePage: (page: string) => void;
}

const navContextDefaultState: INav = {
    activePage: "home",
    setActivePage: () => null
};

const NavContext = createContext<INav>(navContextDefaultState);

export const useNav = () => useContext(NavContext);

type NavContextProviderProps = { children: ReactNode };

const NavContextProvider = ({ children }: NavContextProviderProps) => {
    const [activePage, setActivePage] = useState(navContextDefaultState.activePage);

    return <NavContext.Provider value={{ activePage, setActivePage }}>{children}</NavContext.Provider>;
};

export default NavContextProvider;
