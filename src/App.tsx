import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { LocationInput } from './components/LocationInput';
import { WeatherDisplay } from './components/WeatherDisplay';
import { SoilAnalysis } from './components/SoilAnalysis';
import { CropRecommendations } from './components/CropRecommendations';
import { LanguageSelector } from './components/LanguageSelector';
import { InteractiveMap } from './components/InteractiveMap';
import { Dashboard } from './components/Dashboard';
import { Sprout, MapPin, Cloud, Layers, Languages, Volume2 } from 'lucide-react';

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  forecast: Array<{
    date: string;
    temp: number;
    condition: string;
  }>;
}

interface SoilData {
  type: string;
  ph: number;
  organicContent: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

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

export default function App() {
  const [location, setLocation] = useState<Location | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [activeTab, setActiveTab] = useState('location');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const mockWeatherData: WeatherData = {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    windDirection: 'NE',
    forecast: [
      { date: '2025-09-18', temp: 29, condition: 'Sunny' },
      { date: '2025-09-19', temp: 31, condition: 'Partly Cloudy' },
      { date: '2025-09-20', temp: 27, condition: 'Rainy' },
    ]
  };

  const mockSoilData: SoilData = {
    type: 'Loamy',
    ph: 6.8,
    organicContent: 3.2,
    nitrogen: 45,
    phosphorus: 22,
    potassium: 180
  };

  const mockRecommendations: CropRecommendation[] = [
    {
      name: 'Rice',
      nameHindi: 'चावल',
      suitability: 95,
      plantingTime: 'June-July',
      harvestTime: 'October-November',
      irrigation: 'Heavy irrigation needed',
      fertilizer: 'NPK 20:10:10',
      pestControl: 'Regular monitoring for stem borer'
    },
    {
      name: 'Wheat',
      nameHindi: 'गेहूं',
      suitability: 88,
      plantingTime: 'November-December',
      harvestTime: 'March-April',
      irrigation: 'Moderate irrigation',
      fertilizer: 'NPK 18:18:18',
      pestControl: 'Watch for aphids and rust'
    },
    {
      name: 'Sugarcane',
      nameHindi: 'गन्ना',
      suitability: 82,
      plantingTime: 'February-March',
      harvestTime: 'December-January',
      irrigation: 'Heavy irrigation in summer',
      fertilizer: 'High nitrogen content',
      pestControl: 'Monitor for red rot disease'
    }
  ];

  const translations = {
    hi: {
      title: 'AI फसल सिफारिश प्रणाली',
      location: 'स्थान',
      weather: 'मौसम',
      soil: 'मिट्टी',
      recommendations: 'सिफारिशें',
      dashboard: 'डैशबोर्ड',
      enterLocation: 'अपना स्थान दर्ज करें',
      getRecommendations: 'सिफारिशें प्राप्त करें',
      currentWeather: 'वर्तमान मौसम',
      soilAnalysis: 'मिट्टी का विश्लेषण',
      cropRecommendations: 'फसल की सिफारिशें',
      temperature: 'तापमान',
      humidity: 'आर्द्रता',
      windSpeed: 'हवा की गति',
      soilType: 'मिट्टी का प्रकार',
      phLevel: 'पीएच स्तर',
      organicContent: 'जैविक सामग्री',
      suitability: 'उपयुक्तता',
      plantingTime: 'बुआई का समय',
      harvestTime: 'कटाई का समय'
    },
    en: {
      title: 'AI Crop Recommendation System',
      location: 'Location',
      weather: 'Weather',
      soil: 'Soil',
      recommendations: 'Recommendations',
      dashboard: 'Dashboard',
      enterLocation: 'Enter Your Location',
      getRecommendations: 'Get Recommendations',
      currentWeather: 'Current Weather',
      soilAnalysis: 'Soil Analysis',
      cropRecommendations: 'Crop Recommendations',
      temperature: 'Temperature',
      humidity: 'Humidity',
      windSpeed: 'Wind Speed',
      soilType: 'Soil Type',
      phLevel: 'pH Level',
      organicContent: 'Organic Content',
      suitability: 'Suitability',
      plantingTime: 'Planting Time',
      harvestTime: 'Harvest Time'
    }
  };

  const t = translations[selectedLanguage as keyof typeof translations];

  const handleLocationSelect = (newLocation: Location) => {
    setLocation(newLocation);
    setIsLoading(true);
    
    // Simulate API calls
    setTimeout(() => {
      setWeatherData(mockWeatherData);
      setSoilData(mockSoilData);
      setRecommendations(mockRecommendations);
      setIsLoading(false);
      setActiveTab('weather');
    }, 2000);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Sprout className="h-8 w-8 text-green-600" />
              <h1 className="text-xl font-semibold text-gray-900">{t.title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector 
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => speakText(t.title)}
                className="flex items-center space-x-2"
              >
                <Volume2 className="h-4 w-4" />
                <span>Listen</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="location" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{t.location}</span>
            </TabsTrigger>
            <TabsTrigger value="weather" disabled={!location} className="flex items-center space-x-2">
              <Cloud className="h-4 w-4" />
              <span>{t.weather}</span>
            </TabsTrigger>
            <TabsTrigger value="soil" disabled={!location} className="flex items-center space-x-2">
              <Layers className="h-4 w-4" />
              <span>{t.soil}</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" disabled={!recommendations.length} className="flex items-center space-x-2">
              <Sprout className="h-4 w-4" />
              <span>{t.recommendations}</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" disabled={!recommendations.length} className="flex items-center space-x-2">
              <Languages className="h-4 w-4" />
              <span>{t.dashboard}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.enterLocation}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <LocationInput 
                  onLocationSelect={handleLocationSelect}
                  selectedLanguage={selectedLanguage}
                  isLoading={isLoading}
                />
                {location && (
                  <InteractiveMap 
                    location={location}
                    onLocationChange={handleLocationSelect}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weather" className="space-y-6">
            {weatherData && (
              <WeatherDisplay 
                weatherData={weatherData}
                selectedLanguage={selectedLanguage}
                onSpeak={speakText}
              />
            )}
          </TabsContent>

          <TabsContent value="soil" className="space-y-6">
            {soilData && (
              <SoilAnalysis 
                soilData={soilData}
                location={location}
                selectedLanguage={selectedLanguage}
                onSpeak={speakText}
              />
            )}
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            {recommendations.length > 0 && (
              <CropRecommendations 
                recommendations={recommendations}
                selectedLanguage={selectedLanguage}
                onSpeak={speakText}
              />
            )}
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            {recommendations.length > 0 && weatherData && soilData && (
              <Dashboard 
                recommendations={recommendations}
                weatherData={weatherData}
                soilData={soilData}
                location={location}
                selectedLanguage={selectedLanguage}
                onSpeak={speakText}
              />
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}