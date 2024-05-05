var createModel = require('../models/create-model');
var shift = 13;
var numberOfCharacters = 94;
var firstCharacInASCIICode = 33;
var lastCharacInASCIICode = 126;

module.exports = {
  crudForm: function (req, res) {
    res.render('crud-form');
  },
  createData: function (req, res) {
    const inputData = {
      full_name: caesarCipherEncrypt(req.body.full_name, shift),
      email_address: caesarCipherEncrypt(req.body.email_address, shift),
      city: caesarCipherEncrypt(req.body.city, shift),
      country: caesarCipherEncrypt(req.body.country, shift)
    };
    createModel.createData(inputData, function (data) {
      res.redirect('/crud/read');
      console.log(data.affectedRows + " record created");
    });
  }
}

// Encryption Code Here
function caesarCipherEncrypt(word, shift) {
  const encryptedWord = [];

  for (let i = 0; i < word.length; i++) {
    const charCode = word.charCodeAt(i);
    // console.log("Charcode = " + charCode);
    let encryptedCharCode;
    if (charCode >= firstCharacInASCIICode && charCode <= lastCharacInASCIICode) {
      // letters, symbols, numbers are included here
      encryptedCharCode = ((charCode - firstCharacInASCIICode + shift) % numberOfCharacters) + firstCharacInASCIICode;
    } 
    // else if (charCode >= 65 && charCode <= 90) {
    //   // Filter for UPPERCASE LETTERS
    //   encryptedCharCode = ((charCode - 65 + shift) % 62) + 65;
    // } else if (charCode >= 48 && charCode <= 57) {
    //   // Filter for numbers 0123456789
    //   encryptedCharCode = ((charCode - 48 + shift) % 62) + 48;
    // }
    else {
      // Anything else not mentioned above
      encryptedCharCode = charCode;
    }
    encryptedWord.push(String.fromCharCode(encryptedCharCode));
    // console.log(encryptedWord);
  }

  return encryptedWord.join('');
}