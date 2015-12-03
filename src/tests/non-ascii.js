"use strict";

var expect = require('expect.js'),
    BoyerMoore = require('../lib/boyer-moore'),
    SAMPLE_TEXT = 'Đây là văn bản mẫu cho các bài kiểm tra của tôi.';

describe('Searches with non-ASCII text', function() {

   it('finds things at the first index', function() {
      expect(BoyerMoore.indexOf(SAMPLE_TEXT, 'Đây')).to.be(0);
   });

   it('finds things at other indexes', function() {
      expect(BoyerMoore.indexOf(SAMPLE_TEXT, 'là')).to.be(4);
      expect(BoyerMoore.indexOf(SAMPLE_TEXT, 'văn bản mẫu cho')).to.be(7);
      expect(BoyerMoore.indexOf(SAMPLE_TEXT, 'của')).to.be(40);
      expect(BoyerMoore.indexOf(SAMPLE_TEXT, '.')).to.be(47);
   });

   it('returns -1 for non-matches', function() {
      expect(BoyerMoore.indexOf(SAMPLE_TEXT, 'bài mểik')).to.be(-1);
      expect(BoyerMoore.indexOf(SAMPLE_TEXT, 'bbài kiểm')).to.be(-1);
   });

   it('returns 0 for empty needles', function() {
      expect(BoyerMoore.indexOf(SAMPLE_TEXT, '')).to.be(0);
   });

});
