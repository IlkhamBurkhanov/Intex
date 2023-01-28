import {createContext, useState} from "react"

const Context = createContext()

const RuContext = ({children}) => {
    const [ruArr, setRuArr] = useState([])
    return (
        <Context.Provider value={{ruArr, setRuArr}}>
            {children}
        </Context.Provider>
    )
}

export {Context, RuContext}