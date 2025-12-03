import {test} from "@playwright/test";
import { beforeEach } from "node:test";

test("Get student", async({request}) => {
    
   const headers = {API_KEY: "test_api_jg_key_123"}
   const response = await request.get("https://test-379574553568.us-central1.run.app/student", {headers: headers});
   console.log(await response.json());
});

test("Get one student", async({request}) => {
    const headers = {API_KEY: "test_api_jg_key_123"}
    const studentId = "2"
    const response = await request.get(`https://test-379574553568.us-central1.run.app/student/${studentId}`, {headers: headers});
    console.log(await response.json());
});

