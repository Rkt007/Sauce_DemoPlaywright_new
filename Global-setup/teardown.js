// Global teardown for Playwright tests
export default async function globalTeardown() {
  // Add any global teardown logic here, e.g., cleanup, database teardown, etc.
  console.log('Global teardown executed');
}