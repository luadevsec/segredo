import { useContext, useEffect } from "react";
import { GameContext } from "../pages/game"; // Assuming GameContext is exported as a named export from "../pages/game"



const Lock = ({index}:{index: number}) => {

    const {value, unlocked} = useContext(GameContext).valueGroup[index];
    const setValue = useContext(GameContext).setLockValue;

    const limites = {
        min: 0,
        max: 9
    };

    useEffect(() => {
        console.log('Lock component mounted');
        return () => {
            console.log('Lock component unmounted');
        };
    }, []);

    const upValue = () => {
        if (value < limites.max) setValue(index, value + 1);
        else setValue(index, 0);
    };

    const downValue = () => {
        if (value > limites.min) setValue(index, value - 1);
        else setValue(index, 9);
    };

    const display: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    };
    const style: React.CSSProperties = {
        backgroundColor: unlocked === 1 ? 'green' : unlocked === 2 ? 'yellow' : 'red',
        color: 'white',
        padding: '10px',
        margin: '10px',
        borderRadius: '10px',
    };

    return (
        <span style={display}>
            <button onClick={upValue}>+</button>
            <p style={style}>{value}</p>
            <button onClick={downValue}>-</button>
        </span>
    );
};

export default Lock;
