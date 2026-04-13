import type { NavItem } from "../types/navigation"

/**
 * Top level navigation items rendered in the desktop and mobile nav.
 *
 * Add new routes here — no changes needed in the Navigation component.
 * Use `kind: "link"` for direct routes, `kind: "dropdown"` for items
 * with child links.
 *
 * @see {@link NavItem} for the full type definition
 */
export const NAV_ITEMS = [
  {
    kind: "dropdown" as const,
    text: "Details",
    link: "/details",
    children: [
      { kind: "link" as const, text: "Venue", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." ,link: "/details#venue" },
      { kind: "link" as const, text: "Timeline", link: "/details#timeline" },
    ]
  },
  { kind: "link" as const, text: "Accommodations", link: "/accommodations" },
  { kind: "link" as const, text: "Registry", link: "/registry" },
  { kind: "link" as const, text: "RSVP", link: "/rsvp" },
] satisfies NavItem[]