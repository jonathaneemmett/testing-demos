import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';

const Layout = ({ children }) => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Navbar />
			<Container>
				<CssBaseline />
				{children}
			</Container>
		</Box>
	);
};

export default Layout;
