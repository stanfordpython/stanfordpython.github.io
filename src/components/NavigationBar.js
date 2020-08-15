import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
	.navbar {
		background-color: #222;
	}
	.navbar-brand, .navbar-nav .nav-link {
		color: #bbb;
		&:hover{
			color: white;
		}
	}
`;

export const NavigationBar = () => (
	<Styles>
		<Navbar variant="dark" expand="lg">
			<Navbar.Brand href="/">CS 41: Hap.py Code, The Python Programming Language</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					<RouterNavLink to="/">Home</RouterNavLink>
					<RouterNavLink to="/lectures/">Lectures</RouterNavLink>
					<RouterNavLink to="/labs/">Labs</RouterNavLink>
					<RouterNavLink to="/assignments/">Assignments</RouterNavLink>

				</Nav>

			</Navbar.Collapse>

		</Navbar>
	</Styles>
)

const RouterNavLink = ({ children, ...props }) => (
  <LinkContainer exact {...props}>
    <Nav.Link active={false}>
      {children}
    </Nav.Link>
  </LinkContainer>
)