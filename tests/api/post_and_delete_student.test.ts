import {expect, test} from "@playwright/test";
import { beforeEach } from "node:test";

test("Post and Delete a student", async({request}) => {
   // Arrange
   const headers = {API_KEY: "test_api_jg_key_123"}
   const student = {
      name: "Testsson",
      age: 1,
      grade: "F"
   }

   // Act 
   const response = await request.post("https://test-379574553568.us-central1.run.app/student/", 
      {headers: headers, data:student});
   // Assert
   expect(response.ok()).toBeTruthy();
   const createdStudent = await response.json();
   const studentId = createdStudent.student_id;
   
   console.log("Student Id is ", studentId);

   // Delete the student
   const deleteResponse =  await request.delete(`https://test-379574553568.us-central1.run.app/student/${studentId}`, {headers: headers});
   expect(deleteResponse.ok()).toBeTruthy();
   console.log(`Student with ID ${studentId} deleted successfully.`);
});



