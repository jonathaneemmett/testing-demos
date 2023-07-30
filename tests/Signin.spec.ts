import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:3000/');
});

test.describe('Signin', () => {
	test('should display the signin form', async ({ page }) => {
		await page.getByRole('button', { name: 'Login' }).click();
		expect(await page.getByLabel('Email Address *')).toBeTruthy();
	});

	test('should fail to signin with invalid credentials', async ({ page }) => {
		await page.getByRole('button', { name: 'Login' }).click();
		const emailInput = page.getByLabel('Email Address *');
		const passwordInput = page.getByLabel('Password *');

		await emailInput.click();
		await emailInput.fill('joe@gmai.com');
		await emailInput.press('Tab');
		await passwordInput.fill('12345');
		await page.getByRole('button', { name: 'Sign In' }).click();

		expect(
			await page.isVisible('text=Invalid Username or Password'),
		).toBeTruthy();

		await emailInput.click();
		await emailInput.fill('');
		await emailInput.fill('joe@gmail.com');
		await emailInput.press('Tab');
		await passwordInput.click();
		await passwordInput.fill('');
		await passwordInput.fill('12345');
		await page.getByRole('button', { name: 'Sign In' }).click();

		expect(
			await page.isVisible('text=Invalid Username or Password'),
		).toBeTruthy();
	});

	test('should signin with valid credentials', async ({ page }) => {
		await page.getByRole('button', { name: 'Login' }).click();
		const emailInput = page.getByLabel('Email Address *');
		const passwordInput = page.getByLabel('Password *');

		await emailInput.click();
		await emailInput.fill('joe@gmail.com');
		await emailInput.press('Tab');
		await passwordInput.fill('123456');
		await page.getByRole('button', { name: 'Sign In' }).click();

		expect(
			await page.getByRole('heading', { name: 'Welcome, Joe Doe' }),
		).toBeTruthy();
	});

	test('should logout', async ({ page }) => {
		await page.getByRole('button', { name: 'Login' }).click();
		const emailInput = page.getByLabel('Email Address *');
		const passwordInput = page.getByLabel('Password *');

		await emailInput.click();
		await emailInput.fill('joe@gmail.com');
		await emailInput.press('Tab');
		await passwordInput.fill('123456');
		await page.getByRole('button', { name: 'Sign In' }).click();

		expect(
			await page.getByRole('heading', { name: 'Welcome, Joe Doe' }),
		).toBeTruthy();

		await page.getByRole('button', { name: 'Logout' }).click();

		expect(
			await page.getByRole('heading', { name: 'Welcome, Guest' }),
		).toBeTruthy();
	});
});
