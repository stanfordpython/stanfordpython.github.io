import React, { FunctionComponent } from "react";

import { LectureData } from "../components/LectureTable";

const Lectures: FunctionComponent = () => (
    <div className="lectures">
        <h2>Lecture Content</h2>
        <p>
            Lectures are generally once per week, and are intended 
            to fill the 80-minute class period. Each lecture covers 
            a particular aspect of the Python language or ecosystem. 
            Lectures build on each other - that is, the material 
            gets progressively more advanced throughout the quarter. 
            Slides are heavily animated, so both the compressed and 
            full versions of the slide decks are uploaded.
        </p>

        <p>
            We've provided these recordings by recording each Zoom
            meeting, which comes with its own limitations. In
            particular, these recordings aren't professional so
            please excuse background noise, incorrect
            transcriptions, etc etc. Our goal is that the videos are 
            a helpful learning resource, and hopefully they improve 
            the CS41 experience for you!
        </p>
        <LectureData />
    </div>

)

export default Lectures;