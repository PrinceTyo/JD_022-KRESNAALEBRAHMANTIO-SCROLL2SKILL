import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/database";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});