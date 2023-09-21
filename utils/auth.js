export const login = async (email, password) => {
  const url = `/api/login`;
  const data = { email, password };
  await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    next: { revalidate: 5000 }, //5 minutes 172800
  })
    .then((res) => res.json)
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const logout = async () => {
  const url = `/api/logout`;
  await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json)
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
