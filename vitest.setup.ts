import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
    cleanup();
});

// jsdom does not implement scrollIntoView, and RSVPForm calls it on every step change.
// Guarded because this setup file also runs for route tests using the Node environment,
// where `Element` doesn't exist at all.
if (typeof Element !== "undefined") {
    Element.prototype.scrollIntoView = vi.fn();
}
