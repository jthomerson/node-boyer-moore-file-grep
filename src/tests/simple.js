"use strict";

var expect = require('expect.js'),
    Grep = require('../lib/boyer-moore'),
    grep = new Grep(),
    ALPHA_SOUP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

describe('Simple Searches', function() {

   it('finds things at the first index', function() {
      expect(grep.indexOf(ALPHA_SOUP, 'ABC')).to.be(0);
   });

   it('finds things at other indexes', function() {
      expect(grep.indexOf(ALPHA_SOUP, 'BCD')).to.be(1);
      expect(grep.indexOf(ALPHA_SOUP, 'CDE')).to.be(2);
      expect(grep.indexOf(ALPHA_SOUP, 'bcd')).to.be(27);
      expect(grep.indexOf(ALPHA_SOUP, 'cde')).to.be(28);
   });

   it('returns -1 for non-matches', function() {
      expect(grep.indexOf('ANPANMANAM', 'NNAAMAN')).to.be(-1);
      expect(grep.indexOf('MANPANAMANAP', 'ANAMPNAM')).to.be(-1);
      expect(grep.indexOf(ALPHA_SOUP, 'DCB')).to.be(-1);
      expect(grep.indexOf(ALPHA_SOUP, 'EDC')).to.be(-1);
      expect(grep.indexOf(ALPHA_SOUP, 'dcb')).to.be(-1);
      expect(grep.indexOf(ALPHA_SOUP, 'edc')).to.be(-1);
   });

   it('returns 0 for empty needles', function() {
      expect(grep.indexOf(ALPHA_SOUP, '')).to.be(0);
   });

});
