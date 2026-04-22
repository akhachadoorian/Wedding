// scripts/mappings/HomeHero.mapping.ts
// Defines how vault content in Home.md > ## Hero maps to HomeHero props

import type { MappingConfig } from "../../core/types";

const HomeHeroMapping: MappingConfig = {
  source: "Home",
  section: "Hero",
  component: "HomeHero",
  componentPath: "/components/heros/HomeHero/HomeHero",
  propsImport: 'Omit<HomeHeroProps, "loading">',

  props: {
    "heading.line1": {
      field: "Heading",
      transform: (val) => val.split(" & ")[0].trim(),
    },
    "heading.line2": {
      field: "Heading",
      transform: (val) => "& " + val.split(" & ")[1].trim(),
    },
    "eyebrow.variation": {
      value: "double",
    },
    "eyebrow.text": {
      field: "Eyebrow",
      transform: (val) => val.split(" · ")[0].trim(),
    },
    "eyebrow.doubleText": {
      field: "Eyebrow",
      transform: (val) => val.split(" · ")[1].trim(),
    },

    "btn.btnText": {
      field: "CTA Button",
      column: "content",
    },
    "btn.link": {
      field: "CTA Button",
      column: "link",
    },

    "image.src": {
      field: "Image",
      column: "content",
    },
    "image.alt": {
      field: "Image",
      column: "link",
    },
  },
};

export default HomeHeroMapping;

