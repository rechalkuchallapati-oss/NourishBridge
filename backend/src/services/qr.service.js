import crypto from "crypto";
import QRCode from "qrcode";

export function generateVerificationCode(length = 8) {
  return crypto.randomBytes(length).toString("hex").slice(0, length).toUpperCase();
}

export function buildQrPayload(phase, deliveryId, code) {
  return `NB:${phase}:${deliveryId}:${code}`;
}

export function parseQrPayload(payload) {
  if (!payload || typeof payload !== "string") return null;
  const parts = payload.trim().split(":");
  if (parts.length !== 4 || parts[0] !== "NB") return null;
  const [, phase, deliveryId, code] = parts;
  if (!["pickup", "delivery"].includes(phase)) return null;
  return { phase, deliveryId, code: code.toUpperCase() };
}

export async function generateQrDataUrl(payload) {
  return QRCode.toDataURL(payload, {
    errorCorrectionLevel: "M",
    margin: 2,
    width: 256,
  });
}

export default {
  generateVerificationCode,
  buildQrPayload,
  parseQrPayload,
  generateQrDataUrl,
};
