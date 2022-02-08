import React, { FunctionComponent } from "react";

import { Schedule } from "../components/Schedule";
import SiteHeader from "../components/SiteHeader";
import CourseInfo from "../components/CourseInfo";

const Home: FunctionComponent = () => (
    <div className="home">
        <SiteHeader />
        <CourseInfo />
    </div>
)

export default Home;
