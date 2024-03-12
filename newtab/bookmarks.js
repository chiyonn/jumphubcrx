const otherBookmarksId = "2";
const bookmarkTitle = "JumpHubCRX bookmarks";
let crxRootBookmarkFolderId;

const getCrxRootBookmarkFolderId = () => {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.getChildren(otherBookmarksId, children => {
      const bookmark = children.find(child => child.title === bookmarkTitle);
      if (bookmark) {
        resolve(bookmark.id);
      } else {
        chrome.bookmarks.create(
          {'parentId': otherBookmarksId, 'title': bookmarkTitle},
          newFolder => {
            resolve(newFolder.id);
          }
        );
      }
    });
  });
};

const getFaviconUrl = (bookmarkUrl, size=64) => {
  const domain = new URL(bookmarkUrl).hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
  return faviconUrl;
};


const renderBookmarks = async () => {
  try {
    const folderId = await getCrxRootBookmarkFolderId();
    crxRootBookmarkFolderId = folderId;

    const bookmarksSection = document.getElementById("bookmarks");
    const children = await getBookmarkChildren(crxRootBookmarkFolderId);

    for (const child of children) {

      const grandChildren = await getBookmarkChildren(child.id);
      if (grandChildren.length <= 0) {
        continue
      }

      const categoryTitleElement = createTitleElement(child.title);
      bookmarksSection.appendChild(categoryTitleElement);

      const categoryBlock = document.createElement("div");
      categoryBlock.classList.add("category");

      for (const grandChild of grandChildren) {
        const bookmarkElement = createBookmarkElement(grandChild);
        categoryBlock.appendChild(bookmarkElement);
      }

      bookmarksSection.appendChild(categoryBlock);
    }

  } catch (error) {
    console.error(error);
  }
};

const getBookmarkChildren = (parentId) => {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.getChildren(parentId, (children) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(children);
      }
    });
  });
};

const createTitleElement = (title) => {
  const element = document.createElement("h4");
  element.textContent = title;
  return element;
};

const createBookmarkElement = (node) => {
  const a = document.createElement("a");
  a.classList.add("bookmark");
  a.href = node.url;

  const img = document.createElement("img");
  img.src = getFaviconUrl(node.url);

  const p = document.createElement("p");
  p.textContent = node.title;

  a.appendChild(img);
  a.appendChild(p);

  return a;
};

renderBookmarks();
