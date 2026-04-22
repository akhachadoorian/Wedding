// scripts/mappings/WeddingTimeline.mapping.ts
// Defines how vault content in "Wedding Day Timeline.md" maps to WeddingTimeline props

import type { TimelineMappingConfig } from "../../core/types";

const WeddingTimelineMapping: TimelineMappingConfig = {
  source: "Timeline",
  component: "WeddingTimeline",
  componentPath: "",

  metadata: {
    section: "Metadata",
  },

  sections: {
    categories: {
      section: "Categories",
      columns: {
        id:    { column: "ID" },
        label: { column: "Label" },
        color: { column: "Color" },
      },
    },

    lanes: {
      section: "Lanes",
      columns: {
        id:    { column: "ID" },
        label: { column: "Label" },
        order: { column: "Order", transform: (v) => parseInt(v, 10) },
      },
    },

    events: {
      section: "Events",
      columns: {
        lane:     { column: "Lane" },
        start:    { column: "Start" },
        end:      { column: "End" },
        title:    { column: "Title" },
        category: { column: "Category" },
        notes:    { column: "Notes" },
      },
    },
  },
};

export default WeddingTimelineMapping;