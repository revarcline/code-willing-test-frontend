const apiRoot = "http://localhost:3001";

export const postPhrase = (phrase: string): Promise =>
  fetch(`${apiRoot}/api/phrases`, {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      phrase: phrase,
    }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json).catch((err) => console.log(err)));