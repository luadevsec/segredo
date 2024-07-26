import React, { useEffect, useState } from "react";
import Lock from "../components/lock";

const Game = () => {
    const nivel = 5;
    const [pass, setPass] = useState<number[]>([]);
    const [valueGroup, setValueGroup] = useState<{ value: number; unlocked: number }[]>([]);

    const [tentativas, setTentativas] = useState(0);

    useEffect(() => {
        console.log('Game component mounted');
        const newPass: number[] = [];
        const newValueGroup: { value: number; unlocked: number }[] = [];
        for (let i = 0; i < nivel; i++) {
            newPass.push(Math.floor(Math.random() * 10));
            newValueGroup.push({ value: 0, unlocked: 0 });
        }
        console.log('New pass:', newPass);
        setPass(newPass);
        setValueGroup(newValueGroup);
    }, [nivel]);

    const tryUnlock = () => {
        const unlock = (index: number) => {
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

    const setLockValue = (index: number, newValue: React.SetStateAction<number>) => {
        const updatedValueGroup = [...valueGroup];
        updatedValueGroup[index].value = typeof newValue === 'function' ? newValue(updatedValueGroup[index].value) : newValue;
        setValueGroup(updatedValueGroup);
    };

    const style: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    };

    return (
        <><div style={style}>
            {pass.map((_, index) => {
                console.log('Lock:', index);
                return (
                    <Lock
                        key={index}
                        value={valueGroup[index].value}
                        setValue={(newValue) => setLockValue(index, newValue)}
                        unlocked={valueGroup[index].unlocked}
                    />
                );
            })}
            <button onClick={tryUnlock}>try unlock</button>
        </div>
        {tentativas > 0 && <p>você fez {tentativas} tentativas</p>}
        </>
        
    );
};

export default Game;
