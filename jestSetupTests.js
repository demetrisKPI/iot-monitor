jest.useFakeTimers();

beforeAll(() => {});

afterAll(() => {});

expect.extend({
  toBeAnything() {
    return {
      message: 'Expected anything',
      pass: true,
    };
  },
});
