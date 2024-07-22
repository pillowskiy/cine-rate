/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'],
  },
  output: 'standalone',
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

const withNextIntl = require('next-intl/plugin')();

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
