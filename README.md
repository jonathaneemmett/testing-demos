# Playwright "Study"

This is a study of playwright for e2e testing.

https://playwright.dev/docs/writing-tests

## Supported Languages

-   JavaScript/TypeScript
-   Python
-   Java
-   .Net

## To use

Download/clone and run:

    yarn install

or

    npm install

Runs the end-to-end tests.

    npx playwright test

Starts the interactive UI mode.

    npx playwright test --ui

Runs the tests only on Desktop Chrome.

    npx playwright test --project=chromium

Runs the tests in a specific file.

    npx playwright test example

Runs the tests in debug mode.

    npx playwright test --debug

Auto generate tests with Codegen, site must be running/accessible locally or web.

    npx playwright codegen <url of website (http://localhost:3000)>

## basic testing thoughts

As with all test frameworks the syntax is very similar to Jest, with some minor differences of course.

    import { test, expect } from '@playwright/test';

    test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
    });

    test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
    });

You will notice that playwright uses async/await extensively, this becomes very handy when wait for things like a login for instance.
