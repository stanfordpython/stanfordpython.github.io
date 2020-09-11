import React, { FunctionComponent } from "react";

import { LectureData } from "../components/LectureTable";
import SiteHeader from "../components/SiteHeader";

const Lectures: FunctionComponent = () => (
    <div className="lectures">
        <SiteHeader />
        <LectureData />
    </div>

)

export default Lectures;