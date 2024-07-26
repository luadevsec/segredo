import { useEffect } from "react";

interface Sets {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    unlocked: boolean;
}

const Lock = ({ value, setValue, unlocked }: Sets) => {

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
        if (value < limites.max) setValue(value + 1);
        else setValue(0);
    };

    const downValue = () => {
        if (value > limites.min) setValue(value - 1);
        else setValue(9);
    };

    const display: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    };

    const style: React.CSSProperties = {
        backgroundColor: unlocked ? 'green' : 'red',
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
