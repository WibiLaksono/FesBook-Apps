
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Index = () => {
  const featuredVenues = [
    {
      id: 1,
      name: "Sky Lounge Premium",
      location: "Jakarta Selatan",
      capacity: "20-50 orang",
      price: "Rp 2.500.000",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop",
      facilities: ["WiFi", "AC", "Projector", "Catering"]
    },
    {
      id: 2,
      name: "Garden Space",
      location: "Bandung",
      capacity: "10-30 orang",
      price: "Rp 1.800.000",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=300&fit=crop",
      facilities: ["Outdoor", "WiFi", "Sound System"]
    },
    {
      id: 3,
      name: "Modern Co-Space",
      location: "Jakarta Pusat",
      capacity: "5-20 orang",
      price: "Rp 1.200.000",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop",
      facilities: ["WiFi", "AC", "Meeting Room", "Kitchen"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 mt-">
              Temukan Venue Impian Anda
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Platform terpercaya untuk booking venue meeting, event, dan gathering 
              dengan proses yang mudah dan transparan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg">
                  Jelajahi Venue
                </Button>
              </Link>
              <Link to="/host-dashboard">
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-blue-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600">
                  Daftar sebagai Host
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Venue Tersedia</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">10k+</div>
              <div className="text-gray-600">Event Sukses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">Kota</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">4.8★</div>
              <div className="text-gray-600">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Venue Populer
            </h2>
            <p className="text-gray-600 text-lg">
              Pilihan terbaik dari host terpercaya
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVenues.map((venue) => (
              <Card key={venue.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-lg">
                <div className="relative overflow-hidden">
                  <img 
                    src={venue.image} 
                    alt={venue.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{venue.rating}</span>
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
                      Lihat Detail
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/catalog">
              <Button variant="outline" size="lg" className="px-8 py-3 border-blue-300 hover:bg-blue-50">
                Lihat Semua Venue
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-blue-100 text-lg">
              Pengalaman booking venue yang mudah dan terpercaya
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Booking Mudah</h3>
              <p className="text-blue-100">
                Proses booking yang sederhana dengan konfirmasi otomatis
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Host Terpercaya</h3>
              <p className="text-blue-100">
                Semua host telah melalui verifikasi untuk kualitas terbaik
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Garansi Kepuasan</h3>
              <p className="text-blue-100">
                Jaminan refund dan support 24/7 untuk pengalaman terbaik
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Siap Memulai Event Anda?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Bergabunglah dengan ribuan pengguna yang telah mempercayai platform kami
            </p>
            <Link to="/catalog">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg">
                Mulai Booking Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
