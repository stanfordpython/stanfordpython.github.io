import React, { FunctionComponent } from "react";
import courseInfoLinks from "../res/courseInfoLinks.json";

function obfuscate( name: string, domain:string, em_name:string ) { 
    // Citation: Dan Jurafsky for this function.
    return { __html: name + ' (' + em_name + '@' + domain + ')'}; 
}

function email_both(msg: string, domain:string, em_name1:string, 
                    em_name2:string) { 
    // Creates obfuscated hyperlink to email both Parth and Michael
    return { 
        // eslint-disable-next-line
        __html: ' <a href=' + '"mai' + 'lto:' + em_name1 + '@' + domain + ',' 
                + em_name2 + '@' + domain + '">' + msg + '</a>'
    }; 
}

const CourseInfo: FunctionComponent<{}> = () => {
    let essentialLinks: JSX.Element[] = []; 
    for (let [key, value] of Object.entries(courseInfoLinks)) {
        essentialLinks.push(
            <><a href={value}>{key}</a><br /></>
        );
    }

    return (
    <div className="course-info">
        <h2>Course Info</h2>
        <p className="lead">
            The fundamentals and contemporary usage of the Python 
            programming language. Primary focus on developing best 
            practices in writing Python and exploring the extensible and 
            unique parts of Python that make it such a powerful language.
        </p>
        <dl className="lead row at-a-glance">
            <dt className="text-md-right col-md-2">Date / Time</dt>
            <dd className="col-md-10">
                Tuesday &amp; Thursday @ 3:15pm PT to 4:45pm PT
            </dd>

            <dt className="text-md-right col-md-2">Instructors</dt>
            <dd className="col-md-10">
                <div dangerouslySetInnerHTML={obfuscate("Parth Sarin", "stanford.edu", "psarin")}/>
                <div dangerouslySetInnerHTML={obfuscate("Tara Jones", "stanford.edu", "tarabeth")}/>
                <div dangerouslySetInnerHTML={email_both("Email Parth and Tara", "stanford.edu", "psarin", "tarabeth")}/>
            </dd>

            {/* <dt className="text-md-right col-md-2">Office Hours</dt>
            <dd className="col-md-10">
                <div>Tara: TBD</div>
                <div>Parth: TBD</div>
            </dd> */}

            <dt className="text-md-right col-md-2">Course Staff</dt>
            <dd className="col-md-10">
                <div>TBD</div>
                    <div dangerouslySetInnerHTML={email_both("Interested in TAing? Reach out!", "stanford.edu", "psarin", "tarabeth")}></div>
                {/* <div>Antonio Ferris</div>
                <div>Elizabeth Fitzgerald</div>
                <div>Jose Francisco</div>
                <div>Max Pike</div>
                <div>Theo Culhane</div> */}
            </dd>

            <dt className="text-md-right col-md-2">Prereqs</dt>
            <dd className="col-md-10">CS106B/X or equivalent</dd>

            <dt className="text-md-right col-md-2">Spotify Playlist</dt>
            <dd className="col-md-10">
                <a href="https://open.spotify.com/playlist/1pn8cUoKsLlOfX7WEEARz4?si=jKogUQTsSDmqu6RbSBGfGA">
                    <span role="img" aria-label="unicorn face">🦄</span> 
                    &nbsp;CS 41
                </a> (contribute!)
            </dd>
            <dt className="text-md-right col-md-2">Essential Links</dt>
            <dd className="col-md-10">
                {essentialLinks}
            </dd>
        </dl>
    </div>
    );
}

export default CourseInfo
