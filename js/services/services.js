const getData = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }

  return await response.json();
};

const postData = async (url, data) => {
  const req = await fetch(url, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: data,
  });

  return await req.json();
};

export {getData, postData};
