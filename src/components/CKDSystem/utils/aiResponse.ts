import { ckdKnowledgeBase } from '../data/knowledgeBase';
import { translate } from './translate';

export function generateAIResponse(userMessage: string, currentLanguage: string): string {
  const lowerCaseMessage = userMessage.toLowerCase();
  let response = "";
  
  if (lowerCaseMessage.includes("help") && lowerCaseMessage.includes("form")) {
    response = "Of course! I'd be happy to help you fill out the form. What specific field do you need help with? You can ask about selecting a hospital, patient name, date of birth, serum creatinine, blood urea, hemoglobin, blood pressure, diabetes status, or albumin.";
  } else if (lowerCaseMessage.includes("hospital")) {
    response = "To select a hospital, first choose your region, then your district, and finally the specific hospital. This will automatically fill in the Hospital ID and Hospital Name fields for you. If you can't find your hospital, please contact your administrator to have it added to the system.";
  } else if (lowerCaseMessage.includes("creatinine")) {
    response = "Serum creatinine is a waste product that comes from the normal wear and tear of muscles. Normal levels typically range from 0.6 to 1.2 mg/dL for men and 0.5 to 1.1 mg/dL for women. You can find this value in your recent blood test results. Elevated levels may indicate kidney problems.";
  } else if (lowerCaseMessage.includes("what is ckd")) {
    response = "CKD stands for Chronic Kidney Disease. It's a condition characterized by a gradual loss of kidney function over time. The kidneys filter wastes and excess fluids from your blood, which are then excreted in your urine. When chronic kidney disease reaches an advanced stage, dangerous levels of fluid, electrolytes, and wastes can build up in your body.";
  } else if (lowerCaseMessage.includes("symptoms")) {
    response = `Common symptoms of CKD include: ${ckdKnowledgeBase.symptoms.join(", ")}. However, CKD may not become apparent until your kidney function is significantly impaired.`;
  } else if (lowerCaseMessage.includes("treatment")) {
    response = `Treatment for CKD focuses on slowing the progression of kidney damage and depends on the underlying cause and stage of the disease. Common treatments include: ${ckdKnowledgeBase.treatments.join(", ")}.`;
  } else {
    response = "I apologize, I'm not sure I fully understood your question. Could you please rephrase or ask about a specific aspect of CKD such as symptoms, risk factors, stages, treatment, diet, or prognosis?";
  }

  return translate(response, currentLanguage);
}