/**
 * Searches for a given search string in a text and returns the result with highlighting.
 *
 * @param {string} searchStr - The search string to look for in the text.
 * @param {string} text - The text in which to search for the search string.
 * @return {object} An object containing the search result.
 *                  - `founded` (boolean): Indicates if the search string was found in the text.
 *                  - `value` (string|null): The text with highlighting if the search string was found, or null if it was not found.
 */
export function search(searchStr, text) {
  const lowerText = text.toLowerCase();
  const lowerSearchStr = searchStr.toLowerCase();

  if (!lowerSearchStr || !lowerText.includes(lowerSearchStr)) {
    return { founded: false, value: null };
  }

  // Extract indexes
  let index = lowerText.indexOf(lowerSearchStr);
  const indexes = [];

  for (let i = 0; index !== -1; i++) {
    indexes.push([index, index + searchStr.length - 1]);

    index = lowerText.indexOf(lowerSearchStr, index + 1);
  }

  // Add highlighting
  let result = '';

  for (let i = text.length - 1; i >= 0; i--) {
    let isRangeStart = false;
    const isRangeEnd = indexes.some((range) => range[1] === i);

    if (!isRangeEnd) isRangeStart = indexes.some((range) => range[0] === i);

    let textToAdd = '';
    const char = text[i];

    switch (true) {
      case isRangeStart:
        textToAdd = `<span>${char}`;
        break;

      case isRangeEnd:
        textToAdd = `${char}</span>`;
        break;

      default:
        textToAdd = char;
    }

    result = textToAdd + result;
  }

  return { founded: true, value: result };
}

export function createCacheStorage() {
  const cache = {};

  const clearCacheItem = (key) => {
    const item = cache[key];

    if (item) {
      clearTimeout(item.timerId);
      delete cache[key];
    }
  };

  return {
    get(key) {
      return cache[key]?.value;
    },

    set(key, value, maxAge = 300000 /* 5 minutes */) {
      cache[key] = {
        value,
        timerId: setTimeout(() => {
          delete cache[key];
        }, maxAge),
      };
    },

    clear(key = '*') {
      const keys = [key === '*' ? Object.keys(cache) : key];

      keys.forEach(clearCacheItem);
    },
  };
}
