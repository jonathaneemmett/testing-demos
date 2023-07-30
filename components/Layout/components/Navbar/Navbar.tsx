import React, { useState } from 'react';

import {
	AppBar,
	Box,
	Button,
	IconButton,
	Toolbar,
	Typography,
	styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SignInDialog from '../Dialogs/SignInDialog';
import { useAuth } from 'context/AuthContext';

const StyledButton = styled(Button)({
	color: 'white',
});

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const { isLoggedIn, logout } = useAuth();
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<Typography
						variant='h6'
						component='div'
						sx={{ flexGrow: 1 }}>
						News
					</Typography>
					{isLoggedIn ? (
						<StyledButton onClick={logout}>Logout</StyledButton>
					) : (
						<StyledButton onClick={() => setOpen(true)}>
							Login
						</StyledButton>
					)}
				</Toolbar>
			</AppBar>
			{open && <SignInDialog open={open} setOpen={setOpen} />}
		</Box>
	);
};

export default Navbar;
