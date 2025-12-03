import {expect, test} from "@playwright/test";
import { beforeEach } from "node:test";

test("Post and Get student", async({request}) => {
   // Arrange
   const headers = {API_KEY: "test_api_jg_key_123"}
   const student = {
      name: "Jan",
      age: 44,
      grade: "A"
   }

   // Act 
   const response = await request.post("https://test-379574553568.us-central1.run.app/student/", {headers: headers, data:student});
   // Assert
   expect(response.ok()).toBeTruthy();
   const createdStudent = await response.json();
   const studentId = createdStudent.student_id;
   
   console.log("Student Id is ", studentId);
   const responseStudent = await request.get(`https://test-379574553568.us-central1.run.app/student/${studentId}`, {headers: headers});
   console.log(await responseStudent.json());
   expect(responseStudent.ok()).toBeTruthy();
});

//Next assignment Create a student and delete a student



