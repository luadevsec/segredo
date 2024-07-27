import React, { useEffect, useState, useContext } from "react";
import Lock from "../components/lock";
import { GameContext } from "../context/gameContext";

const Game = () => {
    const { nivel, pass, valueGroup, setPass, setValueGroup } = useContext(GameContext);
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
    }, [nivel, setPass, setValueGroup]);

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

    const style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    };

    return (
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
            {tentativas > 0 && <p>você fez {tentativas} tentativas</p>}
        </div>
    );
};

export default Game;

