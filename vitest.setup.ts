import { server } from './src/mocks/server';
import '@testing-library/jest-dom/vitest';

// Set timezone to UTC to avoid timezone issues in tests
process.env.TZ = 'UTC';

beforeAll(() => {
  // 👀 Enable the mocking in tests.
  server.listen();
});

afterEach(() => {
  // 🔁 Reset any runtime handlers tests may use.
  server.resetHandlers();
});

afterAll(() => {
  // 🚿 Clean up once the tests are done.
  server.close();
});
