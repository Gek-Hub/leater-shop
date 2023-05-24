const scrollTo = (e) => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute("href") || "#";
  const id = href.slice(1);
  const element = document.getElementById(id);
  if (element) {
    const yCoordinate =
      element.getBoundingClientRect().top + window.pageYOffset - 100; // subtract 100 pixels
    window.scrollTo({ top: yCoordinate, behavior: "smooth" });
  }
};
export default scrollTo;
