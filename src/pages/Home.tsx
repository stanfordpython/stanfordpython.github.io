import React, { FunctionComponent } from "react";

import { Schedule } from "../components/Schedule";
import SiteHeader from "../components/SiteHeader";
import CourseInfo from "../components/CourseInfo";

import Alert from 'react-bootstrap/Alert';

const Home: FunctionComponent = () => (
    <div className="home">
        <SiteHeader />
        <Alert variant='info'>
            Looking for an older version of this site? Check out&nbsp;
            <Alert.Link href="https://stanfordpython.com/archive">the archive
            </Alert.Link>.
        </Alert>
        <CourseInfo />
        <Schedule/>
    </div>
)

export default Home;