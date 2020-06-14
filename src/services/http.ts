const baseURL = "https://private-leagues-api.herokuapp.com/api";

type B = Record<string, string>;
type R<T> = { res: Response; json?: T };

const baseHTTP = (
  url: string,
  body: string | undefined,
  method: string,
  token?: string,
  appId?: boolean
): Promise<Response> => {
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(appId ? { "X-App-Key": "tamara" } : {})
  };

  return fetch(baseURL + url, { body, headers, method });
};

const get = async <T = Record<string, any>>(
  path: string,
  returnJson?: boolean,
  token?: string,
  appId?: boolean
): Promise<R<T>> => {
  const res = await baseHTTP(path, undefined, "GET", token, appId);
  if (returnJson) {
    const json = await res.json();
    return { res, json };
  }

  return { res };
};

const post = async <T = Record<string, any>>(
  path: string,
  body: B,
  returnJson?: boolean,
  token?: string,
  appId?: boolean
): Promise<R<T>> => {
  const res = await baseHTTP(path, JSON.stringify(body), "POST", token, appId);
  if (returnJson) {
    const json = await res.json();
    return { res, json };
  }

  return { res };
};

const patch = async <T = Record<string, any>>(
  path: string,
  body: B,
  returnJson?: boolean,
  token?: string,
  appId?: boolean
): Promise<R<T>> => {
  const res = await baseHTTP(path, JSON.stringify(body), "PATCH", token, appId);
  if (returnJson) {
    const json = await res.json();
    return { res, json };
  }

  return { res };
};

// Cant use delete because it's a js keyword
const remove = async <T = Record<string, any>>(
  path: string,
  returnJson?: boolean,
  token?: string,
  appId?: boolean
): Promise<R<T>> => {
  const res = await baseHTTP(path, undefined, "DELETE", token, appId);
  if (returnJson) {
    const json = await res.json();
    return { res, json };
  }

  return { res };
};

export { get, post, patch, remove };
