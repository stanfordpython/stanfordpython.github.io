import React, { FunctionComponent } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import logo from "../res/logo.png";

const SiteHeader: FunctionComponent<{}> = () => {
    return (
        <div>
        <Row className="mb-4">
            <Col md={2} className="d-none d-md-block align-self-center text-center">
                <img id="logo" src={logo} alt="Stanford Logo" />
            </Col>
            <Col md={10} className="align-self-center">
                <h1>CS 41: The Python Programming Language</h1>
                <div className="lead" id="subtitle-header">
                Tuesdays &amp; Thursdays, 2:30pm - 3:50pm<br />
                <a href="https://canvas.stanford.edu/courses/136265/external_tools/5384">Zoom Info (on Canvas)</a>
                </div>
            </Col>
        </Row>
        </div>
    )
}

export default SiteHeader;
