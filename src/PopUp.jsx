import { useState } from 'react';
import { addClients, bindClient } from './Api';

export function PopUp({ currentFlat, setCurrentFlat }) {
    const [client, setClients] = useState();

    /*Валидация Имя*/
    function validateName(e) {
        let fio = e.target;
        let regex = /[^a-zA-Zа-яА-Я\s]/g;
        fio.value = fio.value.replace(regex, '');
        fio.value = fio.value.replace(/\s+/g, ' ');
    }
    /*Валидация телефона*/
    function validatePhone(e) {
        let phone = e.target;
        let pattern = /^((\8)+([0-9]){10})$/;
        let regex = /[^\d]/g;
        let index = phone.value.indexOf('8');
        if (index !== -1) {
            phone.value = phone.value.slice(index);
        } else {
            phone.value = '';
        }
        phone.value = phone.value.replace(regex, '');
        if (phone.value.length > 11) {
            phone.value = phone.value.slice(0, 11);
        }
        if (phone.value.match(pattern)) {
            phone.classList.remove('red_border');
        } else {
            phone.classList.add('red_border');
        }
        if (phone.value === '') {
            phone.classList.remove('red_border');
        }
    }
    /*Валидация email*/
    function validateEmail(e) {
        let email = e.target;
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (email.value.match(pattern)) {
            email.classList.remove('red_border');
        } else {
            email.classList.add('red_border');
        }
        if (email.value === '') {
            email.classList.remove('red_border');
        }
    }
    /*Добавление нового клиента*/
    function addNewClients() {
        let name = '';
        let phone = '';
        let email = '';
        let arrInput = document.querySelectorAll('input');
        let error = false;
        if (document.getElementById('name').value) {
            name = document.getElementById('name').value;
        }
        if (document.getElementById('phone').value) {
            phone = document.getElementById('phone').value;
        }
        if (document.getElementById('email').value) {
            email = document.getElementById('email').value;
        }
        arrInput.forEach((input) => {
            if (input.classList.contains('red_border')) {
                alert('Неверно внесены данные');
                error = true;
            }
        });
        if (error === true) {
            return;
        } else {
            addClients(name, phone, email).then((response) => {
                setClients(response.id);
                alert('Клиент успешно создан');
            });
        }
    }
    /*Привязка клиента к квартире*/
    function bind(client) {
        let AddressId = currentFlat.addressId;
        let ClientId = client;
        bindClient(AddressId, ClientId).then((response) => {
            console.log(response);
        });
    }
    /*Закртие popUp*/
    function closePopUp(e) {
        if (!e.target.closest('.container__PopUp')) {
            setCurrentFlat();
        }
    }

    return (
        <div onClick={closePopUp} className="main__container">
            <div className="container__PopUp">
                <div className="header">
                    <h3 style={{ borderBottom: 'thick double black' }}>
                        Квартира № {currentFlat.flat}
                    </h3>
                    <h4 style={{ margin: '10px' }}>Создание нового жильца</h4>
                    <div className="createClient">
                        <input
                            onInput={(e) => {
                                validateName(e);
                            }}
                            id="name"
                            type="text"
                            placeholder="Имя"
                        />
                        <input
                            onInput={(e) => {
                                validatePhone(e);
                            }}
                            id="phone"
                            type="text"
                            placeholder="Телефон"
                        />
                        <input
                            onInput={(e) => {
                                validateEmail(e);
                            }}
                            id="email"
                            type="text"
                            placeholder="Email"
                        />
                        <button onClick={addNewClients}>Добавить</button>
                    </div>
                    <h4 style={{ margin: '10px' }}>
                        Привязать нового жильца к квартире
                    </h4>
                </div>
                <div className="content__PopUp">
                    <h4>{client}</h4>
                    <button
                        onClick={() => {
                            bind(client);
                        }}
                    >
                        Привязать
                    </button>
                </div>
            </div>
        </div>
    );
}
