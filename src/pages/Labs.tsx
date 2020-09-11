import React, { FunctionComponent } from "react";

import { LabData } from "../components/LabTable";
import SiteHeader from "../components/SiteHeader";

const Labs: FunctionComponent = () => (
    <div className="labs">
        <SiteHeader />
        <LabData />
    </div>
);

export default Labs;