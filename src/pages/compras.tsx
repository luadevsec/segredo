import React from 'react';

interface Values {
    money: number;
    products: {
        carro: number;
        moto: number;
        casa: number;
        planta: number;
    };
    inflate: number;
    inventory: {
        carro: number;
        moto: number;
        casa: number;
        planta: number;
    };
}

type Action =
    | { type: 'buy'; wanted: keyof Values['products'] }
    | { type: 'sell'; wanted: keyof Values['products'] };

const Compras: React.FC = () => {
    const initialState: Values = {
        money: 100,
        products: {
            carro: 200,
            moto: 50,
            casa: 300,
            planta: 10,
        },
        inflate: 1.2,
        inventory: {
            carro: 0,
            moto: 0,
            casa: 0,
            planta: 0,
        },
    };

    const reducer = (state: Values, action: Action): Values => {
        const { wanted } = action;
        const productPrice = state.products[wanted];
        const productInventory = state.inventory[wanted];

        switch (action.type) {
            case 'buy':
                if (state.money < productPrice) return state;
                return {
                    ...state,
                    money: state.money - productPrice,
                    products: {
                        ...state.products,
                        [wanted]: productPrice * state.inflate,
                    },
                    inventory: {
                        ...state.inventory,
                        [wanted]: productInventory + 1,
                    },
                };
            case 'sell':
                if (productInventory === 0) return state;
                return {
                    ...state,
                    money: state.money + productPrice,
                    inventory: {
                        ...state.inventory,
                        [wanted]: productInventory - 1,
                    },
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = React.useReducer(reducer, initialState);

    const buy = (wanted: keyof Values['products']) => dispatch({ type: 'buy', wanted });
    const sell = (wanted: keyof Values['products']) => dispatch({ type: 'sell', wanted });

    return (
        <div>
            <h1>Compras</h1>
            <h2>Dinheiro: {state.money}</h2>
            <h3>Preços:</h3>
            <ul>
                <li>Carro: {state.products.carro}</li>
                <li>Moto: {state.products.moto}</li>
                <li>Casa: {state.products.casa}</li>
                <li>Planta: {state.products.planta}</li>
            </ul>
            <h3>Inventário:</h3>
            <ul>
                <li>Carro: {state.inventory.carro}</li>
                <li>Moto: {state.inventory.moto}</li>
                <li>Casa: {state.inventory.casa}</li>
                <li>Planta: {state.inventory.planta}</li>
            </ul>
            <div>
                <button onClick={() => buy('carro')}>Comprar Carro</button>
                <button onClick={() => buy('moto')}>Comprar Moto</button>
                <button onClick={() => buy('casa')}>Comprar Casa</button>
                <button onClick={() => buy('planta')}>Comprar Planta</button>
                <button onClick={() => sell('carro')}>Vender Carro</button>
                <button onClick={() => sell('moto')}>Vender Moto</button>
                <button onClick={() => sell('casa')}>Vender Casa</button>
                <button onClick={() => sell('planta')}>Vender Planta</button>
            </div>
        </div>
    );
};

export default Compras;
