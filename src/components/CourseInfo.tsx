import React, { FunctionComponent } from "react";
import courseInfoLinks from "../res/courseInfoLinks.json";
import ListGroup from "react-bootstrap/ListGroup";

function obfuscate( name: string, domain:string, em_name:string ) { 
    // Citation: Dan Jurafsky for this function.
    // eslint-disable-next-line
    return { __html: name + ' (' + em_name + '@' + domain + ')'}; 
}

function email_both(msg: string, domain:string, em_name1:string, 
                    em_name2:string) { 
    // Creates obfuscated hyperlink to email both Parth and Michael
    // eslint-disable-next-line
    return { 
        __html: ' <a href=' + '"mai' + 'lto:' + em_name1 + '@' + domain + ',' 
                + em_name2 + '@' + domain + '">' + msg + '</a>'
    }; 
}

const CourseInfo: FunctionComponent<{}> = () => {
    let essentialLinks: JSX.Element[] = []; 
    for (let [key, value] of Object.entries(courseInfoLinks)) {
        essentialLinks.push(
            <ListGroup.Item action key={key} href={value}>{key}</ListGroup.Item>
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
        <h4>At A Glance</h4>
            <dl className="lead row">
                <dt className="text-md-right col-md-3">Date / Time</dt>
                <dd className="col-md-9">
                    Tuesday &amp; Thursday @ 2:30pm PT to 3:50pm PT
                </dd>

                <dt className="text-md-right col-md-3">Location</dt>
                <dd className="col-md-9">Remote @ TBD</dd>

                <dt className="text-md-right col-md-3">Instructors</dt>
                <dd className="col-md-9">
                    <div dangerouslySetInnerHTML={obfuscate("Parth Sarin", "stanford.edu", "psarin")}/>
                    <div dangerouslySetInnerHTML={obfuscate("Michael Cooper", "stanford.edu", "coopermj")}/>
                    <div dangerouslySetInnerHTML={email_both("Email Parth and Michael", "stanford.edu", "psarin", "coopermj")}/>
                </dd>

                <dt className="text-md-right col-md-3">Course Staff</dt>
                <dd className="col-md-9">
                    We're currently looking for TAs! 
                    <span dangerouslySetInnerHTML={email_both(
                        "Email us", 
                        "stanford.edu", 
                        "psarin", "coopermj"
                    )} />
                    &nbsp;if you're interested!
                </dd>

                <dt className="text-md-right col-md-3">Prereqs</dt>
                <dd className="col-md-9">CS106B/X or equivalent</dd>

                <dt className="text-md-right col-md-3">Spotify Playlist</dt>
                <dd className="col-md-9">
                    <a href="https://open.spotify.com/playlist/1pn8cUoKsLlOfX7WEEARz4?si=jKogUQTsSDmqu6RbSBGfGA">
                        <span role="img" aria-label="unicorn face">🦄</span> 
                        &nbsp;CS 41
                    </a> (contribute!)
                </dd>
            </dl>
        <h4>Essential Links</h4>
        <ListGroup horizontal className="lead">
            {essentialLinks}
        </ListGroup>
    </div>
    );
}

export default CourseInfo