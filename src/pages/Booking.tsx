
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, MapPin, Calendar, Clock, Users, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import Navbar from "@/components/Navbar";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { venue, selectedDate, selectedTime } = location.state || {};

  // Redirect if no booking data
  if (!venue || !selectedDate || !selectedTime) {
    navigate("/catalog");
    return null;
  }

  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    // Host Questions
    hostAnswers: {} as Record<string, string>,
    
    // Additional Requests
    additionalItems: [] as string[],
    specialRequests: "",
    
    // Booking Information
    name: "",
    eventType: "",
    attendees: "",
    eventDescription: ""
  });

  // Mock host questions (template)
  const hostQuestions = [
    {
      id: "purpose",
      question: "Apa tujuan acara yang akan dilaksanakan?",
      type: "radio",
      options: ["Meeting/Rapat", "Workshop/Training", "Seminar", "Gathering", "Lainnya"],
      required: true
    },
    {
      id: "equipment",
      question: "Apakah Anda membutuhkan peralatan tambahan?",
      type: "checkbox",
      options: ["Microphone", "Speaker tambahan", "Flip chart", "Marker", "Tidak ada"],
      required: false
    },
    {
      id: "catering",
      question: "Apakah Anda memerlukan layanan catering?",
      type: "radio",
      options: ["Ya, coffee break", "Ya, lunch", "Ya, keduanya", "Tidak"],
      required: true
    },
    {
      id: "setup",
      question: "Bagaimana setup ruangan yang Anda inginkan?",
      type: "radio",
      options: ["Classroom", "U-Shape", "Theatre", "Boardroom", "Custom"],
      required: true
    }
  ];

  // Additional items available
  const additionalItemsOptions = [
    { id: "projector", name: "Projector tambahan", price: 200000 },
    { id: "sound", name: "Sound system premium", price: 300000 },
    { id: "decoration", name: "Dekorasi sederhana", price: 500000 },
    { id: "photography", name: "Dokumentasi foto", price: 800000 },
    { id: "live-streaming", name: "Live streaming setup", price: 1000000 }
  ];

  const eventTypes = [
    "Meeting/Rapat",
    "Workshop/Training", 
    "Seminar",
    "Product Launch",
    "Gathering/Team Building",
    "Birthday Party",
    "Wedding Event",
    "Corporate Event",
    "Lainnya"
  ];

  const handleAnswerChange = (questionId: string, answer: string) => {
    setBookingData(prev => ({
      ...prev,
      hostAnswers: {
        ...prev.hostAnswers,
        [questionId]: answer
      }
    }));
  };

  const handleItemToggle = (itemId: string) => {
    setBookingData(prev => ({
      ...prev,
      additionalItems: prev.additionalItems.includes(itemId)
        ? prev.additionalItems.filter(id => id !== itemId)
        : [...prev.additionalItems, itemId]
    }));
  };

  const handleSubmitBooking = () => {
    // Validate required fields
    if (!bookingData.name || !bookingData.eventType || !bookingData.attendees) {
      alert("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    // Check required host questions
    const requiredQuestions = hostQuestions.filter(q => q.required);
    for (const question of requiredQuestions) {
      if (!bookingData.hostAnswers[question.id]) {
        alert(`Mohon jawab pertanyaan: ${question.question}`);
        return;
      }
    }

    // Submit booking and navigate to status page
    navigate("/booking-status", {
      state: {
        venue,
        selectedDate,
        selectedTime,
        bookingData,
        totalPrice: calculateTotalPrice()
      }
    });
  };

  const calculateTotalPrice = () => {
    const basePrice = venue.priceNum;
    const additionalPrice = bookingData.additionalItems.reduce((total, itemId) => {
      const item = additionalItemsOptions.find(opt => opt.id === itemId);
      return total + (item?.price || 0);
    }, 0);
    return basePrice + additionalPrice;
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/venue/${venue.id}`)}
            className="mb-6 hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Detail Venue
          </Button>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === currentStep ? 'bg-blue-600 text-white' :
                    step < currentStep ? 'bg-green-600 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step < currentStep ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {currentStep === 1 && "Jawab Pertanyaan Host"}
                    {currentStep === 2 && "Pilih Layanan Tambahan"}
                    {currentStep === 3 && "Informasi Booking"}
                  </CardTitle>
                  <CardDescription>
                    {currentStep === 1 && "Host venue memiliki beberapa pertanyaan untuk memastikan acara Anda berjalan lancar"}
                    {currentStep === 2 && "Pilih layanan atau barang tambahan yang Anda butuhkan"}
                    {currentStep === 3 && "Lengkapi informasi terakhir untuk menyelesaikan booking"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Step 1: Host Questions */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      {hostQuestions.map((question) => (
                        <div key={question.id} className="space-y-3">
                          <Label className="text-base font-medium">
                            {question.question}
                            {question.required && <span className="text-red-500 ml-1">*</span>}
                          </Label>
                          
                          {question.type === "radio" && (
                            <RadioGroup 
                              value={bookingData.hostAnswers[question.id] || ""}
                              onValueChange={(value) => handleAnswerChange(question.id, value)}
                            >
                              {question.options.map((option) => (
                                <div key={option} className="flex items-center space-x-2">
                                  <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                                  <Label htmlFor={`${question.id}-${option}`} className="font-normal">
                                    {option}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          )}
                          
                          {question.type === "checkbox" && (
                            <div className="space-y-2">
                              {question.options.map((option) => (
                                <div key={option} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`${question.id}-${option}`}
                                    checked={bookingData.hostAnswers[question.id]?.includes(option) || false}
                                    onCheckedChange={(checked) => {
                                      const currentAnswers = bookingData.hostAnswers[question.id]?.split(",") || [];
                                      if (checked) {
                                        handleAnswerChange(question.id, [...currentAnswers, option].join(","));
                                      } else {
                                        handleAnswerChange(question.id, currentAnswers.filter(a => a !== option).join(","));
                                      }
                                    }}
                                  />
                                  <Label htmlFor={`${question.id}-${option}`} className="font-normal">
                                    {option}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}

                      <div className="flex justify-end pt-6">
                        <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                          Lanjut ke Layanan Tambahan
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Additional Items */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-4">Layanan & Barang Tambahan</h4>
                        <div className="grid gap-4">
                          {additionalItemsOptions.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id={item.id}
                                  checked={bookingData.additionalItems.includes(item.id)}
                                  onCheckedChange={() => handleItemToggle(item.id)}
                                />
                                <div>
                                  <Label htmlFor={item.id} className="font-medium cursor-pointer">
                                    {item.name}
                                  </Label>
                                </div>
                              </div>
                              <div className="text-blue-600 font-semibold">
                                + Rp {item.price.toLocaleString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="special-requests" className="text-base font-medium">
                          Request Khusus (Opsional)
                        </Label>
                        <Textarea
                          id="special-requests"
                          placeholder="Jelaskan request khusus Anda..."
                          value={bookingData.specialRequests}
                          onChange={(e) => setBookingData(prev => ({...prev, specialRequests: e.target.value}))}
                          className="mt-2"
                          rows={4}
                        />
                      </div>

                      <div className="flex justify-between pt-6">
                        <Button variant="outline" onClick={prevStep}>
                          Kembali
                        </Button>
                        <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                          Lanjut ke Informasi Booking
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Booking Information */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nama Lengkap *</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={bookingData.name}
                            onChange={(e) => setBookingData(prev => ({...prev, name: e.target.value}))}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="event-type">Jenis Acara *</Label>
                          <Select 
                            value={bookingData.eventType} 
                            onValueChange={(value) => setBookingData(prev => ({...prev, eventType: value}))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih jenis acara" />
                            </SelectTrigger>
                            <SelectContent>
                              {eventTypes.map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="attendees">Jumlah Peserta *</Label>
                        <Input
                          id="attendees"
                          type="number"
                          placeholder="25"
                          value={bookingData.attendees}
                          onChange={(e) => setBookingData(prev => ({...prev, attendees: e.target.value}))}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="event-description">Deskripsi Acara (Opsional)</Label>
                        <Textarea
                          id="event-description"
                          placeholder="Jelaskan detail acara Anda..."
                          value={bookingData.eventDescription}
                          onChange={(e) => setBookingData(prev => ({...prev, eventDescription: e.target.value}))}
                          rows={4}
                        />
                      </div>

                      {/* Terms Agreement */}
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-gray-700">
                            <p className="font-medium mb-2">Ketentuan Booking:</p>
                            <ul className="space-y-1 text-xs">
                              <li>• Booking akan menunggu konfirmasi dari host maksimal 6 jam</li>
                              <li>• Pembayaran harus dilakukan dalam 24 jam setelah konfirmasi</li>
                              <li>• Refund sesuai dengan kebijakan venue yang telah dijelaskan</li>
                              <li>• Anda akan menerima email konfirmasi setelah booking</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-6">
                        <Button variant="outline" onClick={prevStep}>
                          Kembali
                        </Button>
                        <Button onClick={handleSubmitBooking} className="bg-green-600 hover:bg-green-700">
                          Submit Booking
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Ringkasan Booking</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Venue Info */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{venue.name}</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {venue.shortLocation}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {format(selectedDate, "dd MMMM yyyy", { locale: localeId })}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {selectedTime}
                      </div>
                      {bookingData.attendees && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {bookingData.attendees} orang
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-semibold mb-3">Rincian Harga</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Harga venue</span>
                        <span>Rp {venue.priceNum.toLocaleString()}</span>
                      </div>
                      
                      {/* Additional Items */}
                      {bookingData.additionalItems.map(itemId => {
                        const item = additionalItemsOptions.find(opt => opt.id === itemId);
                        return item ? (
                          <div key={itemId} className="flex justify-between text-blue-600">
                            <span>{item.name}</span>
                            <span>+ Rp {item.price.toLocaleString()}</span>
                          </div>
                        ) : null;
                      })}
                      
                      <div className="border-t border-gray-200 pt-2 font-bold flex justify-between">
                        <span>Total</span>
                        <span className="text-blue-600">Rp {calculateTotalPrice().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="border-t border-gray-200 pt-4 text-sm text-gray-600">
                    <p className="font-medium text-gray-900 mb-2">Butuh bantuan?</p>
                    <p>Hubungi customer service kami</p>
                    <p className="text-blue-600">+62 21 1234 5678</p>
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

export default Booking;
