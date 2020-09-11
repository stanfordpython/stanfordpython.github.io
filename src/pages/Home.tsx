import React, { FunctionComponent } from "react";

import { Schedule } from "../components/Schedule";
import SiteHeader from "../components/SiteHeader";

const Home: FunctionComponent = () => (
    <div className="home">
        <SiteHeader />
        <Schedule/>
    </div>
)

export default Home;