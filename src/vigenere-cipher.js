const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }

  encrypt(text, key) {
    if (!text || !key) {
      throw new Error("Incorrect arguments!");
    }

    const shiftedAlphabet = this.createShiftedAlphabet(key);
    let ciphertext = "";
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      let char = text[i].toUpperCase();
      if (char.match(/[A-Z]/)) {
        const shift = shiftedAlphabet[keyIndex];
        const base = 'A'.charCodeAt(0);
        const encryptedChar = String.fromCharCode(
          (char.charCodeAt(0) - base + shift) % 26 + base
        );
        ciphertext += encryptedChar;
        keyIndex = (keyIndex + 1) % key.length;
      } else {
        ciphertext += char;
      }
    }

    return ciphertext;
  }

  decrypt(ciphertext, key) {
    if (!ciphertext || !key) {
      throw new Error('Incorrect arguments!');
    }

    const shiftedAlphabet = this.createShiftedAlphabet(key);
    let plaintext = '';
    let keyIndex = 0;

    for (let i = 0; i < ciphertext.length; i++) {
      let char = ciphertext[i];

      if (char.match(/[A-Za-z]/)) {
        const base = 'A'.charCodeAt(0);
        let shift = shiftedAlphabet[keyIndex];

        if (char.match(/[A-Z]/)) {
          const adjustedShift = this.direct ? shift : (shift + 26) % 26;
          const decryptedCharCode = (char.charCodeAt(0) - base - adjustedShift + 26) % 26;
          const decryptedChar = String.fromCharCode(decryptedCharCode + base);
          plaintext += decryptedChar;
          keyIndex = (keyIndex + 1) % key.length;
        } else {
          // Обработка для цифр
          const adjustedShift = this.direct ? shift : (shift + 26) % 26;
          const decryptedCharCode = (char.charCodeAt(0) - '0'.charCodeAt(0) - adjustedShift + 10) % 10;
          const decryptedChar = String.fromCharCode(decryptedCharCode + '0'.charCodeAt(0));
          plaintext += decryptedChar;
          keyIndex = (keyIndex + 1) % key.length;
        }
      } else {
        plaintext += char;  // Добавляем символ без изменений
      }
    }

    return plaintext;
  }


  createShiftedAlphabet(key) {
    const shiftedAlphabet = [];
    for (let i = 0; i < key.length; i++) {
      const shift = key[i].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
      shiftedAlphabet.push(this.direct ? shift : -shift);
    }
    return shiftedAlphabet;
  }
}


module.exports = {
  VigenereCipheringMachine
};
