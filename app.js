const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index");
const swaggerDocs = require('./docs/V1/swagger');
require("dotenv").config();

const db = require('./db');

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

app.use("/api", routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    swaggerDocs(app, PORT);

})