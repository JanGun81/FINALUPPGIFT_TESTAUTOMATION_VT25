Part of Online Course "Test automation and AI" in Fall term 2025 on Frans Schartau Handelshögskola in Stockholm. 
The focus here is creating a CI/CD Pipeline where Playwright End-to-End and API tests can be ran on different triggers. Test types include functional tests, API tests and accessibility tests.
A lab website "https://hoff.is/login" and "https://hoff.is/store" is used as an example and can be extended upon further. 
Assignment is as follows:

Your repository should contain: 
A pipeline which is running the tests. 
Five tests for hoff.is/login page (and the store page when you logged in) 
At least one test needs to be using the API 
At least one test needs to be accessibility testing. 
This isn’t something I’ve taught you, you will need to use playwright documentation or ChatGPT to do it. 
You need to use PageObject models for the tests. 

The following API's can be used to fetch product data for the store: 
https://hoff.is/store2/api/v1/price/1 <- change number from 1-10  
https://hoff.is/store2/api/v1/product/list <- to fetch a list of products in the store.   

Use the API's to fetch data for assertions (expects), e.g. 
Get price for Apple from API, make a purchase for Apple in UI. 
Verify price is correct on receipt according to API. 
