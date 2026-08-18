import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hamza Enterprises",
    short_name: "Hamza Ent.",
    description: "Heavy equipment parts import and supply",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f5f3",
    theme_color: "#171717",
    icons: [
      {
        src: "/HE.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/HE-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/HE-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}