function haveFileInPath(path, callBackFn) {
  fetch(path, { method: "HEAD" })
    .then((response) => {
      if (response.ok) {
        callBackFn();
      }
    })
    .catch((error) => {
      console.warn(error);
    });
}
export default haveFileInPath;
