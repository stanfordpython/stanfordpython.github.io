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
                Tuesday & Thursday @ 2:30pm - 3:50pm<br />
                Join URL: <a href="https://www.youtube.com/watch?v=ulsLI029rH0">See you in Spring!</a>
                <br />
                Contribute to our&nbsp;
                <a href="https://open.spotify.com/playlist/1pn8cUoKsLlOfX7WEEARz4?si=tOdALf44SAOcCvW6P7M5Qw">
                Spotify Playlist
                </a>!
                </div>
            </Col>
        </Row>
        </div>
    )
}

export default SiteHeader;