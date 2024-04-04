const axios = require('axios');
const faker = require('faker');


const URL = "https://fakestoreapi.com";

function fakeDataGenerator() {
    return {
        title: faker.commerce.productName(),
        price: faker.random.number({ min: 1, max: 100 }),
        description: faker.lorem.sentence(),
        category: faker.random.word(),
        image: faker.image.imageUrl()
    };
}


async function getData(endpoint) {
    try {
        const response = await axios.get(`${URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error("Error in GET request:", error);
        return null;
    }
}


async function postData(endpoint, data) {
    try {
        const response = await axios.post(`${URL}/${endpoint}`, data);
        return response.status === 201;
    } catch (error) {
        console.error("Error in POST request:", error);
        return false;
    }
}

async function putData(endpoint, id, data) {
    try {
        const response = await axios.put(`${URL}/${endpoint}/${id}`, data);
        return response.status === 200;
    } catch (error) {
        console.error("Error in PUT request:", error);
        return false;
    }
}

async function deleteData(endpoint, id) {
    try {
        const response = await axios.delete(`${URL}/${endpoint}/${id}`);
        return response.status === 200;
    } catch (error) {
        console.error("Error in DELETE request:", error);
        return false;
    }
}

async function testGet() {
    const products = await getData("products");
    if (products && products.length > 0) {
        console.log("GET Test: Passed");
    } else {
        console.log("GET Test: Failed");
    }
}

async function testPost() {
    const data = fakeDataGenerator();
    const result = await postData("products", data);
    if (result) {
        console.log("POST Test: Passed");
    } else {
        console.log("POST Test: Failed");
    }
}


async function testPut() {
    const products = await getData("products");
    if (products && products.length > 0) {
        const productId = products[0].id;
        const data = fakeDataGenerator();
        const result = await putData("products", productId, data);
        if (result) {
            console.log("PUT Test: Passed");
        } else {
            console.log("PUT Test: Failed");
        }
    } else {
        console.log("PUT Test: Failed (No product available for testing)");
    }
}


async function testDelete() {
    const products = await getData("products");
    if (products && products.length > 0) {
        const productId = products[0].id;
        const result = await deleteData("products", productId);
        if (result) {
            console.log("DELETE Test")}}}
