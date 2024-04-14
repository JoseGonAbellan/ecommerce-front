/// <reference types="react-scripts" />
declare module 'crypto' {
  export function getRandomValues(buffer: ArrayBuffer): void;
}