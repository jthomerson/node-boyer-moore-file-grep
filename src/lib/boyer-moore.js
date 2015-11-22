"use strict";

var _ = require('underscore'),
    Class = require('class.extend'),
    ALPHABET_SIZE = 256;

module.exports = Class.extend({

   /**
    * Returns the index within `haystack` of the first occurrence of the specified
    * substring `needle`. If it is not a substring, returns -1.
    *
    * NOTE: As is true with most `indexOf` functions, you must use `idx !== -1` in
    * order to see if there is no match since `!idx` would return true for a match
    * at index zero.
    *
    * @param Buffer haystack the string to search
    * @param Buffer needle the string to try to find in `haystack`
    * @return int index (zero-based), or -1 if not found
    */
   indexOf: function(haystack, needle) {
      var charTable, offsetTable;

      if (!needle || !needle.length) {
         return 0;
      }

      charTable = this._makeCharTable(needle);
      offsetTable = this._makeOffsetTable(needle);

      for (var i = (needle.length - 1); i < haystack.length;) {
         for (var j = (needle.length - 1); needle[j] == haystack[i]; --i, --j) {
            if (j === 0) {
               return i;
            }
         }

         i += Math.max(offsetTable[needle.length - 1 - j], charTable[haystack.charCodeAt(i)]);
      }

      return -1;
   },

   _makeCharTable: function(needle) {
      var table = new Uint32Array(ALPHABET_SIZE);

      for (var i = 0; i < table.length; ++i) {
         table[i] = needle.length;
      }
      for (var i = 0; i < (needle.length - 1); ++i) {
         var c = needle.charCodeAt(i);
         table[c] = (needle.length - 1 - i);
      }

      return table;
   },

   _makeOffsetTable: function(needle) {
      var table = new Uint32Array(needle.length),
          lastPrefixPosition = needle.length;

      for (var i = (needle.length - 1); i >= 0; --i) {
         if (this._isPrefix(needle, i + 1)) {
            lastPrefixPosition = (i + 1);
         }
         table[needle.length - 1 - i] = (lastPrefixPosition - i + needle.length - 1);
      }
      for (var i = 0; i < (needle.length - 1); ++i) {
         var suffixLen = this._suffixLength(needle, i);
         table[suffixLen] = (needle.length - 1 - i + suffixLen);
      }
      return table;
   },

   _isPrefix: function(needle, p) {
      for (var i = p, j = 0; i < needle.length; ++i, ++j) {
         if (needle[i] != needle[j]) {
            return false;
         }
      }

      return true;
   },

   _suffixLength: function(needle, p) {
      var len = 0;

      for (var i = p, j = (needle.length - 1); (i >= 0 && needle[i] == needle[j]); --i, --j) {
         len += 1;
      }

      return len;
   },

});
