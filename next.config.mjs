import nextMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  async redirects() {
    return [
      {
        source: '/30',
        destination: 'https://cal.com/youngbloodcyb/sync',
        permanent: false,
      },
    ]
  },
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
