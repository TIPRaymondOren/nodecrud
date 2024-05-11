var updateModel = require('../models/update-model');
var shift = 13;
var numberOfCharacters = 94;
var firstCharacInASCIICode = 33;
var lastCharacInASCIICode = 126;

module.exports = {
  editData: function (req, res) {
    const editId = req.params.id;
    updateModel.editData(editId, function (data) {
      // Decipher each data that is retrieved from the database
      data.full_name = caesarCipherDecrypt(data.full_name, shift);
      data.email_address = caesarCipherDecrypt(data.email_address, shift);
      data.city = caesarCipherDecrypt(data.city, shift);
      data.country = caesarCipherDecrypt(data.country, shift);

      res.render('crud-form', { editData: data });
      console.log(data.affectedRows + " record fetched");
    });

  },
  updateData: function (req, res) {
    const inputData = {
      full_name: caesarCipherEncrypt(req.body.full_name, shift),
      email_address: caesarCipherEncrypt(req.body.email_address, shift),
      city: caesarCipherEncrypt(req.body.city, shift),
      country: caesarCipherEncrypt(req.body.country, shift)
    };

    const updateId = req.params.id;
    updateModel.updateData(inputData, updateId, function (data) {
      res.redirect('/crud/read');
      console.log(data.affectedRows + " record(s) updated");
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
    }

    else {
      // Spaces
      decryptedCharCode = charCode;
    }
    decryptedWord.push(String.fromCharCode(decryptedCharCode));
  }
  return decryptedWord.join('');
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
    else {
      // Anything else not mentioned above
      encryptedCharCode = charCode;
    }
    encryptedWord.push(String.fromCharCode(encryptedCharCode));
    // console.log(encryptedWord);
  }

  return encryptedWord.join('');
}