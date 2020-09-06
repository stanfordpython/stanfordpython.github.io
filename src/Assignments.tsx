import React, { FunctionComponent } from "react";

import { AssignmentData } from "./AssignmentTable";
import { SiteHeader } from "./SiteHeader";

const Assignments: FunctionComponent = () => (
    <>
        <SiteHeader />
        <AssignmentData />
    </>
);

export default Assignments;