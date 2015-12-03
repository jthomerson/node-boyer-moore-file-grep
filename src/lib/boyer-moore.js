"use strict";

var _ = require('underscore'),
    Algorithm;

Algorithm = {

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
         var offsetsForChar, offset;

         for (var j = (needle.length - 1); needle[j] == haystack[i]; --i, --j) {
            if (j === 0) {
               return i;
            }
         }

         offsetsForChar = charTable[haystack[i]];
         offset = (offsetsForChar === undefined ? needle.length : offsetsForChar[j]);

         i += Math.max(offsetTable[needle.length - 1 - j], offset);
      }

      return -1;
   },

   /**
    * Make a table so that in haystach H if a mismatch is found at index N of your
    * needle, you can lookup `table[haystackMismatchChar][N]` to see how far
    * your needle must shift to the right in order to align the current haystack
    * character with its next occurrence to the left in your needle.
    *
    * If the mismatched haystack character does not appear again to the left in
    * your needle then how far must you go to shift the entire needle one
    * character past your current mismatch position in the haystack.
    *
    * If your haystack mismatched character is not present in your needle at
    * all then the entire needle should shift to the right past the current
    * haystack position since it is impossible for any part of the needle to
    * ever match.
    *
    * ```
    *  Example table for needle "NNAAMAN" (indexes of each letter shown on next line):
    *                            0123456
    *  {
    *     "N": { 2: 1, 3: 2, 4: 3, 5: 4 },
    *     "A": { 0: 1, 1: 2, 4: 1, 6: 1 },
    *     "M": { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 1, 6: 2 },
    *  }
    * ```
    */
   _makeCharTable: function(needle) {
      var uniqChars = _.uniq(needle.split('')),
          prevPositions = {},
          table = {};

      for (var i = 0; i < needle.length; i++) {
         var needleChar = needle[i];

         _.each(uniqChars, function(c) {
            var prev = prevPositions[c];

            if (c !== needleChar) {
               if (table[c] === undefined) {
                  table[c] = {};
               }

               table[c][i] = (prev === undefined ? (i + 1) : (i - prev));
            }
         });

         prevPositions[needleChar] = i;
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

};

module.exports = {

   indexOf: Algorithm.indexOf.bind(Algorithm),

};
