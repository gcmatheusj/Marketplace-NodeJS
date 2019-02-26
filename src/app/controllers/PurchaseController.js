const Ad = require('../models/Ad')
const USer = require('../models/User')
const Mail = require('../services/Mail')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await USer.findById(req.userId)

    await Mail.sendMail({
      from: '"Matheus Castro" <matheus@email.com>',
      to: purchaseAd.author.email,
      subject: `Solicitação de compra: ${purchaseAd.title}`,
      html: `<p>Teste: ${content}</p>`
    })

    return res.send()
  }
}

module.exports = new PurchaseController()
