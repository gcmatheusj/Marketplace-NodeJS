const kue = require('kue')
const redisConfig = require('../../config/redis')
const Sentry = require('@sentry/node')
const Jobs = require('../jobs')

const Queue = kue.createQueue({ redis: redisConfig })

Queue.process(Jobs.PurchaseMail.key, Jobs.PurchaseMail.handle)

Queue.on('error', Sentry.captureException)

module.exports = Queue
