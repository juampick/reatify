import queryString from 'query-string';

export function generateURL(baseUrl, url, params) {
  let fullUrl = `${baseUrl}${url}`;

  if (params) {
    const queryStrParams = queryString.stringify(params);
    fullUrl = fullUrl.concat(`?${queryStrParams}`);
  }

  return fullUrl;
}
