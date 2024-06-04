# playwright

- npm init playwright@latest //Install
- npx playwright test // Start test
- npx playwright show-report // Show test reports
- npx playwright test --project=chromium // To run only specific browser
- npx playwright test example.spec.ts --project=chromium --headed // To run only specific test
- npx playwright test -g "get started link" // to run only specific test with title
- npx playwright test --project=chromium --headed
- npx playwright test --ui // to run in ui
- npx playwright test --project=firefox --trace on // get details with screenshot
- npx playwright test --project=firefox --debug // to run debug mode see step by step
- to avoid dublicated test use beforeEach() hook
- use more detailed selector like user behavior page.getByRole('button',{name:/submit/i})
- add data-testid='SignIn' test attiribute in your app code to find page.getByTestId() locator
- Click f8 to see tooltip details when you are in source tab
- Use extends to get inheritance from other class like class NavigationPage extends HelperBase
- To change specific test retry number use this code in test block test.describe.configure({retries:2}) it should be in describe method
- To clean database or something after retry use in the test as a second parameter testInfo testInfo.retry
