import React, { FunctionComponent } from "react";

import { Schedule } from "./Schedule";
import SiteHeader from "./SiteHeader";

const Home: FunctionComponent = () => (
    <div className="home">
        <SiteHeader />
        <Schedule/>
    </div>
)

export default Home;