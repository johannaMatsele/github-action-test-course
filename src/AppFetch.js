import React from "react";
import logo from './logo.svg'
import './App.css'
import { useQuery } from "react-query";

const fetcher = ()=>Promise.resolve(100)

function App(){
    const {isIdle} =useQuery(['todo-single-item',1],fetcher,{
        enabled:false
    })
    console.log('Is idle?',isIdle)
    return(
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit<code>src/App.js</code>and save to reload
                </p>
                <span className="App-link">Hello from codeman:</span>
            </header>
        </div>
    )        
    
}

export default App