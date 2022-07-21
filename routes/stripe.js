



const router = require("express").Router();
const stripe = require("stripe")("sk_test_51Jmw2HSH1Oy11i01YUwCZBMXt2R2RmAbtZFFLoRPuWWJsH3ffwfuLDl8rOIgqyjsiQl86QSaToeoDqzD7JSZJ0QW00j6DyE7c6");

router.post("/payment", async (req, res) => {
  const { products } = req.body;

  const transformedItems = products.map(item => ({
    description: item.desc,
    quantity: item.quantity,
    price_data: {
      currency: "USD",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.img],
      }
    }
  }));

  const session = await stripe.checkout.sessions.create({

    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ['GB', 'US', 'CA']
    },
    line_items: transformedItems,
    mode: 'payment',
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/cart`,
    metadata: {
      images: JSON.stringify(products.map(item => item.img)),
    }
  });

  res.status(200).json({ id: session.id });

});

module.exports = router;