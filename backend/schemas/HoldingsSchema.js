const { Schema } = require("mongoose");

const HoldingsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
       required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    qty: {
      type: Number,
      required: true,
      min: 0,
    },

    avg: {
      type: Number,
      required: true,
      min: 0,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    net: {
      type: String,
      default: "0.00%",
    },

    day: {
      type: String,
      default: "0.00%",
    },
  },
  {
    timestamps: true,
  }
);

HoldingsSchema.index(
  {
    user: 1,
    name: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      user: {
        $type: "objectId",
      },
    },
  }
);

module.exports = { HoldingsSchema };