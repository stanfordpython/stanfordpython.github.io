import React, { FunctionComponent } from "react";

// import { Schedule } from "../components/Schedule";
import SiteHeader from "../components/SiteHeader";
import CourseInfo from "../components/CourseInfo";
import { Alert } from "react-bootstrap";

const Home: FunctionComponent = () => (
    <div className="home">
        <Alert variant="danger" className="mt-4">
            <Alert.Heading>
                <h2 className="mt-0">Enrollment Issues</h2>
            </Alert.Heading>
            <p>
                We're having some issues with course enrollment through Axess.
                If you try to enroll, you might encounter an issue where you
                have to select a discussion section, but none of them are open,
                preventing you from enrolling in the course. Sorry for the 
                stress! We are able to accept anyone who wants to enroll in the
                course and we're working on fixing this. Thanks for your 
                patience 💜
            </p>
        </Alert>
        <SiteHeader />
        <CourseInfo />
    </div>
)

export default Home;
