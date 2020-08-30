import React from "react";

import { Schedule } from "./Schedule";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import logo from "./logo.png";

export const Home = () => (
    <div className="home">
        <Row>
            <Col md={2} className="d-none d-md-block align-self-center text-center">
                <img id="logo" src={logo} alt="Stanford Logo" />
            </Col>
            <Col md={10} className="align-self-center">
                <h1>CS 41: The Python Programming Language</h1>
                <div className="lead" id="subtitle-header">
                Tuesday & Thursday @ 2:30pm - 3:50pm<br />
                Join URL: TODO
                <br />
                Contribute to our&nbsp;
                <a href="https://open.spotify.com/playlist/1pn8cUoKsLlOfX7WEEARz4?si=tOdALf44SAOcCvW6P7M5Qw">
                Spotify Playlist
                </a>!
                </div>
            </Col>
        </Row>
        <br></br>
        <Schedule/>

    </div>

)