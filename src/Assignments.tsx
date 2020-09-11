import React, { FunctionComponent } from "react";

import { AssignmentData } from "./AssignmentTable";
import SiteHeader from "./SiteHeader";

const Assignments: FunctionComponent = () => (
    <div className="assignments">
        <SiteHeader />
        <AssignmentData />
    </div>
);

export default Assignments;