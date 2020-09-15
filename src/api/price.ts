import { AppEnv } from '../app-env';
import fetchAPI from '~utils/apiUtils';

export const fetchPrice = async (currency: string) => {
  try {
    const response = await fetchAPI(`${AppEnv.DAG_PRICE_API}${currency}`);
    return response['constellation-labs'];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
