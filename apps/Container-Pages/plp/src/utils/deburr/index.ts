import deburrLetter from './deburrLetter'

// Code is based off of lodash's deburr library https://github.com/lodash/lodash/blob/master/deburr.js

// Used to match Latin Unicode letters (excluding mathematical operators)
const reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g

// Used to compose unicode character classes
const rsComboMarksRange = '\\u0300-\\u036f'
const reComboHalfMarksRange = '\\ufe20-\\ufe2f'
const rsComboSymbolsRange = '\\u20d0-\\u20ff'
const rsComboMarksExtendedRange = '\\u1ab0-\\u1aff'
const rsComboMarksSupplementRange = '\\u1dc0-\\u1dff'
const rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange

// Used to compose unicode capture groups
const rsCombo = `[${rsComboRange}]`

// Used to match combining diacritical marks
// eslint-disable-next-line no-misleading-character-class
const reComboMark = RegExp(rsCombo, 'g')

function deburr(string: string): string {
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '')
}

export default deburr
