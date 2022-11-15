/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   compiler: {
      styledComponents: true
   },
   images: {
      domains: ['i.scdn.co', 'platform-lookaside.fbsbx.com']
   }
}

module.exports = nextConfig
