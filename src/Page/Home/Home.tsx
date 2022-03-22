import React, { FunctionComponent } from "react";

import Schedule from "./Schedule";
import SiteHeader from "./SiteHeader";
import CourseInfo from "./CourseInfo";

const Home: FunctionComponent = () => (
    <div className="home">
        <SiteHeader />
        <CourseInfo />
    </div>
)

export default Home;
