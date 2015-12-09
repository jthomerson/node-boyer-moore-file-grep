"use strict";

var expect = require('expect.js'),
    BoyerMoore = require('../lib/boyer-moore'),
    SAMPLE_TEXT = 'وهذا هو نص تجريبي باللغة العربية مع English ممزوجة.';

describe('Searches with Arabic (RTL) text', function() {

   it('finds things at the first index', function() {
      expect(BoyerMoore.indexOf(SAMPLE_TEXT, 'وهذا')).to.be(0);
   });

   it('finds things at other indexes', function() {
      expect(BoyerMoore.indexOf(SAMPLE_TEXT, 'هو')).to.be(5);
      expect(BoyerMoore.indexOf(SAMPLE_TEXT, 'نص تجريبي')).to.be(8);
      expect(BoyerMoore.indexOf(SAMPLE_TEXT, 'English')).to.be(36);
   });

   it('returns -1 for non-matches', function() {
      expect(BoyerMoore.indexOf(SAMPLE_TEXT, 'bài mểik')).to.be(-1);
      expect(BoyerMoore.indexOf(SAMPLE_TEXT, 'bbài kiểm')).to.be(-1);
   });

   it('returns 0 for empty needles', function() {
      expect(BoyerMoore.indexOf(SAMPLE_TEXT, '')).to.be(0);
   });

});
