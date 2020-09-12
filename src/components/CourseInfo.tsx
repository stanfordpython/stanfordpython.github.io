import React, { FunctionComponent } from "react";
import courseInfoLinks from "../res/courseInfoLinks.json";
import ListGroup from "react-bootstrap/ListGroup";
import ReactHtmlParser from 'react-html-parser';

function obfuscate( domain:string, name:string ) { 
    // Citation: Dan Jurafsky for this function.
    return '<a href="mai' + 'lto:' + name + '@' + domain + '">' + name + '@' + domain + '</' + 'a>'; 
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
        <h4>Essential Links</h4>
        <ListGroup horizontal className="lead">
            {essentialLinks}
        </ListGroup>
        <h4>Basic Info</h4>
            <dl className="lead row">
                <dt className="text-right col-md-3">Date / Time</dt>
                <dd className="col-md-9">
                    Tuesday &amp; Thursday @ 2:30pm PT to 3:50pm PT
                </dd>

                <dt className="text-right col-md-3">Location</dt>
                <dd className="col-md-9">Remote @ TBD</dd>

                <dt className="text-right col-md-3">Instructors</dt>
                <dd className="col-md-9">
                    Parth ({ ReactHtmlParser (obfuscate("stanford.edu", "psarin"))})<br />
                    Michael ({ ReactHtmlParser (obfuscate("stanford.edu", "coopermj"))})
                </dd>

                <dt className="text-right col-md-3">Course Staff</dt>
                <dd className="col-md-9">We're currently looking for TAs! Email us if you're interested!</dd>

                <dt className="text-right col-md-3">Prereqs</dt>
                <dd className="col-md-9">CS106B/X or equivalent</dd>

                <dt className="text-right col-md-3">Spotify Playlist</dt>
                <dd className="col-md-9">
                    <a href="https://open.spotify.com/playlist/1pn8cUoKsLlOfX7WEEARz4?si=jKogUQTsSDmqu6RbSBGfGA">
                        <span role="img" aria-label="unicorn face">🦄</span> 
                        CS 41
                    </a> (contribute!)
                </dd>
            </dl>
    </div>
    );
}

export default CourseInfo