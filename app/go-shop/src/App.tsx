import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
    const [data, setData] = useState(null);

    const fetchData = () => {
        axios.get('http://localhost/GoShop/api/api.php')
            .then(response => {
                setData(response.data.message);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                // Handle your error here
            })
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    {data}
                </p>
                <button onClick={fetchData}>Fetch Data</button>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;