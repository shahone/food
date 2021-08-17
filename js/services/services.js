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
    headers: {'Content-type': 'application/json'}, // для json
    body: data,
  });

  // return await req.json();
  return await req.text(); //text() — если серверный файл возвращает текстовые данные //server.php
};

export {getData, postData};
