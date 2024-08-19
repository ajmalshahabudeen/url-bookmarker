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
    console.log(data);
    return data;
  } catch (error) {
    return null;
  }
};

export const DeleteBookmarkCategory = async (id: string) => {
  // console.log(path);
  try {
    const data = await $fetch("/api/bookmark/category/deleteBookmarkCategory?id=" + id, {
      method: "DELETE",
    });
    return true;
  } catch (error) {
    return null;
  }
}

export const UpdateBookmarkCategory = async (id: string, categoryName: string) => {
  // console.log(path);
  try {
    const data = await $fetch("/api/bookmark/category/updateBookmarkCategory?id=" + id + "&categoryName=" + categoryName, {
      method: "PUT",
      body: {
        categoryName,
      },
    });
    return true;
  } catch (error) {
    return null;
  }
}