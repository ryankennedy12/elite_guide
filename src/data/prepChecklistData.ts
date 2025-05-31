
export interface ChecklistItem {
  text: string;
  priority?: boolean;
  tooltip?: string;
}

export interface ChecklistSection {
  title: string;
  tip: string;
  items: ChecklistItem[];
}

export const prepChecklistData: ChecklistSection[] = [
  {
    title: "BEFORE",
    tip: "Get organized now to prevent future stress.",
    items: [
      {
        text: "Take clear photos or videos of all water intrusion, damp spots, stains, and existing repairs",
        priority: true,
        tooltip: "Visual evidence protects you if there are disputes about existing conditions"
      },
      {
        text: "List when water problems typically occur (after rain, snow melt, certain seasons)",
        tooltip: "Patterns help contractors understand the root cause faster"
      },
      {
        text: "Gather any previous inspection reports or contractor bids",
        tooltip: "Previous work history can reveal patterns and save diagnostic time"
      },
      {
        text: "Note if your basement is finished, partially finished, or unfinished",
        tooltip: "Affects installation methods and costs significantly"
      },
      {
        text: "List valuables or items that need special protection or moving before work",
        priority: true
      },
      {
        text: "Identify if you have a water softener, laundry, or other plumbing draining into your sump",
        tooltip: "Affects system sizing and backup requirements"
      },
      {
        text: "Print or save the Quick-Reference Cheat Sheet"
      },
      {
        text: "Highlight 2–3 top concerns (warranty, delays, type of system, etc.) that matter most to your family"
      },
      {
        text: "Decide: Is lowest price your #1 factor? Or long-term peace of mind?"
      }
    ]
  },
  {
    title: "DURING",
    tip: "Ask questions and document everything in real time.",
    items: [
      {
        text: "Use the Elite 12 Questions as your script—write down answers in real time",
        priority: true,
        tooltip: "Real-time documentation prevents forgotten details and ensures accountability"
      },
      {
        text: "Mark any red flags or evasive answers",
        tooltip: "Evasive answers often indicate hidden problems or inexperienced contractors"
      },
      {
        text: "Ask for a sample contract, warranty, and diagnostic report",
        priority: true
      },
      {
        text: "Request product brochures or cut sheets for any recommended pumps or materials",
        tooltip: "Allows you to research products independently and verify quality"
      },
      {
        text: "Ask about timeline, communication policy, and site cleanup"
      },
      {
        text: "Confirm who will actually perform the work (employees vs. subs)",
        tooltip: "Subcontractors may not have the same training or accountability"
      },
      {
        text: "Make sure they inspect all problem areas-not just where they want to sell you a system"
      }
    ]
  },
  {
    title: "AFTER",
    tip: "Double-check details before signing off.",
    items: [
      {
        text: "Compare answers and written materials from each contractor, side-by-side",
        priority: true,
        tooltip: "Side-by-side comparison reveals inconsistencies and helps identify the best value"
      },
      {
        text: "Use your gut: Who made you feel most confident? Who dodged your questions?"
      },
      {
        text: "Call or email a recent customer for honest feedback",
        tooltip: "Recent customers give the most accurate picture of current service quality"
      },
      {
        text: "Search Google, BBB, and the Ohio Attorney General's database for complaints",
        priority: true
      },
      {
        text: "Never accept \"we'll take care of it\" as an answer-insist on documentation before signing"
      },
      {
        text: "Request a written summary of their recommendations and price, emailed to you for your records"
      }
    ]
  }
];
