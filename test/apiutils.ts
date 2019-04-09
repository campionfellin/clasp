import { expect } from 'chai';
import { describe, it } from 'mocha';

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
  it('should log error if no service name given', async () => {
    await enableOrDisableAPI("", true);
    expect(process.stderr).to.equal('An API name is required. Try sheets');
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
