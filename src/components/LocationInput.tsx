import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MapPin, Loader2, Navigation } from 'lucide-react';

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

interface LocationInputProps {
  onLocationSelect: (location: Location) => void;
  selectedLanguage: string;
  isLoading: boolean;
}

export function LocationInput({ onLocationSelect, selectedLanguage, isLoading }: LocationInputProps) {
  const [manualLocation, setManualLocation] = useState('');
  const [gpsLoading, setGpsLoading] = useState(false);

  const translations = {
    hi: {
      manualEntry: 'मैन्युअल स्थान प्रविष्टि',
      enterLocation: 'स्थान दर्ज करें (जैसे: दिल्ली, भारत)',
      useGPS: 'GPS का उपयोग करें',
      submit: 'सबमिट',
      gettingLocation: 'स्थान प्राप्त कर रहे हैं...',
      locationPlaceholder: 'शहर, राज्य या पिन कोड दर्ज करें'
    },
    en: {
      manualEntry: 'Manual Location Entry',
      enterLocation: 'Enter Location (e.g., Delhi, India)',
      useGPS: 'Use GPS',
      submit: 'Submit',
      gettingLocation: 'Getting location...',
      locationPlaceholder: 'Enter city, state, or PIN code'
    }
  };

  const t = translations[selectedLanguage as keyof typeof translations];

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualLocation.trim()) {
      // Mock geocoding - in real app, you'd use Google Maps Geocoding API
      const mockLocation: Location = {
        latitude: 28.6139,
        longitude: 77.2090,
        address: manualLocation
      };
      onLocationSelect(mockLocation);
    }
  };

  const handleGPSLocation = () => {
    setGpsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: Location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
          };
          onLocationSelect(location);
          setGpsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to mock location
          const fallbackLocation: Location = {
            latitude: 28.6139,
            longitude: 77.2090,
            address: 'Delhi, India (Default)'
          };
          onLocationSelect(fallbackLocation);
          setGpsLoading(false);
        }
      );
    } else {
      // Geolocation not supported, use fallback
      const fallbackLocation: Location = {
        latitude: 28.6139,
        longitude: 77.2090,
        address: 'Delhi, India (Default)'
      };
      onLocationSelect(fallbackLocation);
      setGpsLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Manual Location Entry */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>{t.manualEntry}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <Label htmlFor="location">{t.enterLocation}</Label>
              <Input
                id="location"
                type="text"
                placeholder={t.locationPlaceholder}
                value={manualLocation}
                onChange={(e) => setManualLocation(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={!manualLocation.trim() || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.gettingLocation}
                </>
              ) : (
                t.submit
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* GPS Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Navigation className="h-5 w-5" />
            <span>{t.useGPS}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {selectedLanguage === 'hi' 
                ? 'अपने वर्तमान स्थान का उपयोग करके सटीक फसल सिफारिशें प्राप्त करें।'
                : 'Get accurate crop recommendations using your current location.'
              }
            </p>
            <Button 
              onClick={handleGPSLocation}
              variant="outline"
              className="w-full"
              disabled={gpsLoading || isLoading}
            >
              {gpsLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.gettingLocation}
                </>
              ) : (
                <>
                  <Navigation className="mr-2 h-4 w-4" />
                  {t.useGPS}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}