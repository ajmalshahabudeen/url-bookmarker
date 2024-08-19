export const AddBookmarks = async (
  categoryPath: string,
  bookmarkUrl: string
) => {
  // console.log(categoryName, path);
  try {
    const res = await $fetch("/api/bookmark/urls/addBookmark", {
      method: "POST",
      body: {
        categoryPath,
        bookmarkUrl,
      },
    })
    return true;
  } catch(err) {
    return false;
  };
};

export const GetBookmarks = async (path: string) => {
  // console.log(path);
  try {
    const data = await $fetch(
      "/api/bookmark/urls/getBookmarks?path=" + path,
      {
        method: "GET",
      }
    );
    return data;
  } catch (error) {
    return null;
  }
};
