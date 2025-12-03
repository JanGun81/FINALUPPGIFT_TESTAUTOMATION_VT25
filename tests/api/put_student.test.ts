import {expect, test} from "@playwright/test";
import { beforeEach } from "node:test";

test("Put a student", async({request}) => {
   // Arrange
   const headers = {API_KEY: "test_api_jg_key_123"}
   const student= {
      name: "Jon Doe",
      age: 22,
      grade: "VG"
   }
   // Act
   const response = await request.post("https://test-379574553568.us-central1.run.app/student", {headers: headers, data:student });
   console.log(await response.json());
   // Assert
   const createdStudent = await response.json();
   const studentId = createdStudent.student_id;
   console.log("Student Id is ", studentId);
   expect(response.ok()).toBeTruthy();
   // Update the student
   // Arrange
    const updatedStudent = await response.json();
    updatedStudent.name = "Jao Doe";
    updatedStudent.age = 23;
    updatedStudent.grade = "A";
    // Act
    const putResponse = await request.put(`https://test-379574553568.us-central1.run.app/student/${studentId}`, {headers: headers, data: updatedStudent});
    // Assert
    expect(putResponse.ok()).toBeTruthy();
    const putResponseData = await putResponse.json();
    console.log("Updated Student: ", putResponseData);

});

test ("Create a student and get a student", async({request}) => {
    const URL = "https://test-379574553568.us-central1.run.app/student/"

    // Arrange
    const headers = {API_KEY: "test_api_jg_key_123"}

    const studentData= {
    name: "Anna Andersson",
    age: 20,
    grade: "G"
    }
    //Act
    const postResponse = await request.post(URL, {headers: headers, data:studentData });
    //Assert
    //Verify that name, age and grade are correct
    expect(postResponse.ok()).toBeTruthy();
    const createdStudent = await postResponse.json();
    console.log("Created Student: ", createdStudent);
    const studentId = createdStudent.student_id;
    expect(studentId).toBeDefined();
    console.log("Student Id is ", studentId);

    // Get created student
    const getStudentResp = await request.get(URL+studentId, {headers: headers});
    expect(getStudentResp.ok()).toBeTruthy();
    const getStudentData = await getStudentResp.json();
    console.log("Retrieved Student: ", getStudentData);
    expect(getStudentData.student_id).toBe(studentId);
    expect(getStudentData.name).toBe("Anna Andersson");
    expect(getStudentData.age).toBe(20);
    expect(getStudentData.grade).toBe("G");

    //Post condition - delete the created student
    const deleteResponse =  await request.delete(`https://test-379574553568.us-central1.run.app/student/${studentId}`, {headers: headers});
    expect(deleteResponse.ok()).toBeTruthy();
    console.log(`Student with ID ${studentId} deleted successfully.`);
});
