import React, { useEffect, useState } from "react";
import Lock from "../components/lock";


export const GameContext = React.createContext();

const Game = () => {
    const nivel = 5;
    const [pass, setPass] = useState([]);
    const [valueGroup, setValueGroup] = useState([]);

    const [tentativas, setTentativas] = useState(0);

    useEffect(() => {
        console.log('Game component mounted');
        const newPass = [];
        const newValueGroup = [];
        for (let i = 0; i < nivel; i++) {
            newPass.push(Math.floor(Math.random() * 10));
            newValueGroup.push({ value: 0, unlocked: 0 });
        }
        console.log('New pass:', newPass);
        setPass(newPass);
        setValueGroup(newValueGroup);
    }, [nivel]);

    const tryUnlock = () => {
        const unlock = (index) => {
            const updatedValueGroup = [...valueGroup];

            if (valueGroup[index].value === pass[index]) {
                updatedValueGroup[index].unlocked = 1;
                console.log('Lock opened');
            } else if (pass.includes(valueGroup[index].value)) {
                updatedValueGroup[index].unlocked = 2;
                console.log('Lock closed but near');
            } else {
                updatedValueGroup[index].unlocked = 0;
                console.log('Lock closed');
            }

            setValueGroup(updatedValueGroup);
        };

        setTentativas(tentativas + 1);
        for (let i = 0; i < nivel; i++) {
            unlock(i);
        }
    };

    const setLockValue = (index, newValue) => {
        const updatedValueGroup = [...valueGroup];
        updatedValueGroup[index].value = typeof newValue === 'function' ? newValue(updatedValueGroup[index].value) : newValue;
        setValueGroup(updatedValueGroup);
    };

    const style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    };

    return (
        <GameContext.Provider value={{valueGroup, setLockValue}}>
            <div style={style}>
                {pass.map((_, index) => {
                    console.log('Lock:', index);
                    return (
                        <Lock
                            key={index}
                            index={index}
                        />
                    );
                })}
                <button onClick={tryUnlock}>try unlock</button>
            </div>
            {tentativas > 0 && <p>você fez {tentativas} tentativas</p>}
        </GameContext.Provider>
    );
};

export default Game;
