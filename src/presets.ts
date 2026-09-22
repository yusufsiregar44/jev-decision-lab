export const presets = {
  support: {
    name: "Support triage",
    text: "I was charged twice, and now I can’t log in before my meeting.",
    choice: "Which team should handle this?",
    options: ["billing", "technical", "general"],
    score: "How urgently does this need attention?",
    levels: ["Can wait", "This week", "Today"],
    noul: "Does this describe blocked account access?",
  },
  research: {
    name: "Research relevance",
    text: "Acme reported stronger revenue, but cash flow fell as inventory accumulated. Management expects demand to recover next quarter.",
    choice: "What is the main research topic?",
    options: ["earnings", "industry", "other"],
    score: "How relevant is this to cash-flow research?",
    levels: ["Unrelated", "Indirectly relevant", "Directly relevant"],
    noul: "Does this mention deteriorating cash flow?",
  },
  router: {
    name: "Request routing",
    text: "Find the cancellation terms in our subscription policy.",
    choice: "Which tool fits this request?",
    options: ["document_search", "calculator", "human_review"],
    score: "How clearly is the task specified?",
    levels: ["Unclear", "Partly specified", "Clear"],
    noul: "Does the answer require internal documents?",
  },
};
export type PresetId = keyof typeof presets;
