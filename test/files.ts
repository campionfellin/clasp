import { expect } from 'chai';
import { describe, it } from 'mocha';
import * as path from 'path';

import {
  getAppsScriptFileName,
  getFileType,
  hasProject,
  isValidFileName,
} from '../src/files';

import {
  cleanup,
  setup,
} from './functions';

describe.skip('Test files isValidFileName function', () => {
  const validFileName = 'testFile';
  const validJSONFileName = 'appsscript.json';
  const invalidNodeModulesFileName = 'node_modules/@types';
  const invalidFileNameInIgnoreMatches = 'ignoredFile';
  const validJSONFileType = 'JSON';
  const validJSFileType = 'SERVER_JS';
  const validHTMLFileType = 'HTML';
  const invalidFileType = 'JAVA';
  const validRootDir = './';
  const validNormalizedName = path.join(validRootDir, validJSONFileName);
  const validIgnoreMatches = ['ignoredFile', 'anotherFile'];

  // Disable a couple of linting rules just for these tests
  // tslint:disable:max-line-length
  // tslint:disable:no-unused-expression
  it('should return true for valid combinations of input', () => {
    expect(isValidFileName(validFileName, validJSFileType, validRootDir, validNormalizedName, validIgnoreMatches)).to.be.true;
    expect(isValidFileName(validFileName, validHTMLFileType, validRootDir, validNormalizedName, validIgnoreMatches)).to.be.true;
    expect(isValidFileName(validJSONFileName, validJSONFileType, validRootDir, validNormalizedName, validIgnoreMatches)).to.be.true;
  });
  it('should return false for invalid combinations of input', () => {
    expect(isValidFileName(invalidNodeModulesFileName, validJSFileType, validRootDir, validNormalizedName, validIgnoreMatches)).to.be.false;
    expect(isValidFileName(invalidFileNameInIgnoreMatches, validJSFileType, validRootDir, validNormalizedName, validIgnoreMatches)).to.be.false;
    expect(isValidFileName(validFileName, invalidFileType, validRootDir, validNormalizedName, validIgnoreMatches)).to.be.false;
  });
});

describe.skip('Test getAppsScriptFileName function from files', () => {
  it('should return the basename correctly', () => {
    expect(getAppsScriptFileName('./', 'appsscript.json')).to.equal('appsscript');
    expect(getAppsScriptFileName('', 'appsscript.json')).to.equal('appsscript');
    expect(getAppsScriptFileName('./dist', './dist/appsscript.json')).to.equal('appsscript');
    expect(getAppsScriptFileName('./dist', './dist/foo/Code.js')).to.equal('foo/Code');
  });
});

describe.skip('Test getFileType function from utils', () => {
  it('should return the lowercase file type correctly', () => {
    expect(getFileType('SERVER_JS')).to.equal('js');
    expect(getFileType('GS')).to.equal('gs');
    expect(getFileType('JS')).to.equal('js');
    expect(getFileType('HTML')).to.equal('html');
  });

  it('should return the specified file extention if the file type is SERVER_JS', () => {
    expect(getFileType('SERVER_JS', 'gs')).to.equal('gs');
    expect(getFileType('GS', 'js')).to.equal('gs');
    expect(getFileType('JS', 'gs')).to.equal('js');
    expect(getFileType('HTML', 'js')).to.equal('html');
  });
});

describe.skip('Test hasProject function', () => {
  before(setup);
  it('should return true if project exists', () => {
    expect(hasProject()).to.be.true;
  });
  it('should return false if project doesn\'t exist', () => {
    cleanup();
    expect(hasProject()).to.be.false;
  });
  after(cleanup);
});