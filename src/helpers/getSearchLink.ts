import qs from 'qs';

// /** Generates a search link */
export default (term: string): string => {
  return `/search?${qs.stringify({ term })}`;
}