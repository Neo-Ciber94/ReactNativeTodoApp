import { customAlphabet } from 'nanoid/non-secure'; 

// React-native doesn't support 'crypto' from NodeJS
export const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10); 