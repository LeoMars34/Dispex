import { useEffect, useState } from 'react';
import { getA, getApartmets, getClients, getHouses, getStreets } from './Api';

function App() {
    const [street, setStreet] = useState([]);
    const [houses, setHouses] = useState([]);
    const [flats, setFlats] = useState([]);
    const [clients, setClients] = useState([]);

    function displayHouses(e, id) {
        if (e.target.parentNode.classList.contains('active')) {
            e.target.parentNode.classList.toggle('active');
            return;
        }
        getHouses(id).then((data) => {
            setHouses(data);
            e.target.parentNode.classList.toggle('active');
        });
    }
    function displayFlats(e, id) {
        if (e.target.parentNode.classList.contains('active')) {
            e.target.parentNode.classList.toggle('active');
            return;
        }
        getApartmets(id).then((data) => {
            setFlats(data);
            e.target.parentNode.classList.toggle('active');
        });
    }
    function displayClients(addressId) {
        getClients(addressId).then((data) => {
            console.log(data);
            setClients(data);
        });
    }

    useEffect(() => {
        getStreets().then((data) => {
            setStreet(data);
        });
        getA().then((data) => {
            console.log(data);
        });
    }, []);

    return (
        <div className="App">
            <div className="accardion">
                <div className="street">
                    {street.map((s) => (
                        <div
                            key={s.id}
                            className="currentStreet"
                            onClick={(e) => {
                                displayHouses(e, s.id);
                            }}
                        >
                            {s.name}
                        </div>
                    ))}
                    <div className="houses">
                        {houses.map((h) => (
                            <div
                                key={h.id}
                                className="currentHouses"
                                onClick={(e) => {
                                    displayFlats(e, h.id);
                                }}
                            >
                                {h.name}
                            </div>
                        ))}
                        <div className="flats">
                            {flats.map((f) => (
                                <div
                                    key={f.id}
                                    className="currentFlats"
                                    onClick={() => {
                                        displayClients(f.id);
                                    }}
                                >
                                    {f.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
