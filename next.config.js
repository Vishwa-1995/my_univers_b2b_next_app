/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    async rewrites() {
        return [
            {
                source: '/public/images/:path*',
                destination: 'http://localhost:5000/public/images/:path*',
            },
        ];
    },
};
