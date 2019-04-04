import { expect } from 'chai';
import { describe, it } from 'mocha';

const findParentDir = require('find-parent-dir');
const sinon = require('sinon');

import {
  cleanup,
  setup,
} from './functions';

import { DOTFILE } from '../src/dotfile';

describe('test stuff', () => {
  before(setup);

  it('shoud hit all branches of findsync dir', () => {
    sinon.stub(findParentDir, 'sync').returns(null);
    DOTFILE.IGNORE();
    DOTFILE.PROJECT();
    DOTFILE.RC_LOCAL();
  });
  after(cleanup);
});
