export const formatLink = (link: string) => ({
  ...(link?.includes(`?`)
    ? {
        pathname: link.split(`?`)[0],
        query: {
          ...Object.fromEntries(new URLSearchParams(link.split(`?`)[1])),
        },
      }
    : {
        pathname: link,
      }),
});
