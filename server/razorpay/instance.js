const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_aTWXrydBNbAy6V',
    key_secret: 'c2PISX5AhQub1X7TqIhuW9ZH'
})

module.exports = razorpayInstance;