import { expect } from 'chai';
import { describe, it } from 'mocha';
import * as fs from 'fs-extra';
import * as path from 'path';

const { spawnSync } = require('child_process');

import {
  cleanup,
  setup,
} from './functions';

import {
  ERROR,
  getAPIFileType,
  getDefaultProjectName,
  getFileTypeName,
  getScriptTypeName,
  getValidJSON,
  getWebApplicationURL,
  saveProject,
} from './../src/utils';

describe.skip('Test getValidJSON function', () => {
  before(setup);
  it('should parse valid params and throw exception for invalid params', () => {
    const validExampleJSONString = JSON.stringify({ param: 'value' });
    const invalidExampleJSONString = 'badString';
    expect(getValidJSON(validExampleJSONString)).to.eql(JSON.parse(validExampleJSONString));
    expect(() => getValidJSON(invalidExampleJSONString)).to.throw(ERROR.INVALID_JSON);
  });
  after(cleanup);
});

describe.skip('Test getWebApplicationURL function from utils', () => {
  it('should return the scriptURL correctly', () => {
    const url = getWebApplicationURL({
      entryPoints: [
        {
          entryPointType: 'WEB_APP',
          webApp: {
            url: 'https://script.google.com/macros/s/abcdefghijklmnopqrstuvwxyz/exec',
          },
        },
      ],
    });
    expect(url).to.equal('https://script.google.com/macros/s/abcdefghijklmnopqrstuvwxyz/exec');
  });
});

describe.skip('Test getDefaultProjectName function from utils', () => {
  it('should return the current directory name correctly', () => {
    expect(getDefaultProjectName()).to.equal('Clasp');
  });
});

describe.skip('Test getAPIFileType function from utils', () => {
  it('should return the uppercase file type correctly', () => {
    expect(getAPIFileType('file.GS')).to.equal('SERVER_JS');
    expect(getAPIFileType('file.JS')).to.equal('SERVER_JS');
    expect(getAPIFileType('file.js')).to.equal('SERVER_JS');
    expect(getAPIFileType('file.jsx')).to.equal('JSX');
    expect(getAPIFileType('file.js.html')).to.equal('HTML');
  });
});

describe.skip('Test saveProject function from utils', () => {
  it('should save the scriptId correctly', () => {
    spawnSync('rm', ['.clasp.json']);
    const isSaved = async () => {
      await saveProject({scriptId: '12345'});
      const id = fs.readFileSync(path.join(__dirname, '/../.clasp.json'), 'utf8');
      expect(id).to.equal('{"scriptId":"12345"}');
    };
    expect(isSaved).to.not.equal(null);
  });

  it('should save the scriptId, rootDir correctly', () => {
    spawnSync('rm', ['.clasp.json']);
    const isSaved = async () => {
      await saveProject({scriptId: '12345', rootDir: './dist'});
      const id = fs.readFileSync(path.join(__dirname, '/../.clasp.json'), 'utf8');
      expect(id).to.equal('{"scriptId":"12345","rootDir":"./dist"}');
    };
    expect(isSaved).to.not.equal(null);
  });
});

describe.skip('Test getFileTypeName function', () => {
  it('should return the name of the filetype correctly.', () => {
    expect(getFileTypeName('docs')).to.equal('Google Doc');
    expect(getFileTypeName('forms')).to.equal('Google Form');
    expect(getFileTypeName('sheets')).to.equal('Google Sheet');
    expect(getFileTypeName('slides')).to.equal('Google Slide');
    // TODO: probably should be better error here
    expect(getFileTypeName('not found')).to.equal(undefined);
  });
});

describe.skip('Test getScriptTypeName function', () => {
  it('should return the human friendly script type name', () => {
    expect(getScriptTypeName('docs')).to.equal('Google Docs Add-on');
    expect(getScriptTypeName('forms')).to.equal('Google Forms Add-on');
    expect(getScriptTypeName('sheets')).to.equal('Google Sheets Add-on');
    expect(getScriptTypeName('slides')).to.equal('Google Slides Add-on');
    expect(getScriptTypeName('not found')).to.equal('not found');
  });
});