/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: {
            ssr: true,
            displayName: false,
            fileName: false
        },
    },
};

module.exports = nextConfig;
