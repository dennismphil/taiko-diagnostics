jest.mock('../../src/helpers');
import { openBrowser, goto, closeBrowser, diagnostics } from 'taiko';
const { logConsoleInfo } = diagnostics;
// eslint-disable-next-line import/named
import { logger } from '../../src/helpers';
import path from 'path';

jest.setTimeout(30000);
beforeEach(async () => {
  await openBrowser();
});

afterEach(async () => {
  await closeBrowser();
});

xtest('Should print unhandled exception message into console', async () => {
  await logConsoleInfo();
  let fielPath = path.resolve(
    './integration/__tests__/data/unhandledException.html'
  );
  await goto(path.join('file://', fielPath));

  let expectedMessage = `Error: Test unhandled exception
    at throwsException (file://${fielPath}:4:19)
    at file://${fielPath}:6:9`;
  expect(logger.mock.calls[0][0]).toBe(expectedMessage);
});

xtest('Should print error message into console', async () => {
  await logConsoleInfo();
  let fielPath = path.resolve('./integration/__tests__/data/log.html');
  await goto(path.join('file://', fielPath));
  const responseData = {
    level: expect.any(String),
    source: expect.any(String),
    url: expect.any(String)
  };
  expect(logger.mock.calls[1][0]).toEqual(responseData);
});

xtest('Should print console.log', async () => {
  await logConsoleInfo();
  let fielPath = path.resolve('./integration/__tests__/data/console.html');
  await goto(path.join('file://', fielPath));
  const responseData = {
    type: expect.any(String),
    value: expect.any(String),
    url: expect.any(String)
  };
  expect(logger.mock.calls[3][0]).toEqual(responseData);
});
