
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Users, Star, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const venues = [
    {
      id: 1,
      name: "Sky Lounge Premium",
      location: "Jakarta Selatan",
      capacity: "20-50 orang",
      price: "Rp 2.500.000",
      priceNum: 2500000,
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop",
      facilities: ["WiFi", "AC", "Projector", "Catering", "Sound System"],
      type: "Meeting Room"
    },
    {
      id: 2,
      name: "Garden Space",
      location: "Bandung",
      capacity: "10-30 orang",
      price: "Rp 1.800.000",
      priceNum: 1800000,
      rating: 4.6,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=300&fit=crop",
      facilities: ["Outdoor", "WiFi", "Sound System", "Parking"],
      type: "Outdoor Space"
    },
    {
      id: 3,
      name: "Modern Co-Space",
      location: "Jakarta Pusat",
      capacity: "5-20 orang",
      price: "Rp 1.200.000",
      priceNum: 1200000,
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop",
      facilities: ["WiFi", "AC", "Meeting Room", "Kitchen", "Workspace"],
      type: "Co-working"
    },
    {
      id: 4,
      name: "Executive Hall",
      location: "Surabaya",
      capacity: "50-100 orang",
      price: "Rp 4.200.000",
      priceNum: 4200000,
      rating: 4.7,
      reviews: 92,
      image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=500&h=300&fit=crop",
      facilities: ["AC", "Projector", "Sound System", "Stage", "Catering"],
      type: "Event Hall"
    },
    {
      id: 5,
      name: "Creative Studio",
      location: "Jakarta Barat",
      capacity: "15-40 orang",
      price: "Rp 1.900.000",
      priceNum: 1900000,
      rating: 4.5,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&h=300&fit=crop",
      facilities: ["WiFi", "AC", "Photography Equipment", "Green Screen"],
      type: "Studio"
    },
    {
      id: 6,
      name: "Rooftop Terrace",
      location: "Jakarta Selatan",
      capacity: "30-80 orang",
      price: "Rp 3.500.000",
      priceNum: 3500000,
      rating: 4.8,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&h=300&fit=crop",
      facilities: ["Outdoor", "City View", "Bar Setup", "Sound System"],
      type: "Rooftop"
    }
  ];

  const cities = ["Jakarta Selatan", "Jakarta Pusat", "Jakarta Barat", "Bandung", "Surabaya"];
  const capacityRanges = ["5-20 orang", "20-50 orang", "50+ orang"];
  const priceRanges = ["< Rp 1.500.000", "Rp 1.500.000 - Rp 3.000.000", "> Rp 3.000.000"];

  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = !selectedCity || venue.location === selectedCity;
    
    const matchesCapacity = !selectedCapacity || venue.capacity === selectedCapacity;
    
    const matchesPrice = !priceRange || 
                        (priceRange === "< Rp 1.500.000" && venue.priceNum < 1500000) ||
                        (priceRange === "Rp 1.500.000 - Rp 3.000.000" && venue.priceNum >= 1500000 && venue.priceNum <= 3000000) ||
                        (priceRange === "> Rp 3.000.000" && venue.priceNum > 3000000);
    
    return matchesSearch && matchesCity && matchesCapacity && matchesPrice;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCity("");
    setSelectedCapacity("");
    setPriceRange("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Catalog Venue
            </h1>
            <p className="text-gray-600 text-lg">
              Temukan venue perfect untuk event Anda dari {venues.length} pilihan terbaik
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Cari nama venue, lokasi, atau tipe..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {/* City Filter */}
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Pilih Kota" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Capacity Filter */}
              <Select value={selectedCapacity} onValueChange={setSelectedCapacity}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Kapasitas" />
                </SelectTrigger>
                <SelectContent>
                  {capacityRanges.map(range => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Price Filter */}
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Harga" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map(range => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {(searchTerm || selectedCity || selectedCapacity || priceRange) && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">Filter aktif:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {searchTerm}
                    <button onClick={() => setSearchTerm("")} className="ml-1 hover:text-red-500">×</button>
                  </Badge>
                )}
                {selectedCity && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {selectedCity}
                    <button onClick={() => setSelectedCity("")} className="ml-1 hover:text-red-500">×</button>
                  </Badge>
                )}
                {selectedCapacity && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {selectedCapacity}
                    <button onClick={() => setSelectedCapacity("")} className="ml-1 hover:text-red-500">×</button>
                  </Badge>
                )}
                {priceRange && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {priceRange}
                    <button onClick={() => setPriceRange("")} className="ml-1 hover:text-red-500">×</button>
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-red-500 hover:text-red-700">
                  Hapus semua filter
                </Button>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Menampilkan {filteredVenues.length} dari {venues.length} venue
            </p>
            <Select defaultValue="rating">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Urutkan berdasarkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating Tertinggi</SelectItem>
                <SelectItem value="price-low">Harga Terendah</SelectItem>
                <SelectItem value="price-high">Harga Tertinggi</SelectItem>
                <SelectItem value="popular">Paling Populer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Venue Grid */}
          {filteredVenues.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVenues.map((venue) => (
                <Card key={venue.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-lg">
                  <div className="relative overflow-hidden">
                    <img 
                      src={venue.image} 
                      alt={venue.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600 text-white">{venue.type}</Badge>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{venue.rating}</span>
                      <span className="text-xs text-gray-500">({venue.reviews})</span>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-bold text-gray-900">{venue.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {venue.location}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        {venue.capacity}
                      </div>
                      <div className="text-lg font-bold text-blue-600">{venue.price}</div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {venue.facilities.slice(0, 3).map((facility) => (
                        <Badge key={facility} variant="secondary" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                      {venue.facilities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{venue.facilities.length - 3} lagi
                        </Badge>
                      )}
                    </div>
                    
                    <Link to={`/venue/${venue.id}`}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Lihat Detail & Book
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Venue tidak ditemukan</h3>
              <p className="text-gray-600 mb-4">
                Coba ubah filter pencarian atau kata kunci Anda
              </p>
              <Button onClick={clearFilters} variant="outline">
                Reset Filter
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
