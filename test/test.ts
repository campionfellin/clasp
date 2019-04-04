import { expect } from 'chai';
import * as fs from 'fs-extra';
import { describe, it } from 'mocha';
import {
  ERROR,
} from './../src/utils';

import {
  CLASP,
  CLASP_USAGE,
  CLASP_PATHS,
} from './constants';

const { spawnSync } = require('child_process');

describe('Test variations of clasp help', () => {
  const expectHelp = (variation: string) => {
    const result = spawnSync(
      CLASP, [variation], { encoding: 'utf8' },
    );
    expect(result.status).to.equal(0);
    expect(result.stdout).to.include(CLASP_USAGE);
  };
  it('should show help for clasp help', () => expectHelp('help'));
  it('should show help for clasp --help', () => expectHelp('--help'));
  it('should show help for clasp -h', () => expectHelp('-h'));
});

describe('Test variations of clasp --version', () => {
  const expectVersion = (variation: string) => {
    const result = spawnSync(
      CLASP, [variation], { encoding: 'utf8' },
    );
    expect(result.status).to.equal(0);
    expect(result.stdout).to.include(require('./../package.json').version);
  };
  it('should show version for clasp --version', () => expectVersion('--version'));
  it('should show version for clasp -v', () => expectVersion('-v'));
});

describe('Test unknown functions', () => {
  it('should show version correctly', () => {
    const result = spawnSync(
      CLASP, ['unknown'], { encoding: 'utf8' },
    );
    expect(result.stderr).to.contain(`Unknown command`);
    expect(result.status).to.equal(1);
  });
});

describe('Test all functions while logged out', () => {
  before(() => {
    if (fs.existsSync(CLASP_PATHS.rcGlobal)) fs.removeSync(CLASP_PATHS.rcGlobal);
    if (fs.existsSync(CLASP_PATHS.rcLocal)) fs.removeSync(CLASP_PATHS.rcLocal);
  });
  const expectNoCredentials = (command: string) => {
    const result = spawnSync(
      CLASP, [command], { encoding: 'utf8' },
    );
    expect(result.status).to.equal(1);
    // expect(result.stderr).to.include(ERROR.NO_CREDENTIALS);
  };
  it('should fail to list (no credentials)', () => expectNoCredentials('list'));
  it('should fail to clone (no credentials)', () => expectNoCredentials('clone'));
  it('should fail to push (no credentials)', () => expectNoCredentials('push'));
  it('should fail to deployments (no credentials)', () => expectNoCredentials('deployments'));
  it('should fail to deploy (no credentials)', () => expectNoCredentials('deploy'));
  it('should fail to version (no credentials)', () => expectNoCredentials('version'));
  it('should fail to versions (no credentials)', () => expectNoCredentials('versions'));

  // TODO: all test should have same order of checks
  // and should all return ERROR.NO_CREDENTIALS
  it('should fail to pull (no .clasp.json file)', () => {
    const result = spawnSync(
      CLASP, ['pull'], { encoding: 'utf8' },
    );
    expect(result.status).to.equal(1);
    // Should be ERROR.NO_CREDENTIALS
    // see: https://github.com/google/clasp/issues/278
    expect(result.stderr).to.contain(ERROR.SETTINGS_DNE);
  });
  it('should fail to open (no .clasp.json file)', () => {
    const result = spawnSync(
      CLASP, ['open'], { encoding: 'utf8' },
    );
    expect(result.status).to.equal(1);
    // Should be ERROR.NO_CREDENTIALS
    // see: https://github.com/google/clasp/issues/278
    expect(result.stderr).to.contain(ERROR.SETTINGS_DNE);
  });
  it('should fail to show logs (no .clasp.json file)', () => {
    const result = spawnSync(
      CLASP, ['logs'], { encoding: 'utf8' },
    );
    expect(result.status).to.equal(1);
    // Should be ERROR.NO_CREDENTIALS
    // see: https://github.com/google/clasp/issues/278
    expect(result.stderr).to.contain(ERROR.SETTINGS_DNE);
  });
});
