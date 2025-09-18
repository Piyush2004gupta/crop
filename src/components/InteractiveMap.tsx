import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Map, MapPin, Layers } from 'lucide-react';

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

interface InteractiveMapProps {
  location: Location;
  onLocationChange: (location: Location) => void;
}

export function InteractiveMap({ location, onLocationChange }: InteractiveMapProps) {
  // Mock map visualization - in a real app, you'd integrate with Google Maps or similar
  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert click position to approximate coordinates (mock)
    const newLat = location.latitude + (y - rect.height / 2) * 0.001;
    const newLng = location.longitude + (x - rect.width / 2) * 0.001;
    
    const newLocation: Location = {
      latitude: Number(newLat.toFixed(4)),
      longitude: Number(newLng.toFixed(4)),
      address: `${newLat.toFixed(4)}, ${newLng.toFixed(4)} (Updated)`
    };
    
    onLocationChange(newLocation);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Map className="h-5 w-5" />
          <span>Interactive Location Map</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Mock Map Display */}
          <div 
            className="relative w-full h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border-2 border-dashed border-gray-300 cursor-crosshair overflow-hidden"
            onClick={handleMapClick}
          >
            {/* Background pattern to simulate map */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#4B5563" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Location marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-col items-center">
                <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg" />
                <div className="mt-2 px-2 py-1 bg-white rounded shadow-lg text-xs">
                  {location.address}
                </div>
              </div>
            </div>
            
            {/* Soil type overlay regions */}
            <div className="absolute top-4 left-4 w-16 h-16 bg-yellow-300 opacity-30 rounded-full"></div>
            <div className="absolute top-16 right-8 w-20 h-20 bg-brown-300 opacity-30 rounded-full"></div>
            <div className="absolute bottom-8 left-8 w-24 h-24 bg-green-300 opacity-30 rounded-full"></div>
            
            {/* Map legend */}
            <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow-lg text-xs">
              <div className="flex items-center space-x-1 mb-1">
                <div className="w-3 h-3 bg-yellow-300 rounded"></div>
                <span>Sandy Soil</span>
              </div>
              <div className="flex items-center space-x-1 mb-1">
                <div className="w-3 h-3 bg-brown-300 rounded"></div>
                <span>Clay Soil</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-300 rounded"></div>
                <span>Loamy Soil</span>
              </div>
            </div>
          </div>
          
          {/* Location details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Latitude:</p>
              <p className="font-mono">{location.latitude}°</p>
            </div>
            <div>
              <p className="text-muted-foreground">Longitude:</p>
              <p className="font-mono">{location.longitude}°</p>
            </div>
          </div>
          
          <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
            <div className="flex items-start space-x-2">
              <Layers className="h-4 w-4 text-blue-600 mt-0.5" />
              <p className="text-sm">
                Click on the map to adjust your location. The colored areas represent different soil types in your region.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}