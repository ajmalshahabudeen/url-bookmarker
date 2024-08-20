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
    // console.log("data", data);
    return data;
  } catch (error) {
    return null;
  }
};

export const DeleteBookmarks = async (id: string) => {
  // console.log(path);
  try {
    const data = await $fetch("/api/bookmark/urls/deleteBookmark?id=" + id, {
      method: "DELETE",
    });
    return true;
  } catch (error) {
    return null;
  }
};

export const UpdateBookmarks = async (id: string, url: string) => {
  // console.log(path);
  try {
    const data = await $fetch("/api/bookmark/urls/updateBookmark?id=" + id, {
      method: "PUT",
      body: {
        url,
      },
    });
    return true;
  } catch (error) {
    return null;
  }
};
