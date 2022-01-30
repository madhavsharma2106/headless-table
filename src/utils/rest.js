export const RequestMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const request = async ({ method, url, body, options }) => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("token");

    const reqOptions = {
      headers: {
        accept: "*/*",
      },
      method,
      ...options,
    };

    if (body) reqOptions.body = JSON.stringify(body);
    if (token) reqOptions.headers.Authorization = `Bearer ${token}`;

    try {
      const response = await fetch(url, reqOptions);
      const data = await response.json();

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

export const makeRequest = {
  post: (args) => request({ ...args, method: RequestMethods.POST }),
  get: (args) => request({ ...args, method: RequestMethods.GET }),
  put: (args) => request({ ...args, method: RequestMethods.PUT }),
  delete: (args) => request({ ...args, method: RequestMethods.DELETE }),
};
