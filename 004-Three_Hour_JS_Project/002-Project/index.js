'use strict;'
// Project
/*
>>>>
>>>>
>>>>
>>>>
*/
const baseUrl = "https://crudcrud.com/api/42b17bfc9fed4272ac30e6f2f0e67a7a";

const dishNameField = document.getElementById('dish');
const dishPriceField = document.getElementById('price');
const tableNameField = document.getElementById('table');

async function submitForm(event) {
    event.preventDefault();

    const price = dishPriceField.value;
    const dish = dishNameField.value;
    const table = tableNameField.value;

    await axios.post(`${baseUrl}/orders`, {
        price: price,
        dish: dish,
        table: table
    }).then((res) => {
        updateTable(table, dish, price, res.data["_id"]);
    }).catch((err) => {
        console.log(err);
    });

}

document.addEventListener('DOMContentLoaded', function () {
    axios.get(`${baseUrl}/orders`).then((res) => {
        if (res.data) {
            res.data.forEach((order) => {
                updateTable(order.table, order.dish, order.price, order["_id"]);
            });
        }
    }).catch((err) => {
        console.log(err);
    });
});

async function deleteEntry(liElement) {
    const id = liElement.getAttribute('_id');

    try {
        await axios.delete(`${baseUrl}/orders/${id}`);
    } catch (error) {
        console.log(error);
    }

    liElement.remove();
}

function updateTable(tableName, dishName, price, id) {
    const tableUl = document.getElementById(`${tableName}-list`);

    const newLi = document.createElement('li');
    newLi.textContent = `${price} - ${tableName} - ${dishName}`;
    newLi.setAttribute('_id', id);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete Order';
    delBtn.addEventListener('click', deleteEntry.bind(null, newLi));

    newLi.appendChild(delBtn);
    tableUl.appendChild(newLi);

    dishNameField.value = '';
    dishPriceField.value = '';
}