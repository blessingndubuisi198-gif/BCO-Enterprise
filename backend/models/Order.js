
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        image: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        product: {
          type: String,
          required: true,
        },
      },
    ],

    shippingAddress: {
      address: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },

    paymentMethod: {
      type: String,
      default: "Dummy Payment",
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,

    isDelivered: {
      type: Boolean,
      default: false,
    },

    deliveredAt: Date,

    status: {
      type: String,
      enum: [
        "Processing",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Processing",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
