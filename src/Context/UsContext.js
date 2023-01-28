import {createContext, useState} from "react"

const Context = createContext()

const UsContext = ({children}) => {
    const [usArr, setUsArr] = useState([])
    return (
        <Context.Provider value={{usArr, setUsArr}}>
            {children}
        </Context.Provider>
    )
}

export {Context, UsContext}