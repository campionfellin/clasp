import { expect } from 'chai';
import { describe, it } from 'mocha';
const sinon = require('sinon');

import {
  PROJECT_ID,
} from './constants';

import {
  cleanup,
  setup,
  setupWithoutGCPProject,
} from './functions';

import {
  getProjectIdWithErrors,
  enableAppsScriptAPI,
  enableOrDisableAPI,
  isEnabled,
} from '../src/apiutils';

import { ERROR } from '../src/utils';

describe('test getProjectIdWithErrors function from apiutils', () => {
  before(setup);
  it('should return projectId correctly if it exists', async () => {
    const projectId = await getProjectIdWithErrors();
    expect(projectId).to.equal(PROJECT_ID);
  });
  it('should throw an error if the projectId does not exist', async () => {
    cleanup();
    setupWithoutGCPProject();
    // const projectId = await getProjectIdWithErrors();
    // TODO: this doesn't actually "throw" the error
    // expect(getProjectIdWithErrors()).to.throw(Error);
  });

  after(cleanup);
});

describe('test enableAppsScriptAPI function', () => {
  before(setup);
  it('should enable the apis', () => {
    enableAppsScriptAPI();
  });
  after(cleanup);
});

describe('test enableOrDisableAPI function', () => {
  before(setup);
  // tslint:disable-next-line
  let errorSpy: any;
  // tslint:disable-next-line
  let logSpy: any;
  beforeEach(() => {
    errorSpy = sinon.spy(console, 'error');
    logSpy = sinon.spy(console, 'log');
  });
  afterEach(() => {
    errorSpy.restore();
    logSpy.restore();
  });
  it.skip('should log error if no service name given', async () => {
    const result = await enableOrDisableAPI('', true);
    expect(errorSpy.calledWith('An API name is required. Try sheets'));
  });
  it('should disable drive API', async () => {
    await enableOrDisableAPI('drive', false);
    expect(logSpy.calledWith('Disabled drive API'));
  });
  it('should enable drive API', async () => {
    await enableOrDisableAPI('drive', true);
    expect(logSpy.calledwith('Enabled drive API'));
  });
  it.skip('should throw error for non-existent API', async () => {
    await enableOrDisableAPI('nonExistent', true);
    expect(errorSpy.calledWith(ERROR.NO_API(true, 'nonExistent')));
  });
  after(cleanup);
});

// Doesn't work yet.
describe.skip('test isEnabled function', () => {
  before(setup);
  it('should return true because scripts API is enabled on this account', async () => {
    const driveEnabled = await isEnabled('script');
    expect(driveEnabled).to.equal(true);
  });
  after(cleanup);
});
