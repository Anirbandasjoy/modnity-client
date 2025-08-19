export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // disallow: "/private/",
    },
    sitemap: "https://server.ponnobari.store/api/v1/sitemap.xml",
  };
}
