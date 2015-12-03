"use strict";

var expect = require('expect.js'),
    BoyerMoore = require('../lib/boyer-moore'),
    ALPHA_SOUP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

describe('Simple Searches', function() {

   it('finds things at the first index', function() {
      expect(BoyerMoore.indexOf(ALPHA_SOUP, 'ABC')).to.be(0);
   });

   it('finds things at other indexes', function() {
      expect(BoyerMoore.indexOf(ALPHA_SOUP, 'BCD')).to.be(1);
      expect(BoyerMoore.indexOf(ALPHA_SOUP, 'CDE')).to.be(2);
      expect(BoyerMoore.indexOf(ALPHA_SOUP, 'bcd')).to.be(27);
      expect(BoyerMoore.indexOf(ALPHA_SOUP, 'cde')).to.be(28);
   });

   it('returns -1 for non-matches', function() {
      expect(BoyerMoore.indexOf('ANPANMANAM', 'NNAAMAN')).to.be(-1);
      expect(BoyerMoore.indexOf('MANPANAMANAP', 'ANAMPNAM')).to.be(-1);
      expect(BoyerMoore.indexOf(ALPHA_SOUP, 'DCB')).to.be(-1);
      expect(BoyerMoore.indexOf(ALPHA_SOUP, 'EDC')).to.be(-1);
      expect(BoyerMoore.indexOf(ALPHA_SOUP, 'dcb')).to.be(-1);
      expect(BoyerMoore.indexOf(ALPHA_SOUP, 'edc')).to.be(-1);
   });

   it('returns 0 for empty needles', function() {
      expect(BoyerMoore.indexOf(ALPHA_SOUP, '')).to.be(0);
   });

});
