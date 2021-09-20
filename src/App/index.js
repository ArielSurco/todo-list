import React from 'react';
import { AppUI } from './AppUI';
import { TodoProvider } from '../TodoContext';

const App = () => {
    return (
        <TodoProvider>
            <AppUI />
        </TodoProvider>
    )
}

export default App;