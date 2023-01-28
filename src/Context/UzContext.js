import {createContext, useState} from "react"

const Context = createContext()

const UzContext = ({children}) => {
    const [uzArr, setUzArr] = useState([])
    return (
        <Context.Provider value={{uzArr, setUzArr}}>
            {children}
        </Context.Provider>
    )
}

export {Context, UzContext}