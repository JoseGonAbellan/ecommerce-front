import * as crypto from 'crypto-js';

// Función para generar un token JWT
export const generateJWT =(payload: any, secretKey: any) =>  {
  // Codifica el payload como Base64
  const encodedPayload = btoa(JSON.stringify(payload));

  // Firma el payload codificado utilizando HMAC-SHA256 y la clave secreta
  const signature = crypto.HmacSHA256(encodedPayload, secretKey).toString();

  // Retorna el token JWT
  return `${encodedPayload}.${signature}`;
}

export const secretKey = "1234"