const escapeHTML = (input) => {
  if (typeof input !== "string") return input; // Only sanitize strings

  // Escape special HTML characters
  return input.replace(/[&<>"']/g, (char) => {
    const escapeChars = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return escapeChars[char] || char;
  });
};

const xssProtection = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        req.body[key] = escapeHTML(req.body[key]); // Escape body parameters
      }
    }
  }
  if (req.query) {
    for (const key in req.query) {
      if (req.query.hasOwnProperty(key)) {
        req.query[key] = escapeHTML(req.query[key]); // Escape query parameters
      }
    }
  }
  if (req.headers) {
    for (const key in req.headers) {
      if (req.headers.hasOwnProperty(key)) {
        req.headers[key] = escapeHTML(req.headers[key]); // Escape header values
      }
    }
  }
  next();
};

export default xssProtection;
