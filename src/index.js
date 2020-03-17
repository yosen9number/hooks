import React from 'react';
import ReactDOM from 'react-dom';
import {HookSwitcher} from "./use-state";

const App = () => {
    return (
        <div>
            <HookSwitcher/>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
