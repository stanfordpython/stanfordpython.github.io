import React, { FunctionComponent } from "react";

// import { Schedule } from "../components/Schedule";
import SiteHeader from "../components/SiteHeader";
import CourseInfo from "../components/CourseInfo";
import { Alert } from "react-bootstrap";

const Home: FunctionComponent = () => (
    <div className="home">
        <Alert variant="success" className="mt-4">
            <Alert.Heading>
                <h2 className="mt-0">Enrollment Issues</h2>
            </Alert.Heading>
            <p className="mb-1">
                There have been some issues with course enrollment through Axess,
                but they should be resolved now. If you have any issues, please
                contact the course staff for a permission number: 
                <a href="mailto:psarin@stanford.edu,tarabeth@stanford.edu">email Parth and Tara</a>.
            </p>
        </Alert>
        <SiteHeader />
        <CourseInfo />
    </div>
)

export default Home;
