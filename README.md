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
- To skip a test add skip method beside to test
- To run parallel tests update playwright configuration fullyParallel:true
- To change text orders add prefix to test name 001-test.spec.ts like this
- To run parallel test in a describe method you parallel beside to describe test.describe.parallel
- To run all describe in a spec file use at the top of page test.describe.configure({mode:'parallel'})
- Run test with specific config file npx playwright test --config=playwright-prod.config.ts
- Run specific test with tag npx playwright test --project=chromium --grep @smoke

## Creating Docker

- Create a Dockerfile in the root folder
- Add FROM mcr.microsoft.com/playwright:v1.43.0-jammy version should be same as package.json playwright version
- RUN mkdir /app
- WORKDIR /app
- COPY . /app/
- RUN npm install --force
- RUN npx playwright install
- In the terminal docker build -t diwi-test .
- To check if image created successfully type in terminal docker images
- To run image docker run -it diwi-test
- npm run test-runner test-runner (comes from package.json scripts to run test)
- Create a docker compose file to save results in local. In the root folder create docker-compose.yaml
- version:'3.8'
- services:
  playwright-test:
  image: playwright-test
  build:
  context: .
  dockerfile: ./Dockerfile
  command: npm run test-runner (comes from package.json scripts to run test)
  volumes:
  - ./playwright-report/:/app/playwright-report
  - ./test-results/:/app/test-results
- Then run in terminal docker-compose up --build
