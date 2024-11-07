import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PatientForm } from './PatientForm';
import { ResultsDisplay } from './ResultsDisplay';
import { ChatInterface } from './ChatInterface';
import { translate } from './utils/translate';
import { languages } from './data/languages';
import type { FormData, AnalysisResult } from './types';

export default function CKDSystem() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [aiAssisted, setAiAssisted] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [formData, setFormData] = useState<FormData>({
    hospitalId: "",
    hospitalName: "",
    name: "",
    dob: "",
    creatinine: "",
    urea: "",
    hemoglobin: "",
    bp: "",
    diabetes: "",
    albumin: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Simulate result based on form data
    const simulatedResult = {
      risk: Math.random() > 0.5 ? "High" : "Low",
      stage: ["No CKD", "Stage 1", "Stage 2", "Stage 3", "Stage 4", "Stage 5"][Math.floor(Math.random() * 6)],
      advice: "Please consult with a nephrologist for a comprehensive evaluation and personalized treatment plan.",
      diet: "Based on your CKD stage...",
      outcomes: "Possible outcomes for Chronic Kidney Disease..."
    };
    setResult(simulatedResult);
  };

  const toggleAIAssisted = () => {
    setAiAssisted(!aiAssisted);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardTitle className="text-2xl">{translate("CKD Detection and Monitoring System", currentLanguage)}</CardTitle>
        <CardDescription className="text-blue-100">
          {translate("Enter patient data to assess the risk and stage of Chronic Kidney Disease", currentLanguage)}
        </CardDescription>
        <div className="flex justify-between items-center mt-4">
          <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
            <SelectTrigger className="w-[180px] bg-white text-black">
              <SelectValue placeholder={translate("Select language", currentLanguage)} />
            </SelectTrigger>
            <SelectContent>
              {languages.map(lang => (
                <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={toggleAIAssisted} variant="secondary">
            {aiAssisted ? translate("Disable AI Assistance", currentLanguage) : translate("Enable AI Assistance", currentLanguage)}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="input" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-blue-100 dark:bg-gray-700">
            <TabsTrigger value="input" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              {translate("Patient Input", currentLanguage)}
            </TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              {translate("Results & Advice", currentLanguage)}
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              {translate("Chat with Dr. Asafo", currentLanguage)}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="input">
            <PatientForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              currentLanguage={currentLanguage}
              aiAssisted={aiAssisted}
            />
          </TabsContent>
          <TabsContent value="results">
            <ResultsDisplay
              result={result}
              currentLanguage={currentLanguage}
            />
          </TabsContent>
          <TabsContent value="chat">
            <ChatInterface currentLanguage={currentLanguage} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-sm text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-gray-900">
        {translate("Note: This system is for screening purposes only. Always consult with a healthcare professional for accurate diagnosis and treatment.", currentLanguage)}
      </CardFooter>
    </Card>
  );
}