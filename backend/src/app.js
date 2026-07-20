const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const testRoutes = require("./routes/test.routes");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const favoriteRoutes = require("./routes/favorite.routes");
const statsRoutes = require("./routes/stats.routes");
const orderRoutes = require("./routes/order.routes");

app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Lampify API is running");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
