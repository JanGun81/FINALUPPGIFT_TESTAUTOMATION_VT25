import { request } from '@playwright/test';
import { test, expect } from '../api.fixtures';

test.describe('Store Product API Tests', () => {
  test('Fetch product list', async ( {api, baseURL}) => {
    //Act
    const response = await api.get(`${baseURL}/product/list`);
    //Assert
    expect(response.ok()).toBeTruthy();
    const products = await response.json();
    console.log(products);
  });

  test(`Fetch existing product prices`, async ({ api, baseURL }) => {
    const products = [
      { id: 1, name: 'Apple', price: 15 },
      { id: 2, name: 'Banana', price: 23},
      { id: 3, name: 'Orange', price: 34},
      { id: 4, name: 'Grape', price: 4},
      { id: 5, name: 'Bicycle', price: 899},
      { id: 6, name: 'Samsung S6', price: 4999},
      { id: 7, name: 'Toy Train', price: 399},
      { id: 8, name: 'Cup of coffee', price: 29},
      { id: 9, name: 'Chair', price: 199},
      { id: 10, name: 'TV', price: 9500},
    ];

    for (const { id, name, price } of products) {
        // Act & Assert
        const response = await api.get(`${baseURL}/price/${id}`);
        expect(response.ok()).toBeTruthy();

        const data = await response.json();
        console.log(`Response for product ${id}, ${name} and ${price} is: `, data);

        // Validera att svaret innehåller rätt fält
        expect(data).toHaveProperty('id');
        expect(data).toHaveProperty('price');
        expect(data).toHaveProperty('name');

        // Validera att id, name och price matchar indata
        expect(data.id).toBe(id);
        expect(data.name).toBe(name);
        expect(data.price).toBe(price);
      }
    });
});