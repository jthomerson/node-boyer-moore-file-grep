"use strict";

var expect = require('expect.js'),
    Grep = require('../lib/boyer-moore'),
    grep = new Grep(),
    SAMPLE_TEXT = 'Đây là văn bản mẫu cho các bài kiểm tra của tôi.';

describe('Searches with non-ASCII text', function() {

   it('finds things at the first index', function() {
      expect(grep.indexOf(SAMPLE_TEXT, 'Đây')).to.be(0);
   });

   it('finds things at other indexes', function() {
      expect(grep.indexOf(SAMPLE_TEXT, 'là')).to.be(4);
      expect(grep.indexOf(SAMPLE_TEXT, 'văn bản mẫu cho')).to.be(7);
      expect(grep.indexOf(SAMPLE_TEXT, 'của')).to.be(40);
      expect(grep.indexOf(SAMPLE_TEXT, '.')).to.be(47);
   });

   it('returns -1 for non-matches', function() {
      expect(grep.indexOf(SAMPLE_TEXT, 'bài mểik')).to.be(-1);
      expect(grep.indexOf(SAMPLE_TEXT, 'bbài kiểm')).to.be(-1);
   });

   it('returns 0 for empty needles', function() {
      expect(grep.indexOf(SAMPLE_TEXT, '')).to.be(0);
   });

});
