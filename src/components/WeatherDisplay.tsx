import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Cloud, Thermometer, Droplets, Wind, Volume2, Calendar } from 'lucide-react';

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

interface WeatherDisplayProps {
  weatherData: WeatherData;
  selectedLanguage: string;
  onSpeak: (text: string) => void;
}

export function WeatherDisplay({ weatherData, selectedLanguage, onSpeak }: WeatherDisplayProps) {
  const translations = {
    hi: {
      currentWeather: 'वर्तमान मौसम',
      temperature: 'तापमान',
      humidity: 'आर्द्रता',
      windSpeed: 'हवा की गति',
      windDirection: 'हवा की दिशा',
      forecast: 'मौसम पूर्वानुमान',
      celsius: '°C',
      percent: '%',
      kmh: 'किमी/घंटा',
      listen: 'सुनें',
      weatherSummary: 'मौसम सारांश',
      forecastDays: 'अगले दिनों का पूर्वानुमान'
    },
    en: {
      currentWeather: 'Current Weather',
      temperature: 'Temperature',
      humidity: 'Humidity',
      windSpeed: 'Wind Speed',
      windDirection: 'Wind Direction',
      forecast: 'Weather Forecast',
      celsius: '°C',
      percent: '%',
      kmh: 'km/h',
      listen: 'Listen',
      weatherSummary: 'Weather Summary',
      forecastDays: 'Next Days Forecast'
    }
  };

  const t = translations[selectedLanguage as keyof typeof translations];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return selectedLanguage === 'hi' 
      ? date.toLocaleDateString('hi-IN')
      : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const generateWeatherSummary = () => {
    if (selectedLanguage === 'hi') {
      return `वर्तमान तापमान ${weatherData.temperature} डिग्री सेल्सियस है। आर्द्रता ${weatherData.humidity} प्रतिशत है। हवा की गति ${weatherData.windSpeed} किलोमीटर प्रति घंटा है।`;
    } else {
      return `Current temperature is ${weatherData.temperature} degrees Celsius. Humidity is ${weatherData.humidity} percent. Wind speed is ${weatherData.windSpeed} kilometers per hour.`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Weather */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Cloud className="h-5 w-5" />
            <span>{t.currentWeather}</span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSpeak(generateWeatherSummary())}
            className="flex items-center space-x-2"
          >
            <Volume2 className="h-4 w-4" />
            <span>{t.listen}</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
              <Thermometer className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">{t.temperature}</p>
                <p className="text-2xl">{weatherData.temperature}{t.celsius}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <Droplets className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">{t.humidity}</p>
                <p className="text-2xl">{weatherData.humidity}{t.percent}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <Wind className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">{t.windSpeed}</p>
                <p className="text-2xl">{weatherData.windSpeed}</p>
                <p className="text-xs text-muted-foreground">{t.kmh}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
              <Wind className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">{t.windDirection}</p>
                <p className="text-2xl">{weatherData.windDirection}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>{t.forecast}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{formatDate(day.date)}</p>
                    <p className="text-sm text-muted-foreground">{day.condition}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl">{day.temp}{t.celsius}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weather Insights */}
      <Card>
        <CardHeader>
          <CardTitle>{selectedLanguage === 'hi' ? 'मौसम अंतर्दृष्टि' : 'Weather Insights'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
              <p className="text-sm">
                {selectedLanguage === 'hi' 
                  ? `उच्च आर्द्रता (${weatherData.humidity}%) के कारण चावल की खेती के लिए उपयुक्त मौसम है।`
                  : `High humidity (${weatherData.humidity}%) makes it suitable weather for rice cultivation.`
                }
              </p>
            </div>
            <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
              <p className="text-sm">
                {selectedLanguage === 'hi' 
                  ? `वर्तमान तापमान (${weatherData.temperature}°C) अधिकांश फसलों के लिए आदर्श है।`
                  : `Current temperature (${weatherData.temperature}°C) is ideal for most crops.`
                }
              </p>
            </div>
            <div className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
              <p className="text-sm">
                {selectedLanguage === 'hi' 
                  ? `मध्यम हवा की गति (${weatherData.windSpeed} km/h) रोग प्रसार को कम करने में मदद करती है।`
                  : `Moderate wind speed (${weatherData.windSpeed} km/h) helps reduce disease spread.`
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}