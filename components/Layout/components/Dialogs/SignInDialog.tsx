import React, { useState } from 'react';
import {
	Avatar,
	Box,
	Button,
	Container,
	CssBaseline,
	Dialog,
	DialogContent,
	TextField,
	Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from 'context/AuthContext';

const SignInDialog = ({ open, setOpen }) => {
	const { login } = useAuth();
	const [error, setError] = useState(null);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const credentials = {
			email: data.get('email').toString(),
			password: data.get('password').toString(),
		};

		try {
			let res = await login(credentials);
			handleClose();
		} catch (err: any) {
			setError(err.message);
		}
	}

	function handleClose() {
		setError(null);
		setOpen(false);
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogContent>
				<Container component='main' maxWidth='xs'>
					<CssBaseline />
					<Box
						sx={{
							marginTop: 1,
							marginBottom: 1,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Sign in
						</Typography>
						<Box
							component='form'
							onSubmit={handleSubmit}
							noValidate
							sx={{ mt: 1 }}>
							<TextField
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								autoFocus
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
							/>
							{error && (
								<Typography
									variant='body1'
									color='error'
									align='center'>
									{error}
								</Typography>
							)}
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}>
								Sign In
							</Button>
						</Box>
					</Box>
				</Container>
			</DialogContent>
		</Dialog>
	);
};

export default SignInDialog;
