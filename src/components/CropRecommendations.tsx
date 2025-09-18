import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Sprout, Volume2, Calendar, Droplets, Zap, Bug } from 'lucide-react';

interface CropRecommendation {
  name: string;
  nameHindi: string;
  suitability: number;
  plantingTime: string;
  harvestTime: string;
  irrigation: string;
  fertilizer: string;
  pestControl: string;
}

interface CropRecommendationsProps {
  recommendations: CropRecommendation[];
  selectedLanguage: string;
  onSpeak: (text: string) => void;
}

export function CropRecommendations({ recommendations, selectedLanguage, onSpeak }: CropRecommendationsProps) {
  const translations = {
    hi: {
      cropRecommendations: 'फसल की सिफारिशें',
      suitability: 'उपयुक्तता',
      plantingTime: 'बुआई का समय',
      harvestTime: 'कटाई का समय',
      irrigation: 'सिंचाई',
      fertilizer: 'उर्वरक',
      pestControl: 'कीट नियंत्रण',
      listen: 'सुनें',
      highlyRecommended: 'अत्यधिक अनुशंसित',
      recommended: 'अनुशंसित',
      moderate: 'मध्यम',
      lowRecommended: 'कम अनुशंसित',
      details: 'विवरण',
      percent: '%'
    },
    en: {
      cropRecommendations: 'Crop Recommendations',
      suitability: 'Suitability',
      plantingTime: 'Planting Time',
      harvestTime: 'Harvest Time',
      irrigation: 'Irrigation',
      fertilizer: 'Fertilizer',
      pestControl: 'Pest Control',
      listen: 'Listen',
      highlyRecommended: 'Highly Recommended',
      recommended: 'Recommended',
      moderate: 'Moderate',
      lowRecommended: 'Low Recommended',
      details: 'Details',
      percent: '%'
    }
  };

  const t = translations[selectedLanguage as keyof typeof translations];

  const getSuitabilityLevel = (score: number) => {
    if (score >= 90) return 'highlyRecommended';
    if (score >= 75) return 'recommended';
    if (score >= 60) return 'moderate';
    return 'lowRecommended';
  };

  const getSuitabilityColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getBadgeVariant = (score: number) => {
    if (score >= 90) return 'default';
    if (score >= 75) return 'secondary';
    if (score >= 60) return 'outline';
    return 'destructive';
  };

  const generateCropSummary = (crop: CropRecommendation) => {
    const cropName = selectedLanguage === 'hi' ? crop.nameHindi : crop.name;
    if (selectedLanguage === 'hi') {
      return `${cropName} की उपयुक्तता ${crop.suitability} प्रतिशत है। बुआई का समय ${crop.plantingTime} है और कटाई का समय ${crop.harvestTime} है। ${crop.irrigation}। उर्वरक: ${crop.fertilizer}।`;
    } else {
      return `${cropName} has ${crop.suitability} percent suitability. Planting time is ${crop.plantingTime} and harvest time is ${crop.harvestTime}. ${crop.irrigation}. Fertilizer: ${crop.fertilizer}.`;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sprout className="h-5 w-5" />
            <span>{t.cropRecommendations}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {recommendations.map((crop, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Sprout className="h-6 w-6 text-green-600" />
                      <div>
                        <h3 className="text-lg">
                          {selectedLanguage === 'hi' ? crop.nameHindi : crop.name}
                        </h3>
                        {selectedLanguage === 'hi' && (
                          <p className="text-sm text-muted-foreground">{crop.name}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge variant={getBadgeVariant(crop.suitability)}>
                        {t[getSuitabilityLevel(crop.suitability) as keyof typeof t]}
                      </Badge>
                      <p className="text-2xl">{crop.suitability}{t.percent}</p>
                    </div>
                  </div>
                  <Progress 
                    value={crop.suitability} 
                    className="h-2"
                  />
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t.plantingTime}</p>
                        <p className="font-medium">{crop.plantingTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t.harvestTime}</p>
                        <p className="font-medium">{crop.harvestTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-cyan-50 border-l-4 border-cyan-400 rounded">
                      <Droplets className="h-5 w-5 text-cyan-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">{t.irrigation}</p>
                        <p className="text-sm text-muted-foreground">{crop.irrigation}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-purple-50 border-l-4 border-purple-400 rounded">
                      <Zap className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">{t.fertilizer}</p>
                        <p className="text-sm text-muted-foreground">{crop.fertilizer}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                      <Bug className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">{t.pestControl}</p>
                        <p className="text-sm text-muted-foreground">{crop.pestControl}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSpeak(generateCropSummary(crop))}
                      className="flex items-center space-x-2"
                    >
                      <Volume2 className="h-4 w-4" />
                      <span>{t.listen}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Insights */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedLanguage === 'hi' ? 'अतिरिक्त सुझाव' : 'Additional Insights'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
              <p className="text-sm">
                {selectedLanguage === 'hi' 
                  ? 'वर्तमान मौसम और मिट्टी की स्थिति के आधार पर, धान सबसे उपयुक्त फसल है।'
                  : 'Based on current weather and soil conditions, rice is the most suitable crop.'
                }
              </p>
            </div>
            <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
              <p className="text-sm">
                {selectedLanguage === 'hi' 
                  ? 'फसल चक्रण के लिए धान के बाद गेहूं की खेती करने पर विचार करें।'
                  : 'Consider wheat cultivation after rice for crop rotation benefits.'
                }
              </p>
            </div>
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-sm">
                {selectedLanguage === 'hi' 
                  ? 'स्थानीय कृषि विशेषज्ञ से सलाह लेने की सिफारिश की जाती है।'
                  : 'Consultation with local agricultural experts is recommended.'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}