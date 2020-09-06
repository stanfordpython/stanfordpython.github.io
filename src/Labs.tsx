import React, { FunctionComponent } from "react";

import { LabData } from "./LabTable";
import { SiteHeader } from "./SiteHeader";

const Labs: FunctionComponent = () => (
    <div className="labs">
        <SiteHeader />
        <LabData />
    </div>
);

export default Labs;