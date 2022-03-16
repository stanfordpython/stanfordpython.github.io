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
            <dt className="text-md-right col-md-2">Instructors</dt>
            <dd className="col-md-10">
                <div dangerouslySetInnerHTML={obfuscate("Parth Sarin", "stanford.edu", "psarin")}/>
                <div dangerouslySetInnerHTML={obfuscate("Tara Jones", "stanford.edu", "tarabeth")}/>
                <div dangerouslySetInnerHTML={email_both("Email Parth and Tara", "stanford.edu", "psarin", "tarabeth")}/>
            </dd>

            <dt className="text-md-right col-md-2">Office Hours</dt>
            <dd className="col-md-10">
                    <div>Parth: <a href="https://calendly.com/psarin/office-hours" rel="noopener noreferrer" target="_blank">Calendly</a></div>
                <div>Tara: <a href="mailto:tarabeth@stanford.edu">Email</a></div>
            </dd>

            <dt className="text-md-right col-md-2">Course Staff</dt>
            <dd className="col-md-10">
                <div>Theo Culhane</div>
                <div>Elizabeth Fitzgerald</div>
                <div>Arpit Ranasaria</div>
            </dd>

            <dt className="text-md-right col-md-2">Prereqs</dt>
            <dd className="col-md-10">CS106B/X or equivalent</dd>

            <dt className="text-md-right col-md-2">Essential Links</dt>
            <dd className="col-md-10">
                {essentialLinks}
            </dd>
        </dl>
    </div>
    );
}

export default CourseInfo
