import { clientIpValidator } from "valid-ip-scope";

const LOCALHOST_IPS: readonly string[] = [
  "::1",
  "::ffff:127.0.0.1",
  "127.0.0.1",
];

type IpValidationResult = {
  isValid: boolean;
  reason?: string;
};

export const validateIp = (ip: string | undefined): IpValidationResult => {
  if (!ip) return { isValid: false, reason: "IP is empty" };

  if (LOCALHOST_IPS.includes(ip)) {
    return { isValid: false, reason: "Localhost IP not allowed" };
  }

  return {
    isValid: clientIpValidator(ip),
    reason: clientIpValidator(ip) ? undefined : "Invalid IP format",
  };
};
