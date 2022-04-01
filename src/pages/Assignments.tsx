import React, { FunctionComponent } from "react";

import { AssignmentData } from "../components/AssignmentTable";

const Assignments: FunctionComponent = () => (
    <div className="assignments">
        <h2>Assignments</h2>
        <p>
            Assignments in CS41 are a chance to show us what you've learned in 
            the course! As a 2-unit CR/NC course, we don't want anyone to be 
            unduly stressed about the assignments. We will not assign an evaluative
            mark to any of the assignments in this course. Instead, we will give you 
            extensive feedback on your work. We think assignments 
            are an opportunity to challenge yourself to really learn the 
            material, so enjoy! We hope you have fun completing these 
            assignments.
        </p>
       <AssignmentData />
    </div>
);

export default Assignments;
