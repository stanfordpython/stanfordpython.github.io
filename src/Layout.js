import React from 'react';
import { Container } from 'react-bootstrap';

export const Layout = (props) => (
	<Container className='mt-2'>
		{props.children}
	</Container>

)