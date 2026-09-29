import { signs } from './signs.js';

export function getRandomPhrase(sign) {
  const signData = signs[sign];
  if (!signData) return null;
  const randomIndex = Math.floor(Math.random() * signData.phrases.length);
  return signData.phrases[randomIndex];
}

export function isValidSign(sign) {
  return sign in signs;
}

export function getSignData(sign) {
  return signs[sign] || null;
}

export function getAllSigns() {
  return Object.keys(signs);
}
