// Gemini AI Service for ShikshaMate
// Enables dynamic formula lookup, custom doubt solving, and multilingual tutoring

export const getGeminiApiKey = () => {
  return localStorage.getItem('shikshamate_gemini_api_key') || 
         import.meta.env.VITE_GEMINI_API_KEY || 
         '';
};

export const setGeminiApiKey = (key) => {
  if (key) {
    localStorage.setItem('shikshamate_gemini_api_key', key.trim());
  } else {
    localStorage.removeItem('shikshamate_gemini_api_key');
  }
};

const LANGUAGE_NAMES = {
  en: 'English',
  hi: 'Hindi (हिंदी)',
  mr: 'Marathi (मराठी)',
  ta: 'Tamil (தமிழ்)',
  te: 'Telugu (తెలుగు)',
  kn: 'Kannada (ಕನ್ನಡ)'
};

/**
 * Dynamically search/generate any educational formula or theorem using Gemini
 */
export async function searchFormulaWithGemini(query, subject = 'All', lang = 'en') {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error('MISSING_API_KEY');
  }

  const targetLang = LANGUAGE_NAMES[lang] || 'English';

  const prompt = `You are ShikshaMate AI, an Indian curriculum expert (NCERT, CBSE, JEE, NEET, State Boards).
A student is searching for the formula: "${query}" in subject: "${subject}".

Please provide the complete, accurate formula and curriculum details in ${targetLang}.
Respond ONLY with a valid JSON object matching this exact structure:
{
  "subject": "${subject === 'All' ? 'Physics/Chemistry/Math/Biology' : subject}",
  "topic": "Specific chapter or unit name",
  "title": "Clear formula title",
  "formula": "Standard mathematical formula with proper notation",
  "examNote": "High-yield examiner marking tip, sign conventions, or common pitfalls for Indian exams",
  "concept": "1-2 sentence core concept summary"
}
Do not include markdown code fence formatting like \`\`\`json. Just the raw JSON object.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 800
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `HTTP error ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Clean potential markdown quotes
    const cleanedText = candidateText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanedText);

    return {
      subject: parsed.subject || subject,
      topic: parsed.topic || 'General Science',
      title: parsed.title || query,
      formula: parsed.formula || '',
      examNote: parsed.examNote || '',
      concept: parsed.concept || '',
      isGeminiGenerated: true
    };
  } catch (err) {
    console.error('Gemini formula search error:', err);
    throw err;
  }
}

/**
 * Solve custom user doubts with step-by-step breakdown using Gemini
 */
export async function solveCustomDoubtWithGemini(query, curriculum = 'NCERT', lang = 'en') {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error('MISSING_API_KEY');
  }

  const targetLang = LANGUAGE_NAMES[lang] || 'English';

  const prompt = `You are ShikshaMate AI, an Indian curriculum tutor for ${curriculum}.
Solve the following student problem step-by-step in ${targetLang}:
"${query}"

Respond ONLY with a valid JSON object matching this structure:
{
  "title": "Short title of the problem",
  "subject": "Subject (Physics/Chemistry/Math/Biology)",
  "boardTag": "${curriculum} Curriculum Aligned",
  "conceptSummary": "Core formula and theorem applied",
  "solutionSteps": [
    { "title": "Step 1: Given Data & Sign Conventions", "content": "..." },
    { "title": "Step 2: Formula Application & Derivation", "content": "..." },
    { "title": "Step 3: Calculation & Result", "content": "..." },
    { "title": "Step 4: Examiner Marking Scheme Tip", "content": "..." }
  ],
  "practiceQuestions": [
    { "q": "Practice question 1", "hint": "Hint 1" },
    { "q": "Practice question 2", "hint": "Hint 2" }
  ]
}
Do not include markdown code block syntax. Only valid JSON.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 1500 }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `HTTP error ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleanedText = candidateText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (err) {
    console.error('Gemini doubt solver error:', err);
    throw err;
  }
}
