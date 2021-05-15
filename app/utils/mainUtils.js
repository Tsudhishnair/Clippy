import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const generateUniqueId = () => {
  const uuid = uuidv4() + new Date().getTime();
  return uuid;
};

// Function to Group array values based on key -> returns an object
export const groupBy = (array, key) => {
  return array.reduce((result, currentVal) => {
    if (!result[currentVal[key]]) {
      result[currentVal[key]] = [];
    }
    result[currentVal[key]].push(currentVal);
    return result;
  }, {});
};
