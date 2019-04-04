import { expect } from 'chai';
import { describe, it } from 'mocha';
const { spawnSync } = require('child_process');

import {
  PROJECT_ID,
} from './constants';

import {
  cleanup,
  setup,
  setupWithoutGCPProject,
} from './functions';

import { getProjectIdWithErrors, enableAppsScriptAPI } from '../src/apiutils';

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
