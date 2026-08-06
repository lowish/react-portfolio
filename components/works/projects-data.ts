export type ProjectItem = {
  title: string
  image: string
  url: string
  description: string
}

export const projects: ProjectItem[] = [
  {
    title: "DEVKIT",
    image: "/Devkit.jpg",
    url: "https://devkit-ph.vercel.app/",
    description:
      "A curated collection of essential resources for modern developers, from AI assistants to hosting platforms and component libraries.",
  },
  {
    title: "HomeVia",
    image: "/homevia.jpg",
    url: "https://homevia-eta.vercel.app/",
    description:
      "HomeVia is a real estate platform. It showcases properties in the Philippines, helping users explore and discover their perfect place to live.",
  },
  {
    title: "Campus Hau",
    image: "/CampusHAU.jpg",
    url: "https://campushau.vercel.app/",
    description:
      "CampusHau is a campus-focused web platform built on the MEVN stack to streamline student access to school-related services and information.",
  },
]