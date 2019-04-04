import { expect } from 'chai';
import { describe, it } from 'mocha';

const SCRIPT_ID: string = process.env.SCRIPT_ID || '';
const PROJECT_ID: string = process.env.PROJECT_ID || '';

import {
  extractScriptId,
  URL,
} from './../src/urls';

describe('Test URL utils function', () => {
  it('should create Script URL correctly', () => {
    const expectedUrl = `https://script.google.com/d/${SCRIPT_ID}/edit`;
    expect(URL.SCRIPT(SCRIPT_ID)).to.equal(expectedUrl);
  });
  it('should create Creds URL correctly', () => {
    const expectedURL = `https://console.developers.google.com/apis/credentials?project=${SCRIPT_ID}`;
    expect(URL.CREDS(SCRIPT_ID)).to.equal(expectedURL);
  });
  it('should create APIS URL correctly', () => {
    const expectedURL = `https://console.developers.google.com/apis/dashboard?project=${SCRIPT_ID}`;
    expect(URL.APIS(SCRIPT_ID)).to.equal(expectedURL);
  });
  it('should create LOGS URL correctly', () => {
    const expectedURL =
      `https://console.cloud.google.com/logs/viewer?project=${SCRIPT_ID}&resource=app_script_function`;
    expect(URL.LOGS(SCRIPT_ID)).to.equal(expectedURL);
  });
  it('should create DRIVE URL correctly', () => {
    const expectedURL = `https://drive.google.com/open?id=${SCRIPT_ID}`;
    expect(URL.DRIVE(SCRIPT_ID)).to.equal(expectedURL);
  });
});

describe('Test URL helper from utils', () => {
  it('should return the scriptURL correctly', () => {
    const url = URL.SCRIPT('abcdefghijklmnopqrstuvwxyz');
    expect(url).to.equal('https://script.google.com/d/abcdefghijklmnopqrstuvwxyz/edit');
  });
});

describe('Test extractScriptId function', () => {
  it('should return scriptId correctly', () => {
    expect(extractScriptId(SCRIPT_ID)).to.equal(SCRIPT_ID);
    expect(extractScriptId(URL.SCRIPT(SCRIPT_ID))).to.equal(SCRIPT_ID);
  });
  // TODO: we are missing logic to throw error if this is invalid scriptId.
  it('should return scriptId exactly as passed in', () => {
    expect(extractScriptId('abc')).to.equal('abc');
  });
});