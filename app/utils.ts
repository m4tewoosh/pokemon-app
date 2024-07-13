import { Dimensions } from 'react-native';

export const colors = {
  green: '#46cfb0',
  red: '#fc6c6c',
  darkRed: '#8b0000',
  blue: '#76bcfc',
  yellow: '#fed770',
  white: 'white',
  purple: '#7d528e',
  brown: '#b1736c',
  pink: '#fca3eb',
};

export const pad = (number: string, length: number) => {
  let str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
};

export const fullWidth = Dimensions.get('window').width;
