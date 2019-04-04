import { expect } from 'chai';
import { describe, it } from 'mocha';

import {
  CLASP,
} from '../constants';

import {
  cleanup,
  setup,
} from '../functions';

import {
  LOG,
} from '../../src/utils';

const { spawnSync } = require('child_process');

describe('Test clasp version function', () => {
  before(setup);
  let versionNumber = 0;
  it('should prompt for version description', () => {
    const result = spawnSync(
      CLASP, ['version'], { encoding: 'utf8' },
    );
    expect(result.stdout).to.contain(LOG.GIVE_DESCRIPTION);
    expect(result.status).to.equal(0);
  });
  it('should create a new version correctly', () => {
    const result = spawnSync(
      CLASP, ['version', 'xxx'], { encoding: 'utf8' },
    );
    versionNumber =
      Number(result.stdout.substring(result.stdout.lastIndexOf(' '), result.stdout.length - 2));
    expect(versionNumber).to.be.greaterThan(0);
  });
  after(cleanup);
});