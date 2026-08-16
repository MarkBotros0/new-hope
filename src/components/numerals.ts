/** The rest of the site writes its numbers in Arabic-Indic digits; anything
 *  numbering a list follows suit rather than mixing the two systems on one
 *  page. */
const arabicDigits = '٠١٢٣٤٥٦٧٨٩'

export const toArabicNumeral = (n: number) =>
  String(n).replace(/\d/g, (d) => arabicDigits[Number(d)])
