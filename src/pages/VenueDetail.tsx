
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Users, 
  Star, 
  Wifi, 
  Car, 
  Coffee, 
  Projector,
  Phone,
  Mail,
  Clock,
  Shield,
  ArrowLeft,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

const VenueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock data - in real app, fetch based on id
  const venue = {
    id: parseInt(id || "1"),
    name: "Sky Lounge Premium",
    location: "Jl. Sudirman No. 123, Jakarta Selatan",
    shortLocation: "Jakarta Selatan",
    capacity: "20-50 orang",
    price: "Rp 2.500.000",
    priceNum: 2500000,
    rating: 4.8,
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=500&fit=crop",
    ],
    description: "Sky Lounge Premium adalah venue meeting eksklusif dengan pemandangan kota yang menakjubkan. Dilengkapi dengan teknologi modern dan pelayanan premium, venue ini perfect untuk corporate meeting, seminar, workshop, dan acara bisnis lainnya. Suasana yang profesional namun nyaman membuat setiap acara menjadi berkesan.",
    facilities: [
      { icon: Wifi, name: "High-Speed WiFi" },
      { icon: Projector, name: "Projector 4K" },
      { icon: Coffee, name: "Coffee Break" },
      { icon: Car, name: "Free Parking" },
      { icon: Phone, name: "Audio System" },
      { icon: Users, name: "Meeting Room" }
    ],
    rules: [
      "Dilarang merokok di dalam ruangan",
      "Wajib menggunakan alas kaki yang sopan",
      "Tidak diperbolehkan membawa makanan dari luar",
      "Harap menjaga kebersihan venue",
      "Maximum volume musik hingga pukul 22.00"
    ],
    availableTimes: [
      "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "19:00", "20:00"
    ],
    durations: [
      { value: "2", label: "2 jam", priceMultiplier: 0.5 },
      { value: "4", label: "4 jam", priceMultiplier: 0.8 },
      { value: "6", label: "6 jam", priceMultiplier: 1 },
      { value: "8", label: "8 jam", priceMultiplier: 1.3 },
      { value: "12", label: "12 jam", priceMultiplier: 1.8 },
      { value: "24", label: "1 hari penuh", priceMultiplier: 2.5 }
    ],
    host: {
      name: "PT. Premium Venues",
      email: "booking@premiumvenues.com",
      phone: "+62 21 5555 1234",
      responseTime: "Dalam 2 jam"
    },
    refundPolicy: {
      template: "80% refund (minus booking fee) on cancellations up until 7 days before your booking. After that, cancel and get a 50% refund."
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === venue.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? venue.images.length - 1 : prev - 1
    );
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedDuration) {
      alert("Silakan pilih tanggal, waktu, dan durasi terlebih dahulu");
      return;
    }
    
    // Navigate to booking form with selected data as URL params to avoid cloning issues
    const searchParams = new URLSearchParams({
      venueId: venue.id.toString(),
      venueName: venue.name,
      venueLocation: venue.shortLocation,
      venuePrice: venue.priceNum.toString(),
      selectedDate: selectedDate.toISOString(),
      selectedTime: selectedTime,
      selectedDuration: selectedDuration
    });
    
    navigate(`/booking?${searchParams.toString()}`);
  };

  // Check if date is available (disable past dates and dates more than 5 days from today)
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 5);
    
    return date < today || date > maxDate;
  };

  const calculateTotalPrice = () => {
    const duration = venue.durations.find(d => d.value === selectedDuration);
    if (!duration) return venue.priceNum;
    return Math.round(venue.priceNum * duration.priceMultiplier);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate("/catalog")}
            className="mb-6 hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Catalog
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="relative">
                  <img 
                    src={venue.images[currentImageIndex]} 
                    alt={venue.name}
                    className="w-full h-96 object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {venue.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-bold">{venue.rating}</span>
                    <span className="text-gray-600">({venue.reviews} ulasan)</span>
                  </div>
                </div>
              </Card>

              {/* Venue Info */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                        {venue.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 text-lg">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        {venue.location}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">{venue.price}</div>
                      <div className="text-gray-600">per hari</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-bold mb-3">Deskripsi</h3>
                    <p className="text-gray-700 leading-relaxed">{venue.description}</p>
                  </div>

                  {/* Capacity */}
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Kapasitas</div>
                      <div className="text-blue-600">{venue.capacity}</div>
                    </div>
                  </div>

                  {/* Facilities */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Fasilitas</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {venue.facilities.map((facility, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <facility.icon className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">{facility.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rules */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Aturan Venue</h3>
                    <div className="space-y-2">
                      {venue.rules.map((rule, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Shield className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Kontak Host</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">{venue.host.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">{venue.host.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">{venue.host.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">Respon {venue.host.responseTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Refund Policy */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Ketentuan Refund</h3>
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-gray-700">{venue.refundPolicy.template}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Book Venue</CardTitle>
                  <CardDescription className="text-center">
                    Pilih tanggal, waktu, dan durasi yang tersedia
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Calendar */}
                  <div>
                    <h4 className="font-semibold mb-3">Pilih Tanggal (Max H-5)</h4>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={isDateDisabled}
                      locale={localeId}
                      className="rounded-lg border p-3"
                    />
                    {selectedDate && (
                      <p className="text-sm text-blue-600 mt-2">
                        Tanggal terpilih: {format(selectedDate, "dd MMMM yyyy", { locale: localeId })}
                      </p>
                    )}
                  </div>

                  {/* Time Selection */}
                  <div>
                    <h4 className="font-semibold mb-3">Pilih Waktu Mulai</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {venue.availableTimes.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className={selectedTime === time ? "bg-blue-600 hover:bg-blue-700" : ""}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                    {selectedTime && (
                      <p className="text-sm text-blue-600 mt-2">
                        Waktu mulai: {selectedTime}
                      </p>
                    )}
                  </div>

                  {/* Duration Selection */}
                  <div>
                    <h4 className="font-semibold mb-3">Pilih Durasi</h4>
                    <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih durasi booking" />
                      </SelectTrigger>
                      <SelectContent>
                        {venue.durations.map((duration) => (
                          <SelectItem key={duration.value} value={duration.value}>
                            <div className="flex justify-between items-center w-full">
                              <span>{duration.label}</span>
                              <span className="ml-4 text-blue-600 font-medium">
                                Rp {Math.round(venue.priceNum * duration.priceMultiplier).toLocaleString()}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedDuration && (
                      <p className="text-sm text-blue-600 mt-2">
                        Durasi: {venue.durations.find(d => d.value === selectedDuration)?.label}
                      </p>
                    )}
                  </div>

                  {/* Booking Summary */}
                  {selectedDate && selectedTime && selectedDuration && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Ringkasan Booking</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Tanggal:</span>
                          <span className="font-medium">
                            {format(selectedDate, "dd MMMM yyyy", { locale: localeId })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Waktu:</span>
                          <span className="font-medium">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Durasi:</span>
                          <span className="font-medium">
                            {venue.durations.find(d => d.value === selectedDuration)?.label}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-blue-200">
                          <span>Total:</span>
                          <span className="font-bold text-blue-600">
                            Rp {calculateTotalPrice().toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Book Button */}
                  <Button 
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime || !selectedDuration}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6"
                  >
                    {!selectedDate || !selectedTime || !selectedDuration ? "Pilih Tanggal, Waktu & Durasi" : "Lanjut ke Booking"}
                  </Button>

                  {/* Info Notice */}
                  <div className="text-center text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 mx-auto mb-2 text-gray-400" />
                    Tidak perlu login untuk melihat halaman booking
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetail;
