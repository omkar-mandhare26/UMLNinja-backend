import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World There");
});

app.listen(3000, () => {
    console.log("Server Running on PORT 3000");
});
