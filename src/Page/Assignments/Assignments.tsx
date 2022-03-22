import React, { FunctionComponent } from "react";

import AssignmentTable from "./AssignmentTable";

const Assignments: FunctionComponent = () => (
    <div className="assignments">
        <h2>Assignments</h2>
        <p>
            Assignments in CS41 are a chance to show us what you've learned in 
            the course! As a 2-unit CR/NC course, we don't want anyone to be 
            unduly stressed about the assignments. Grades are given on the 
            checkmark scale, and more importantly, submitted solutions will 
            receive style feedback from the course staff. We think assignments 
            are an opportunity to challenge yourself to really learn the 
            material, so enjoy! We hope you have fun completing these 
            assignments.
        </p>
       <AssignmentTable />
    </div>
);

export default Assignments;