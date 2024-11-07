import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Upload } from 'lucide-react';
import { translate } from './utils/translate';
import { ghanaHospitals } from './data/hospitals';
import type { FormData } from './types';

interface PatientFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  currentLanguage: string;
  aiAssisted: boolean;
}

export function PatientForm({
  formData,
  handleInputChange,
  handleSubmit,
  currentLanguage,
  aiAssisted
}: PatientFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    setSelectedDistrict("");
    setSelectedHospital("");
    setFormData(prev => ({ ...prev, hospitalId: "", hospitalName: "" }));
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedHospital("");
    setFormData(prev => ({ ...prev, hospitalId: "", hospitalName: "" }));
  };

  const handleHospitalChange = (value: string) => {
    setSelectedHospital(value);
    const selectedRegionData = ghanaHospitals.find(r => r.region === selectedRegion);
    const selectedDistrictData = selectedRegionData?.districts.find(d => d.name === selectedDistrict);
    const selectedHospitalData = selectedDistrictData?.hospitals.find(h => h.id === value);
    if (selectedHospitalData) {
      setFormData(prev => ({
        ...prev,
        hospitalId: selectedHospitalData.id,
        hospitalName: selectedHospitalData.name
      }));
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real application, this would start/stop speech recognition
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // In a real application, this would trigger processing of the uploaded file
    }
  };

  const aiQuestions = [
    "What is your name?",
    "What is your date of birth?",
    "Do you know your serum creatinine level?",
    "What is your blood urea level?",
    "Do you know your hemoglobin level?",
    "What is your blood pressure?",
    "Have you been diagnosed with diabetes?",
    "Do you know your albumin level?",
  ];

  const handleAIAssistedInput = (answer: string) => {
    const fieldNames = ["name", "dob", "creatinine", "urea", "hemoglobin", "bp", "diabetes", "albumin"];
    setFormData(prev => ({ ...prev, [fieldNames[currentQuestion]]: answer }));
    setCurrentQuestion(prev => prev + 1);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      {/* Hospital Selection */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="region" className="text-blue-600 dark:text-blue-400">
            {translate("Region", currentLanguage)}
          </Label>
          <Select value={selectedRegion} onValueChange={handleRegionChange}>
            <SelectTrigger id="region" className="border-blue-300 focus:border-blue-500">
              <SelectValue placeholder={translate("Select region", currentLanguage)} />
            </SelectTrigger>
            <SelectContent>
              {ghanaHospitals.map(region => (
                <SelectItem key={region.region} value={region.region}>{region.region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Similar structure for District and Hospital selects */}
      </div>

      {aiAssisted ? (
        <div className="space-y-4">
          <p className="text-lg font-semibold">
            {translate("AI-Assisted Form Filling", currentLanguage)}
          </p>
          {currentQuestion < aiQuestions.length ? (
            <>
              <p>{translate(aiQuestions[currentQuestion], currentLanguage)}</p>
              <Textarea
                value={formData[Object.keys(formData)[currentQuestion + 3] as keyof typeof formData]}
                onChange={(e) => handleAIAssistedInput(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <Button onClick={() => handleAIAssistedInput('')}>
                {translate("Next", currentLanguage)}
              </Button>
            </>
          ) : (
            <p>{translate("All questions answered. Please review your information below.", currentLanguage)}</p>
          )}
        </div>
      ) : (
        <>
          {/* Regular form fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-600 dark:text-blue-400">
                {translate("Patient Name", currentLanguage)}
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="border-blue-300 focus:border-blue-500"
              />
            </div>
            {/* Similar structure for other form fields */}
          </div>
        </>
      )}

      <div className="flex justify-between items-center">
        <Button onClick={toggleListening} className="flex items-center gap-2">
          <Mic className="w-4 h-4" />
          {isListening ? translate("Stop Listening", currentLanguage) : translate("Start Listening", currentLanguage)}
        </Button>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.jpg,.png"
          />
          <Button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            {translate("Upload Test Results", currentLanguage)}
          </Button>
        </div>
      </div>

      {uploadedFile && (
        <p className="text-sm text-gray-600">
          {translate("Uploaded file:", currentLanguage)} {uploadedFile.name}
        </p>
      )}

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
      >
        {translate("Analyze", currentLanguage)}
      </Button>
    </form>
  );
}