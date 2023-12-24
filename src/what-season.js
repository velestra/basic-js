const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 * 
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 * 
 * @example
 * 
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 * 
 */
function getSeason(date) {
  if (!date && date !== 0) {
    return 'Unable to determine the time of year!';
  }

  const isDateInstance = Object.prototype.toString.call(date) === '[object Date]';
  const isValidDate = isDateInstance && !isNaN(date.getTime());

  if (!isValidDate) {
    throw new Error('Invalid date!');
  }

  const month = date.getMonth();

  // Определяем сезон в зависимости от месяца
  if (month >= 2 && month <= 4) {
    return 'spring';
  } else if (month >= 5 && month <= 7) {
    return 'summer';
  } else if (month >= 8 && month <= 10) {
    return 'autumn';
  } else {
    return 'winter';
  }
}


module.exports = {
  getSeason
};
