const GET_COUNTRIES = fetch("https://countries.trevorblades.com/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `{
            countries {
                phone
                name
                capital
                currency
            }
        }`,
  }),
});

export { GET_COUNTRIES };
