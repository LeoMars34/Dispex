/*Получение улиц*/
export async function getStreets() {
    let response = await fetch('https://dispex.org/api/vtest/Request/streets');
    return await response.json();
}
export async function getA() {
    let response = await fetch('https://dispex.org/api/vtest/HousingStock');
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
        `https://dispex.org/api/vtest/Request/house_flats/${id}`
    );
    return await response.json();
}
/*Получение жильцов конкретной квартиры*/
export async function getClients(addressId) {
    let response = await fetch(
        `https://dispex.org/api/vtest/HousingStock/clients/${addressId}`
    );
    return await response.json();
}
