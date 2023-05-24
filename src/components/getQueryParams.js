function getQueryParams() {
  const search = window.location.search.substring(1);
  const params = {};

  if (search) {
    const searchParams = new URLSearchParams(search);
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
  }

  return params;
}
export default getQueryParams;
