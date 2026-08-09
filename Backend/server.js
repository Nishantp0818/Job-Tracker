require('dotenv').config();
const App = require("./src/app");
const connectDB = require("./src/db/db.js");

const PORT = process.env.PORT || 3000;

App.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    connectDB().catch((err) => {
        console.error("MongoDB connection warning:", err.message);
    });
});


