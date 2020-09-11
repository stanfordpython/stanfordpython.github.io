import React, { FunctionComponent } from "react";

import { AssignmentData } from "../components/AssignmentTable";
import SiteHeader from "../components/SiteHeader";

const Assignments: FunctionComponent = () => (
    <div className="assignments">
        <SiteHeader />
        <AssignmentData />
    </div>
);

export default Assignments;