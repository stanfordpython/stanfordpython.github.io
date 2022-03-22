import React, { PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';

const Layout = (props: PropsWithChildren<{}>) => (
	<Container className='mt-2'>
		{props.children}
	</Container>
)

export default Layout;