import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Calendar, TrendingUp, AlertTriangle, Volume2, Download, Share2 } from 'lucide-react';

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

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

interface DashboardProps {
  recommendations: CropRecommendation[];
  weatherData: WeatherData;
  soilData: SoilData;
  location: Location | null;
  selectedLanguage: string;
  onSpeak: (text: string) => void;
}

export function Dashboard({ recommendations, weatherData, soilData, location, selectedLanguage, onSpeak }: DashboardProps) {
  const translations = {
    hi: {
      dashboard: 'डैशबोर्ड',
      overview: 'अवलोकन',
      analytics: 'विश्लेषण',
      schedule: 'कार्यक्रम',
      reports: 'रिपोर्टें',
      cropSuitability: 'फसल उपयुक्तता',
      soilNutrients: 'मिट्टी के पोषक तत्व',
      weatherTrend: 'मौसम रुझान',
      plantingSchedule: 'बुआई कार्यक्रम',
      harvestCalendar: 'कटाई कैलेंडर',
      irrigationSchedule: 'सिंचाई कार्यक्रम',
      fertilizationPlan: 'उर्वरक योजना',
      pestControlSchedule: 'कीट नियंत्रण कार्यक्रम',
      alerts: 'चेतावनी',
      recommendations: 'सिफारिशें',
      listen: 'सुनें',
      download: 'डाउनलोड',
      share: 'साझा करें',
      highPriority: 'उच्च प्राथमिकता',
      mediumPriority: 'मध्यम प्राथमिकता',
      suitabilityScore: 'उपयुक्तता स्कोर'
    },
    en: {
      dashboard: 'Dashboard',
      overview: 'Overview',
      analytics: 'Analytics',
      schedule: 'Schedule',
      reports: 'Reports',
      cropSuitability: 'Crop Suitability',
      soilNutrients: 'Soil Nutrients',
      weatherTrend: 'Weather Trend',
      plantingSchedule: 'Planting Schedule',
      harvestCalendar: 'Harvest Calendar',
      irrigationSchedule: 'Irrigation Schedule',
      fertilizationPlan: 'Fertilization Plan',
      pestControlSchedule: 'Pest Control Schedule',
      alerts: 'Alerts',
      recommendations: 'Recommendations',
      listen: 'Listen',
      download: 'Download',
      share: 'Share',
      highPriority: 'High Priority',
      mediumPriority: 'Medium Priority',
      suitabilityScore: 'Suitability Score'
    }
  };

  const t = translations[selectedLanguage as keyof typeof translations];

  // Chart data
  const cropSuitabilityData = recommendations.map(crop => ({
    name: selectedLanguage === 'hi' ? crop.nameHindi : crop.name,
    suitability: crop.suitability
  }));

  const soilNutrientsData = [
    { name: 'N', value: soilData.nitrogen, color: '#8884d8' },
    { name: 'P', value: soilData.phosphorus, color: '#82ca9d' },
    { name: 'K', value: soilData.potassium, color: '#ffc658' },
    { name: 'pH', value: soilData.ph * 10, color: '#ff7300' },
    { name: selectedLanguage === 'hi' ? 'जैविक' : 'Organic', value: soilData.organicContent * 20, color: '#00ff00' }
  ];

  const weatherTrendData = weatherData.forecast.map(day => ({
    date: new Date(day.date).toLocaleDateString(selectedLanguage === 'hi' ? 'hi-IN' : 'en-US', { month: 'short', day: 'numeric' }),
    temperature: day.temp,
    condition: day.condition
  }));

  const generateDashboardSummary = () => {
    const topCrop = recommendations[0];
    const cropName = selectedLanguage === 'hi' ? topCrop.nameHindi : topCrop.name;
    
    if (selectedLanguage === 'hi') {
      return `डैशबोर्ड सारांश: ${cropName} सबसे अनुशंसित फसल है जिसकी उपयुक्तता ${topCrop.suitability} प्रतिशत है। वर्तमान तापमान ${weatherData.temperature} डिग्री है। मिट्टी का पीएच ${soilData.ph} है।`;
    } else {
      return `Dashboard summary: ${cropName} is the most recommended crop with ${topCrop.suitability} percent suitability. Current temperature is ${weatherData.temperature} degrees. Soil pH is ${soilData.ph}.`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>{t.dashboard}</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSpeak(generateDashboardSummary())}
                className="flex items-center space-x-2"
              >
                <Volume2 className="h-4 w-4" />
                <span>{t.listen}</span>
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                {t.download}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                {t.share}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">{t.overview}</TabsTrigger>
          <TabsTrigger value="analytics">{t.analytics}</TabsTrigger>
          <TabsTrigger value="schedule">{t.schedule}</TabsTrigger>
          <TabsTrigger value="reports">{t.reports}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm text-muted-foreground">{selectedLanguage === 'hi' ? 'सर्वोत्तम फसल' : 'Top Crop'}</p>
                </div>
                <p className="text-2xl font-semibold mt-1">
                  {selectedLanguage === 'hi' ? recommendations[0].nameHindi : recommendations[0].name}
                </p>
                <p className="text-sm text-green-600">{recommendations[0].suitability}% {t.suitabilityScore}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <p className="text-sm text-muted-foreground">{selectedLanguage === 'hi' ? 'तापमान' : 'Temperature'}</p>
                </div>
                <p className="text-2xl font-semibold mt-1">{weatherData.temperature}°C</p>
                <p className="text-sm text-blue-600">{selectedLanguage === 'hi' ? 'आदर्श सीमा में' : 'Within ideal range'}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                  <p className="text-sm text-muted-foreground">{selectedLanguage === 'hi' ? 'मिट्टी पीएच' : 'Soil pH'}</p>
                </div>
                <p className="text-2xl font-semibold mt-1">{soilData.ph}</p>
                <p className="text-sm text-yellow-600">{selectedLanguage === 'hi' ? 'संतुलित' : 'Balanced'}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                  <p className="text-sm text-muted-foreground">{selectedLanguage === 'hi' ? 'आर्द्रता' : 'Humidity'}</p>
                </div>
                <p className="text-2xl font-semibold mt-1">{weatherData.humidity}%</p>
                <p className="text-sm text-purple-600">{selectedLanguage === 'hi' ? 'उच्च' : 'High'}</p>
              </CardContent>
            </Card>
          </div>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>{t.alerts}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <div>
                    <Badge variant="destructive" className="mb-1">{t.highPriority}</Badge>
                    <p className="text-sm">
                      {selectedLanguage === 'hi' 
                        ? 'मानसून का मौसम आ रहा है - धान की बुआई के लिए तैयारी करें'
                        : 'Monsoon season approaching - prepare for rice planting'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <div>
                    <Badge variant="outline" className="mb-1">{t.mediumPriority}</Badge>
                    <p className="text-sm">
                      {selectedLanguage === 'hi' 
                        ? 'मिट्टी में जैविक सामग्री बढ़ाने की आवश्यकता है'
                        : 'Soil organic content needs improvement'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.cropSuitability}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cropSuitabilityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="suitability" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.soilNutrients}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={soilNutrientsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {soilNutrientsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t.weatherTrend}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weatherTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temperature" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>{t.plantingSchedule}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.map((crop, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{selectedLanguage === 'hi' ? crop.nameHindi : crop.name}</p>
                        <p className="text-sm text-muted-foreground">{crop.plantingTime}</p>
                      </div>
                      <Badge variant="outline">{crop.suitability}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>{t.harvestCalendar}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.map((crop, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{selectedLanguage === 'hi' ? crop.nameHindi : crop.name}</p>
                        <p className="text-sm text-muted-foreground">{crop.harvestTime}</p>
                      </div>
                      <Badge variant="secondary">{selectedLanguage === 'hi' ? 'कटाई' : 'Harvest'}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{selectedLanguage === 'hi' ? 'विस्तृत रिपोर्ट' : 'Detailed Report'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">{selectedLanguage === 'hi' ? 'स्थान सारांश' : 'Location Summary'}</h4>
                  <p className="text-sm text-muted-foreground">{location?.address}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedLanguage === 'hi' ? 'निर्देशांक:' : 'Coordinates:'} {location?.latitude}, {location?.longitude}
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">{selectedLanguage === 'hi' ? 'मौसम सारांश' : 'Weather Summary'}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedLanguage === 'hi' 
                      ? `तापमान: ${weatherData.temperature}°C, आर्द्रता: ${weatherData.humidity}%, हवा: ${weatherData.windSpeed} km/h`
                      : `Temperature: ${weatherData.temperature}°C, Humidity: ${weatherData.humidity}%, Wind: ${weatherData.windSpeed} km/h`
                    }
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">{selectedLanguage === 'hi' ? 'मिट्टी सारांश' : 'Soil Summary'}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedLanguage === 'hi' 
                      ? `प्रकार: ${soilData.type}, पीएच: ${soilData.ph}, जैविक: ${soilData.organicContent}%`
                      : `Type: ${soilData.type}, pH: ${soilData.ph}, Organic: ${soilData.organicContent}%`
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}