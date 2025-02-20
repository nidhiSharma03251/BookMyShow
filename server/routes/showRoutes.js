const crypto = require('crypto');
const router = require ('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Show = require('../models/showSchema');
const razorpayInstance = require('../razorpay/instance');


router.post("/make-payment", authMiddleware, async(req,res) =>{
    try {
        const {totalAmount} = req.body;
        const order = await razorpayInstance.orders.create({
            amount: totalAmount * 100,
            currency: "INR"
        });
        res.send({
            success: true,
            message: 'Order ID created',
            data: order
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message 
        })
    }
})

router.post("/validate-payment", authMiddleware, async(req,res) =>{
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
    const sha = crypto.createHmac("sha256", 'c2PISX5AhQub1X7TqIhuW9ZH')
    sha.update(`${razorpay_order_id}-${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if(digest != razorpay_signature){
        res.setMaxListeners(400).json({msg: 'Transaction is not right!'})
    }
    res.send({
        success: true,
        message: "Transaction validated",
        data:{
            orderId: razorpay_order_id,
            transactionId: razorpay_payment_id
        }
    })
})


router.get("/:showId", authMiddleware, async(req,res)=>{
    try {
        const show = await Show.findById(req.params.showId).populate('movies').populate('theatre');
        res.send({
            success: true,
            message:"Show fetched",
            data: show
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message 
        })
    }
})



module.exports = router;