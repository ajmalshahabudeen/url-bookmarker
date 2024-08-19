export const AddBookmarkCategory = async (
  categoryName: string,
  path: string
) => {
  // console.log(categoryName, path);
  try {
    await $fetch("/api/bookmark/category/addBookmarkCategory", {
      method: "POST",
      body: {
        categoryName,
        path,
      },
    })
    return true
  } catch(err) {
    return false
  };
};

export const GetBookmarkCategory = async (path: string) => {
  // console.log(path);
  try {
    const data = await $fetch(
      "/api/bookmark/category/getBookmarkCategory?path=" + path,
      {
        method: "GET",
      }
    );
    return data;
  } catch (error) {
    return null;
  }
};
