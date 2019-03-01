const Ad = require('../models/Ad')

class AcceptController {
  async update (req, res) {
    const { id } = req.params
    const { purchaseBy } = req.body

    const ad = await Ad.findById(id)

    if (!ad.author._id.equals(req.userId)) {
      return res.status(401).json({ error: "You're not the ad author" })
    }

    ad.purchaseBy = purchaseBy

    ad.save()

    return res.json(ad)
  }
}

module.exports = new AcceptController()
