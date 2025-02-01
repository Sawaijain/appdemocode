import React from 'react';
import {RupeeSign} from '.';

class NumberService {
  numberSeparator(value: number) {
    if (value > 0) {
      var convertedNum;
      if (value == Math.floor(value)) {
      } else {
        convertedNum = Math.round(value);
      }
      var x: any = convertedNum ? convertedNum : value;
      x = x?.toString();
      var lastThree = x?.substring(x.length - 3);
      var otherNumbers = x?.substring(0, x.length - 3);
      if (otherNumbers != '') lastThree = ',' + lastThree;
      var res = otherNumbers?.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
      return `${RupeeSign} ${res}`;
    } else {
      return 0;
    }
  }
  isRound = (number: number) => number.toFixed(9).endsWith('000000000');
}
const NumberSeparatorInstance = new NumberService();
export default NumberSeparatorInstance;
