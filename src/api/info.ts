export type Info = {
  blockCount: number;
  txCount: number;
  cacheJobStatus: string;
  blockHeight: number;
};

export const fetchInfo = async (): Promise<Info> => {
  const response = await fetch(
    `https://stargazer-4497c.firebaseio.com/latest/info.json`
  );
  return await response.json();
};
