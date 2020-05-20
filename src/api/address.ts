import { AppEnv } from '../app-env';

export const fetchAddress = async (hash: string) => {
  const response = await fetch(`${AppEnv.STAR_GAZER_API}/address/${hash}`);
  let payload = await response.json();

  if (!payload) {
    payload = { balance: 0 };
  } else {
    payload.balance = payload.balance / 1e8;
  }

  return {
    hash,
    ...payload
  };
};
