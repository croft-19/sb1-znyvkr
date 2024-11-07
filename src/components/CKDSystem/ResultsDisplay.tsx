import { Button } from "@/components/ui/button";
import { Printer, Volume2 } from 'lucide-react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { translate } from './utils/translate';
import { eGFRData } from './data/chartData';
import type { AnalysisResult } from './types';

interface ResultsDisplayProps {
  result: AnalysisResult | null;
  currentLanguage: string;
}

export function ResultsDisplay({ result, currentLanguage }: ResultsDisplayProps) {
  const handlePrint = () => {
    window.print();
  };

  const speakText = (text: string) => {
    // In a real application, this would use the Web Speech API
    console.log("Speaking:", text);
  };

  if (!result) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        {translate("No analysis results yet. Please input patient data and click \"Analyze\".", currentLanguage)}
      </p>
    );
  }

  return (
    <div className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
        <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">
          {translate("Analysis Result:", currentLanguage)}
        </h3>
        <p>
          {translate("Risk Level:", currentLanguage)}
          <span className={result.risk === "High" ? "text-red-500" : "text-green-500"}>
            {result.risk}
          </span>
        </p>
        <p>
          {translate("CKD Stage:", currentLanguage)}
          <span className="font-medium text-purple-600 dark:text-purple-400">
            {result.stage}
          </span>
        </p>
        <p>
          {translate("Advice:", currentLanguage)}
          <span className="text-gray-700 dark:text-gray-300">
            {result.advice}
          </span>
        </p>
      </div>

      <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
        <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">
          {translate("Dietary Recommendations:", currentLanguage)}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {result.diet}
        </p>
      </div>

      <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
        <h3 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">
          {translate("Possible Outcomes:", currentLanguage)}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {result.outcomes}
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">
          {translate("eGFR Trend:", currentLanguage)}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={eGFRData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="eGFR" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between">
        <Button onClick={handlePrint} className="bg-green-500 hover:bg-green-600 text-white">
          <Printer className="w-4 h-4 mr-2" />
          {translate("Print Results", currentLanguage)}
        </Button>
        <Button
          onClick={() => speakText(JSON.stringify(result))}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Volume2 className="w-4 h-4 mr-2" />
          {translate("Read Results Aloud", currentLanguage)}
        </Button>
      </div>
    </div>
  );
}