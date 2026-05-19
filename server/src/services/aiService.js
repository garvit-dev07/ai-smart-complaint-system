const axios = require("axios");

const priorityRules = [
  {
    priority: "Critical",
    keywords: ["fire", "explosion", "electrocution", "accident", "gas leak", "short circuit"],
  },
  {
    priority: "High",
    keywords: ["electricity", "water leakage", "overflow", "sewage", "unsafe", "danger", "urgent"],
  },
  {
    priority: "Medium",
    keywords: ["garbage", "street light", "drain", "road damage", "sanitation"],
  },
];

const departmentMap = [
  { department: "Water Department", keywords: ["water", "pipeline", "leakage", "supply"] },
  { department: "Electricity Department", keywords: ["electricity", "power", "transformer", "voltage"] },
  { department: "Sanitation Department", keywords: ["garbage", "waste", "cleanliness", "sanitation"] },
  { department: "Public Works Department", keywords: ["road", "pothole", "bridge", "drain"] },
  { department: "Health Department", keywords: ["hospital", "mosquito", "medical", "health"] },
];

const summarizeText = (text) => {
  if (!text) {
    return "";
  }

  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= 120) {
    return normalized;
  }

  return `${normalized.slice(0, 117)}...`;
};

const getPriority = (content) => {
  const matchedRule = priorityRules.find((rule) =>
    rule.keywords.some((keyword) => content.includes(keyword))
  );

  return matchedRule ? matchedRule.priority : "Medium";
};

const getDepartment = (content, category) => {
  const categoryContent = `${content} ${category || ""}`.toLowerCase();
  const match = departmentMap.find((item) =>
    item.keywords.some((keyword) => categoryContent.includes(keyword))
  );

  return match ? match.department : "General Support";
};

const buildFallbackAnalysis = (payload) => {
  const content = `${payload.title} ${payload.description} ${payload.category} ${payload.location}`.toLowerCase();
  const priority = getPriority(content);
  const department = getDepartment(content, payload.category);
  const summary = summarizeText(payload.description);
  const autoResponse = `Dear ${payload.name}, your complaint titled "${payload.title}" has been registered. It has been marked as ${priority} priority and forwarded to the ${department}.`;

  return {
    priority,
    department,
    summary,
    autoResponse,
    source: "heuristic",
  };
};

const analyzeWithOpenRouter = async (payload) => {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY not configured");
  }

  const prompt = `
You are analyzing a public complaint for a smart complaint management system.
Return only valid JSON with these keys:
priority: one of Low, Medium, High, Critical
department: string
summary: string under 30 words
autoResponse: string under 45 words

Complaint:
Name: ${payload.name}
Email: ${payload.email}
Title: ${payload.title}
Description: ${payload.description}
Category: ${payload.category}
Location: ${payload.location}
`.trim();

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      timeout: 20000,
    }
  );

  const content = response.data?.choices?.[0]?.message?.content;
  const parsed = JSON.parse(content);

  return {
    priority: parsed.priority || "Medium",
    department: parsed.department || "General Support",
    summary: parsed.summary || summarizeText(payload.description),
    autoResponse:
      parsed.autoResponse ||
      `Dear ${payload.name}, your complaint has been received and will be reviewed shortly.`,
    source: "openrouter",
  };
};

const analyzeComplaint = async (payload) => {
  try {
    return await analyzeWithOpenRouter(payload);
  } catch (error) {
    return buildFallbackAnalysis(payload);
  }
};

module.exports = { analyzeComplaint };
