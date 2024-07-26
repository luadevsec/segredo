import React from "react";
import { createRoot } from 'react-dom';
import AppRoutes from "./routes";


const root = createRoot(document.getElementById('root')); 

root.render(

    <React.StrictMode>
        <AppRoutes />
    </React.StrictMode>

); 
