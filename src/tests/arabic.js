"use strict";

var expect = require('expect.js'),
    Grep = require('../lib/boyer-moore'),
    grep = new Grep(),
    SAMPLE_TEXT = 'وهذا هو نص تجريبي باللغة العربية مع English ممزوجة.';

describe('Searches with non-ASCII text', function() {

   it('finds things at the first index', function() {
      expect(grep.indexOf(SAMPLE_TEXT, 'وهذا')).to.be(0);
   });

   it('finds things at other indexes', function() {
      expect(grep.indexOf(SAMPLE_TEXT, 'هو')).to.be(5);
      expect(grep.indexOf(SAMPLE_TEXT, 'نص تجريبي')).to.be(8);
      expect(grep.indexOf(SAMPLE_TEXT, 'English')).to.be(36);
   });

   it('returns -1 for non-matches', function() {
      expect(grep.indexOf(SAMPLE_TEXT, 'bài mểik')).to.be(-1);
      expect(grep.indexOf(SAMPLE_TEXT, 'bbài kiểm')).to.be(-1);
   });

   it('returns 0 for empty needles', function() {
      expect(grep.indexOf(SAMPLE_TEXT, '')).to.be(0);
   });

});
