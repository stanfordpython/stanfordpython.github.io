import React, { FunctionComponent } from "react";

import LectureTable from "./LectureTable";

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
       <LectureTable />
    </div>

)

export default Lectures;