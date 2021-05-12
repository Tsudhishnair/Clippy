import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const generateUniqueId = () => {
  const uuid = uuidv4() + new Date().getTime();
  return uuid;
};
