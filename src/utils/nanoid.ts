import { customAlphabet } from 'nanoid/non-secure'; 

/**
 * Non-secure random id generator.
 * 
 * @remarks
 * React-native doesn't support 'crypto' from NodeJS.
 */
export const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10); 