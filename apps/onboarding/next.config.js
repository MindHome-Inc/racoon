const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ['promise.hedvig.com'],
  },
  experimental: {
    emotion: true,
  },
}
