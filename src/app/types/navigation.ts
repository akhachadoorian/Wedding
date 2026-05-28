/**
 * A standard navigation link that routes to a page.
 */
export type NavLink = {
  kind: "link"
  /** Display text shown in the nav */
  text: string
  /** Text to display if dropdown element */
  body?: string
  /** Route path e.g. "/registry" or "/details#venue" */
  link: string
}

/**
 * A top level nav item that has a clickable link
 * and expands to show child links.
 */
export type NavDropdown = {
  kind: "dropdown"
  /** Display text shown in the nav */
  text: string
  /** Route path for the dropdown's own link */
  link: string
  /** Links shown when the dropdown is expanded */
  children: NavLink[]
}

/**
 * A single item in the top level navigation.
 * Use `kind` to narrow to the specific type:
 *
 * @example
 * if (item.kind === "dropdown") {
 *   // item is NavDropdown
 * }
 */
export type NavItem = NavLink | NavDropdown