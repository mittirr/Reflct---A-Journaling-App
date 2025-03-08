/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pixabay.com"
            },
            {
                protocol: "https",
                hostname: "cdn.pixabay.com"
            },
        ],
    },
};

export default nextConfig;
