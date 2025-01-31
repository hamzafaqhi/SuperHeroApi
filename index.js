import app from "./src/connectors/express.js";
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(
    "info",
    `[server]: server is running at http://localhost:${port}`
  );
});
