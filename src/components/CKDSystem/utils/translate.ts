// Mock translation function (replace with actual translation service in production)
export function translate(text: string, targetLang: string): string {
  // This is a mock function. In a real application, you would use a translation service.
  if (targetLang === 'en') return text;
  return `[${targetLang.toUpperCase()}] ${text}`;
}