const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')

    if (purchaseAd.purchaseBy) {
      return res.status(400).json({ error: 'Ad already sold' })
    }

    const user = await User.findById(req.userId)

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    const purchase = await Purchase.create({
      ad: purchaseAd,
      buyer: user,
      content
    })

    return res.json(purchase)
  }
}

module.exports = new PurchaseController()
