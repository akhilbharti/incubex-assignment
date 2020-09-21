const endpoint = "https://jsonplaceholder.typicode.com/";

export const api = {
  url: {
    users: {
      list: endpoint + "users",
    },
    posts: {
      list: endpoint + "posts",
      detail: endpoint + "posts",
    },
    albums: {
      list: endpoint + "albums",
    },
    photos: {
      list: endpoint + "photos",
    },
    comments: {
      list: endpoint + "comments",
    },
  },
};
