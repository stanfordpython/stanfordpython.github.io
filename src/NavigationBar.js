import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const NavigationBar = () => {
	const [expanded, setExpanded] = useState(false);

	return (
		<Navbar 
			onToggle={(e) => { setExpanded(e) }} 
			expanded={expanded}
			variant="dark" 
			expand="lg"
		>
			<Navbar.Brand href="/">CS 41</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto" onSelect={() => { setExpanded(false) }}>
					<RouterNavLink to="/">Home</RouterNavLink>
					<RouterNavLink to="/lectures">Lectures</RouterNavLink>
					<RouterNavLink to="/labs">Labs</RouterNavLink>
					<RouterNavLink to="/assignments">Assignments</RouterNavLink>
				</Nav>
			</Navbar.Collapse>

		</Navbar>
	);
}

const RouterNavLink = ({ children, ...props }) => (
  <LinkContainer exact {...props}>
    <Nav.Link active={false}>
      {children}
    </Nav.Link>
  </LinkContainer>
)