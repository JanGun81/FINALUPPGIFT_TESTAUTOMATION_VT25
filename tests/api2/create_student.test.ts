import {request, expect, test, APIRequestContext} from "@playwright/test";

let apiContext : APIRequestContext;

test.beforeAll( async () => {
   apiContext = await request.newContext(
        {baseURL: 'https://test-379574553568.us-central1.run.app/',
         extraHTTPHeaders: {API_KEY: "test_api_jg_key_123"}}
   );
});

test("Put student API2", async() => {
    // Act
    const response = await apiContext.get("/student");
    console.log(await response.json());
    // Assert
    expect(response.ok()).toBeTruthy();

});
