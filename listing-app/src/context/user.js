import React from 'react'

const UserContext = React.createContext({})

export function UserProvider(props) {
    const isLoggedIn = true
    return (
        <UserContext.Provider value={{
            isLoggedIn
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext