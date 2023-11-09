/*Получение улиц*/
export async function getStreets() {
    let response = await fetch('https://dispex.org/api/vtest/Request/streets');
    return await response.json();
}

/*Получение домов*/
export async function getHouses(id) {
    let response = await fetch(
        `https://dispex.org/api/vtest/Request/houses/${id}`
    );
    return await response.json();
}
/*Получение квартир*/
export async function getApartmets(id) {
    let response = await fetch(
        `https://dispex.org/api/vtest/HousingStock/?houseId=${id}`
    );
    return await response.json();
}
/*Получение жильцов конкретной квартиры*/
export async function getClients(addressId) {
    let response = await fetch(
        `https://dispex.org/api/vtest/HousingStock/clients/?addressId=${addressId}`
    );
    return await response.json();
}
/*Создание нового жильца*/
export async function addClients(name, phone, email) {
    let response = await fetch(
        `https://dispex.org/api/vtest/HousingStock/client`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                email: email,
            }),
        }
    );
    return await response.json();
}
/*Создание нового жильца*/
export async function bindClient(AddressId, ClientId) {
    let response = await fetch(
        `https://dispex.org/api/vtest/HousingStock/bind_client`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                AddressId: AddressId,
                ClientId: ClientId,
            }),
        }
    );
    return await response.json();
}
