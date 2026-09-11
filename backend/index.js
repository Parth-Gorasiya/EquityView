require("dotenv").config();
const { symbolMap } = require("./config/symbolMap");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { getStockQuote } = require("./services/marketDataService");

const { OrdersModel } = require("./model/OrdersModel");

const app = express();

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

app.set("trust proxy", 1);

app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.DASHBOARD_URL],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("EquityView backend is running");
});

// app.get("/addHoldings" , async(req,res) => {
//   let tempHoldings = [
//   {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//     isLoss: false,
//   },
//   {
//     name: "HDFCBANK",
//     qty: 2,
//     avg: 1383.4,
//     price: 1522.35,
//     net: "+10.04%",
//     day: "+0.11%",
//     isLoss: false,
//   },
//   {
//     name: "HINDUNILVR",
//     qty: 1,
//     avg: 2335.85,
//     price: 2417.4,
//     net: "+3.49%",
//     day: "+0.21%",
//     isLoss: false,
//   },
//   {
//     name: "INFY",
//     qty: 1,
//     avg: 1350.5,
//     price: 1555.45,
//     net: "+15.18%",
//     day: "-1.60%",
//     isLoss: true,
//   },
//   {
//     name: "ITC",
//     qty: 5,
//     avg: 202.0,
//     price: 207.9,
//     net: "+2.92%",
//     day: "+0.80%",
//     isLoss: false,
//   },
//   {
//     name: "KPITTECH",
//     qty: 5,
//     avg: 250.3,
//     price: 266.45,
//     net: "+6.45%",
//     day: "+3.54%",
//     isLoss: false,
//   },
//   {
//     name: "M&M",
//     qty: 2,
//     avg: 809.9,
//     price: 779.8,
//     net: "-3.72%",
//     day: "-0.01%",
//     isLoss: true,
//   },
//   {
//     name: "RELIANCE",
//     qty: 1,
//     avg: 2193.7,
//     price: 2112.4,
//     net: "-3.71%",
//     day: "+1.44%",
//     isLoss: false,
//   },
//   {
//     name: "SBIN",
//     qty: 4,
//     avg: 324.35,
//     price: 430.2,
//     net: "+32.63%",
//     day: "-0.34%",
//     isLoss: true,
//   },
//   {
//     name: "SGBMAY29",
//     qty: 2,
//     avg: 4727.0,
//     price: 4719.0,
//     net: "-0.17%",
//     day: "+0.15%",
//     isLoss: false,
//   },
//   {
//     name: "TATAPOWER",
//     qty: 5,
//     avg: 104.2,
//     price: 124.15,
//     net: "+19.15%",
//     day: "-0.24%",
//     isLoss: true,
//   },
//   {
//     name: "TCS",
//     qty: 1,
//     avg: 3041.7,
//     price: 3194.8,
//     net: "+5.03%",
//     day: "-0.25%",
//     isLoss: true,
//   },
//   {
//     name: "WIPRO",
//     qty: 4,
//     avg: 489.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",
//     isLoss: false,
//   },
// ];

// tempHoldings.forEach((item) => {
//   let newHolding = new HoldingsModel({
//     name: item.name,
//     qty: item.qty,
//     avg: item.avg,
//     price: item.price,
//     net: item.net,
//     day: item.day,
//   });

//   newHolding.save();

// });

// res.send("Done!");

// })

// app.get("/addPositions", async(req, res) => {
//   let tempPositions = [
//   {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "-1.24%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "-1.35%",
//     day: "-1.35%",
//     isLoss: true,
//   },
// ];

// tempPositions.forEach((item) => {
//   let newPosition = new PositionsModel({
//     product: item.product,
//     name: item.name,
//     qty: item.qty ,
//     avg: item.avg,
//     price: item.price,
//     net : item.net,
//     day: item.day,
//     isLoss : item.isLoss,
//   });

//   newPosition.save();
// });
// res.send("Done!");
// })

app.get("/allHoldings", protect, async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({
      user: req.user._id,
    }).sort({
      name: 1,
    });

    const updatedHoldings = await Promise.all(
      allHoldings.map(async (holding) => {
        try {
          const yahooSymbol = symbolMap[holding.name];

          if (!yahooSymbol) {
            return holding.toObject();
          }

          const quote = await getStockQuote(yahooSymbol);

          const currentPrice = Number.isFinite(quote.currentPrice)
            ? quote.currentPrice
            : Number(holding.price);

          const previousClose = Number.isFinite(quote.previousClose)
            ? quote.previousClose
            : currentPrice;

          const averagePrice = Number(holding.avg);

          const netChange =
            averagePrice > 0
              ? ((currentPrice - averagePrice) / averagePrice) * 100
              : 0;

          const dayChange =
            previousClose > 0
              ? ((currentPrice - previousClose) / previousClose) * 100
              : 0;

          return {
            ...holding.toObject(),
            price: currentPrice,
            net: `${netChange >= 0 ? "+" : ""}${netChange.toFixed(2)}%`,
            day: `${dayChange >= 0 ? "+" : ""}${dayChange.toFixed(2)}%`,
            isLoss: dayChange < 0,
            marketTime: quote.marketTime,
          };
        } catch (error) {
          console.error(`Unable to update ${holding.name}:`, error.message);

          return holding.toObject();
        }
      }),
    );

    res.status(200).json(updatedHoldings);
  } catch (error) {
    console.error("Unable to load holdings:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load holdings.",
      error: error.message,
    });
  }
});

app.get("/allPositions", protect, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({
      user: req.user._id,
    }).sort({
      name: 1,
    });

    res.status(200).json(allPositions);
  } catch (error) {
    console.error("Unable to load positions:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load positions.",
      error: error.message,
    });
  }
});

app.get("/allOrders", protect, async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(allOrders);
  } catch (error) {
    console.error("Unable to load orders:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load orders.",
      error: error.message,
    });
  }
});

app.post("/newOrder", protect, async (req, res) => {
  try {
    const name = req.body.name?.trim().toUpperCase();
    const qty = Number(req.body.qty);
    const price = Number(req.body.price);
    const mode = req.body.mode?.toUpperCase();

    if (
      !name ||
      !Number.isFinite(qty) ||
      qty <= 0 ||
      !Number.isFinite(price) ||
      price < 0 ||
      !["BUY", "SELL"].includes(mode)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order details.",
      });
    }

    const existingHolding = await HoldingsModel.findOne({
      user: req.user._id,
      name,
    });

    if (mode === "BUY") {
      if (existingHolding) {
        const oldInvestment = existingHolding.avg * existingHolding.qty;

        const newInvestment = price * qty;
        const totalQuantity = existingHolding.qty + qty;

        existingHolding.avg = (oldInvestment + newInvestment) / totalQuantity;

        existingHolding.qty = totalQuantity;
        existingHolding.price = price;
        existingHolding.net = "0.00%";
        existingHolding.day = "0.00%";

        await existingHolding.save();
      } else {
        await HoldingsModel.create({
          user: req.user._id,
          name,
          qty,
          avg: price,
          price,
          net: "0.00%",
          day: "0.00%",
        });
      }
    }

    if (mode === "SELL") {
      if (!existingHolding) {
        return res.status(404).json({
          success: false,
          message: `You do not own ${name}.`,
        });
      }

      if (qty > existingHolding.qty) {
        return res.status(400).json({
          success: false,
          message: `You only own ${existingHolding.qty} shares of ${name}.`,
        });
      }

      existingHolding.qty -= qty;
      existingHolding.price = price;

      if (existingHolding.qty === 0) {
        await HoldingsModel.deleteOne({
          _id: existingHolding._id,
          user: req.user._id,
        });
      } else {
        await existingHolding.save();
      }
    }

    const newOrder = await OrdersModel.create({
      user: req.user._id,
      name,
      qty,
      price,
      mode,
    });

    res.status(201).json({
      success: true,
      message: "Order saved successfully.",
      order: newOrder,
    });
  } catch (error) {
    console.error("Unable to place order:", error);

    res.status(500).json({
      success: false,
      message: "Unable to place the order.",
      error: error.message,
    });
  }
});

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URL);

    console.log("Connected to the EquityView database");

    app.listen(PORT, () => {
      console.log(`App started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

startServer();
