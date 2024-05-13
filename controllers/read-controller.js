var readModel = require('../models/read-model');
var shift = 13;
var numberOfCharacters = 94;
var firstCharacInASCIICode = 33;
var lastCharacInASCIICode = 126;

module.exports = {
  readData: function (req, res) {
    readModel.readData(function (data) {
      // data.full_name = caesarCipherDecrypt(data.full_name);
      data.forEach(row => {
        row.full_name = caesarCipherDecrypt(row.full_name, shift);
        row.email_address = caesarCipherDecrypt(row.email_address, shift);
        row.city = caesarCipherDecrypt(row.city, shift);
        row.country = caesarCipherDecrypt(row.country, shift);
      });
      res.render('crud-table', { fetchData: data });
    });
  }
}

// Decryption Code Here
function caesarCipherDecrypt(word, shift) {
  const decryptedWord = [];

  for (let i = 0; i < word.length; i++) {
    const charCode = word.charCodeAt(i);
    var decryptFactor = (charCode - firstCharacInASCIICode) - shift;
    // console.log(decryptFactor);
    let decryptedCharCode;
    if (charCode >= firstCharacInASCIICode && charCode <= lastCharacInASCIICode) {
      // letters, symbols, numbers are included here
      while (decryptFactor < 0) {
        decryptFactor += numberOfCharacters;
      }
      decryptedCharCode = (decryptFactor % numberOfCharacters) + firstCharacInASCIICode;
    } else {
      // Spaces
      decryptedCharCode = charCode;
    }
    decryptedWord.push(String.fromCharCode(decryptedCharCode));
  }
  return decryptedWord.join('');
}