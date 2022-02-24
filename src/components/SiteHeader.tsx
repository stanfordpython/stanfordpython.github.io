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
                Tuesdays &amp; Thursdays, 3:15pm - 4:45pm, McMurtry 350<br />
                </div>
            </Col>
        </Row>
        </div>
    )
}

export default SiteHeader;
