import React, { useEffect, useState } from "react";
import Lock from "../components/lock";

const Game = () => {
    const nivel = 5;
    const [pass, setPass] = useState<number[]>([]);
    const [valueGroup, setValueGroup] = useState<{ value: number; unlocked: boolean }[]>([]);

    useEffect(() => {
        console.log('Game component mounted');
        const newPass: number[] = [];
        const newValueGroup: { value: number; unlocked: boolean }[] = [];
        for (let i = 0; i < nivel; i++) {
            newPass.push(Math.floor(Math.random() * 10));
            newValueGroup.push({ value: 0, unlocked: false });
        }
        console.log('New pass:', newPass);
        setPass(newPass);
        setValueGroup(newValueGroup);
    }, [nivel]);

    const tryUnlock = () => {
        const unlock = (index: number) => {
            if (valueGroup[index].value === pass[index]) {
                const updatedValueGroup = [...valueGroup];
                updatedValueGroup[index].unlocked = true;
                setValueGroup(updatedValueGroup);
                console.log('Lock opened');
            } else {
                const updatedValueGroup = [...valueGroup];
                updatedValueGroup[index].unlocked = false;
                setValueGroup(updatedValueGroup);
                console.log('Lock closed');
            }
        };

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
        <div style={style}>
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
    );
};

export default Game;
