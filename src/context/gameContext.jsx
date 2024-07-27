import React, { createContext, useState } from 'react';



export const GameContext = createContext(null);

const GameContextProvider = ({ children }) => {

    const nivel = 5;
    const [pass, setPass] = useState([]);
    
    const [valueGroup, setValueGroup] = useState([]);

    const setLockValue = (index, newValue) => {
        const updatedValueGroup = [...valueGroup];
        updatedValueGroup[index].value = typeof newValue === 'function' ? newValue(updatedValueGroup[index].value) : newValue;
        setValueGroup(updatedValueGroup);
    };

    const mypack = {
        valueGroup,
        setValueGroup,
        setLockValue,
        nivel,
        pass,
        setPass,
    };
    return (
        <GameContext.Provider value={mypack}>
            {children}
        </GameContext.Provider>
    );
}

export default GameContextProvider;