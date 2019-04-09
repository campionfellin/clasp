import { expect } from 'chai';
import { describe, it } from 'mocha';

import {
  CLASP,
} from '../constants';

import {
  cleanup,
  setup,
} from '../functions';

const { spawnSync } = require('child_process');

describe.skip('Test clasp versions function', () => {
  before(setup);
  const versionNumber = 0;
  it.skip('should list versions correctly', () => {
    const result = spawnSync(
      CLASP, ['versions'], { encoding: 'utf8' },
    );
    expect(result.stdout).to.contain('Versions');
    if (versionNumber) expect(result.stdout).to.contain(versionNumber + ' - ');
    expect(result.status).to.equal(0);
  });
  after(cleanup);
});