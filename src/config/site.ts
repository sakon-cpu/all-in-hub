export const siteConfig = {
  name: "ALLIN CINEMA",
  url: "https://all-in-hub.vercel.app",
  ogImage: "https://all-in-hub.vercel.app/og.png",
  description: "Creative Hub for Visionary Filmmakers",
  links: {
    x: "allin_inc",
    instagram: "allin_inc",
  },
  videoFiles: [
    { src: "/hero-background.mp4", start: 0 },
    { src: "/drone-neokabukicho.mp4", start: 1 }
  ],
  featuredWorkId: "nexus-protocol", // Example ID
};

export type SiteConfig = typeof siteConfig;
