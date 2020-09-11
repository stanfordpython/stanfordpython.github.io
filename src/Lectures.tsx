import React, { FunctionComponent } from "react";

import { LectureData } from "./LectureTable";
import SiteHeader from "./SiteHeader";

const Lectures: FunctionComponent = () => (
    <div className="lectures">
        <SiteHeader />
        <LectureData />
    </div>

)

export default Lectures;