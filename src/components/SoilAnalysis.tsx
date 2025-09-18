import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Layers, Volume2, TestTube, Leaf, Target } from 'lucide-react';

interface SoilData {
  type: string;
  ph: number;
  organicContent: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

interface SoilAnalysisProps {
  soilData: SoilData;
  location: Location | null;
  selectedLanguage: string;
  onSpeak: (text: string) => void;
}

export function SoilAnalysis({ soilData, location, selectedLanguage, onSpeak }: SoilAnalysisProps) {
  const translations = {
    hi: {
      soilAnalysis: 'मिट्टी का विश्लेषण',
      soilType: 'मिट्टी का प्रकार',
      phLevel: 'पीएच स्तर',
      organicContent: 'जैविक सामग्री',
      nitrogen: 'नाइट्रोजन',
      phosphorus: 'फास्फोरस',
      potassium: 'पोटेशियम',
      percent: '%',
      ppm: 'पीपीएम',
      listen: 'सुनें',
      soilHealth: 'मिट्टी का स्वास्थ्य',
      recommendations: 'सुझाव',
      excellent: 'उत्कृष्ट',
      good: 'अच्छा',
      moderate: 'मध्यम',
      poor: 'खराब',
      soilMap: 'मिट्टी का नक्शा'
    },
    en: {
      soilAnalysis: 'Soil Analysis',
      soilType: 'Soil Type',
      phLevel: 'pH Level',
      organicContent: 'Organic Content',
      nitrogen: 'Nitrogen',
      phosphorus: 'Phosphorus',
      potassium: 'Potassium',
      percent: '%',
      ppm: 'ppm',
      listen: 'Listen',
      soilHealth: 'Soil Health',
      recommendations: 'Recommendations',
      excellent: 'Excellent',
      good: 'Good',
      moderate: 'Moderate',
      poor: 'Poor',
      soilMap: 'Soil Map'
    }
  };

  const t = translations[selectedLanguage as keyof typeof translations];

  const getSoilHealthStatus = (value: number, type: 'ph' | 'organic' | 'nitrogen' | 'phosphorus' | 'potassium') => {
    const ranges = {
      ph: { excellent: [6.5, 7.5], good: [6.0, 8.0], moderate: [5.5, 8.5], poor: [0, 14] },
      organic: { excellent: [3, 5], good: [2, 6], moderate: [1, 7], poor: [0, 10] },
      nitrogen: { excellent: [40, 60], good: [30, 70], moderate: [20, 80], poor: [0, 100] },
      phosphorus: { excellent: [20, 30], good: [15, 35], moderate: [10, 40], poor: [0, 50] },
      potassium: { excellent: [150, 200], good: [120, 220], moderate: [100, 250], poor: [0, 300] }
    };

    const range = ranges[type];
    if (value >= range.excellent[0] && value <= range.excellent[1]) return 'excellent';
    if (value >= range.good[0] && value <= range.good[1]) return 'good';
    if (value >= range.moderate[0] && value <= range.moderate[1]) return 'moderate';
    return 'poor';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'moderate': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const generateSoilSummary = () => {
    if (selectedLanguage === 'hi') {
      return `आपकी मिट्टी ${soilData.type} प्रकार की है। पीएच स्तर ${soilData.ph} है, जैविक सामग्री ${soilData.organicContent} प्रतिशत है। नाइट्रोजन ${soilData.nitrogen} पीपीएम, फास्फोरस ${soilData.phosphorus} पीपीएम, और पोटेशियम ${soilData.potassium} पीपीएम है।`;
    } else {
      return `Your soil is ${soilData.type} type. pH level is ${soilData.ph}, organic content is ${soilData.organicContent} percent. Nitrogen is ${soilData.nitrogen} ppm, phosphorus is ${soilData.phosphorus} ppm, and potassium is ${soilData.potassium} ppm.`;
    }
  };

  const phStatus = getSoilHealthStatus(soilData.ph, 'ph');
  const organicStatus = getSoilHealthStatus(soilData.organicContent, 'organic');
  const nitrogenStatus = getSoilHealthStatus(soilData.nitrogen, 'nitrogen');
  const phosphorusStatus = getSoilHealthStatus(soilData.phosphorus, 'phosphorus');
  const potassiumStatus = getSoilHealthStatus(soilData.potassium, 'potassium');

  return (
    <div className="space-y-6">
      {/* Soil Type and Basic Info */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Layers className="h-5 w-5" />
            <span>{t.soilAnalysis}</span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSpeak(generateSoilSummary())}
            className="flex items-center space-x-2"
          >
            <Volume2 className="h-4 w-4" />
            <span>{t.listen}</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-brown-50 border rounded-lg">
                <TestTube className="h-8 w-8 text-brown-600" />
                <div>
                  <p className="text-sm text-muted-foreground">{t.soilType}</p>
                  <p className="text-xl">{soilData.type}</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm">{selectedLanguage === 'hi' ? 'स्थान:' : 'Location:'}</p>
              <p className="text-sm text-muted-foreground">{location?.address}</p>
              <p className="text-xs text-muted-foreground">
                {location?.latitude.toFixed(4)}, {location?.longitude.toFixed(4)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Soil Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TestTube className="h-5 w-5" />
            <span>{t.soilHealth}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* pH Level */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">{t.phLevel}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(phStatus)}`}>
                  {t[phStatus as keyof typeof t]}
                </span>
              </div>
              <Progress value={(soilData.ph / 14) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">{soilData.ph}</p>
            </div>

            {/* Organic Content */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">{t.organicContent}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(organicStatus)}`}>
                  {t[organicStatus as keyof typeof t]}
                </span>
              </div>
              <Progress value={(soilData.organicContent / 10) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">{soilData.organicContent}{t.percent}</p>
            </div>

            {/* NPK Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Nitrogen */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t.nitrogen}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(nitrogenStatus)}`}>
                    {t[nitrogenStatus as keyof typeof t]}
                  </span>
                </div>
                <Progress value={(soilData.nitrogen / 100) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">{soilData.nitrogen} {t.ppm}</p>
              </div>

              {/* Phosphorus */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t.phosphorus}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(phosphorusStatus)}`}>
                    {t[phosphorusStatus as keyof typeof t]}
                  </span>
                </div>
                <Progress value={(soilData.phosphorus / 50) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">{soilData.phosphorus} {t.ppm}</p>
              </div>

              {/* Potassium */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t.potassium}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(potassiumStatus)}`}>
                    {t[potassiumStatus as keyof typeof t]}
                  </span>
                </div>
                <Progress value={(soilData.potassium / 300) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">{soilData.potassium} {t.ppm}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Soil Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>{t.recommendations}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
              <div className="flex items-start space-x-2">
                <Leaf className="h-4 w-4 text-green-600 mt-1" />
                <p className="text-sm">
                  {selectedLanguage === 'hi' 
                    ? `${soilData.type} मिट्टी धान, गेहूं और गन्ने की खेती के लिए उत्कृष्ट है।`
                    : `${soilData.type} soil is excellent for rice, wheat, and sugarcane cultivation.`
                  }
                </p>
              </div>
            </div>
            
            {phStatus !== 'excellent' && (
              <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <div className="flex items-start space-x-2">
                  <TestTube className="h-4 w-4 text-blue-600 mt-1" />
                  <p className="text-sm">
                    {selectedLanguage === 'hi' 
                      ? `पीएच स्तर को सुधारने के लिए चूना या जैविक खाद का उपयोग करें।`
                      : `Use lime or organic compost to improve pH level.`
                    }
                  </p>
                </div>
              </div>
            )}

            {organicStatus !== 'excellent' && (
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <div className="flex items-start space-x-2">
                  <Leaf className="h-4 w-4 text-yellow-600 mt-1" />
                  <p className="text-sm">
                    {selectedLanguage === 'hi' 
                      ? `जैविक सामग्री बढ़ाने के लिए गोबर की खाद और कंपोस्ट का उपयोग करें।`
                      : `Use farmyard manure and compost to increase organic content.`
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}