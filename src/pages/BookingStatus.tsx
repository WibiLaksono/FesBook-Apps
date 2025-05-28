
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Calendar, 
  MapPin, 
  Users,
  Mail,
  CreditCard,
  ArrowLeft,
  RotateCcw,
  X
} from "lucide-react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import Navbar from "@/components/Navbar";

const BookingStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { venue, selectedDate, selectedTime, bookingData, totalPrice } = location.state || {};

  // Redirect if no booking data
  if (!venue || !selectedDate || !selectedTime || !bookingData) {
    navigate("/catalog");
    return null;
  }

  const [bookingStatus, setBookingStatus] = useState("pending"); // pending, confirmed, payment_required, completed, cancelled, expired
  const [timeRemaining, setTimeRemaining] = useState(6 * 60 * 60); // 6 hours in seconds
  const [paymentTimeRemaining, setPaymentTimeRemaining] = useState(24 * 60 * 60); // 24 hours in seconds

  // Simulate booking confirmation after some time (for demo)
  useEffect(() => {
    const confirmationTimer = setTimeout(() => {
      if (bookingStatus === "pending") {
        setBookingStatus("confirmed");
        // After confirmation, start payment timer
        setTimeout(() => {
          setBookingStatus("payment_required");
        }, 2000);
      }
    }, 10000); // 10 seconds for demo (normally 6 hours)

    return () => clearTimeout(confirmationTimer);
  }, [bookingStatus]);

  // Countdown timer for pending confirmation
  useEffect(() => {
    if (bookingStatus === "pending" && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setBookingStatus("expired");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [bookingStatus, timeRemaining]);

  // Countdown timer for payment
  useEffect(() => {
    if (bookingStatus === "payment_required" && paymentTimeRemaining > 0) {
      const timer = setInterval(() => {
        setPaymentTimeRemaining(prev => {
          if (prev <= 1) {
            setBookingStatus("cancelled");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [bookingStatus, paymentTimeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResubmit = () => {
    setBookingStatus("pending");
    setTimeRemaining(6 * 60 * 60);
    // In real app, make API call to resubmit booking
  };

  const handleCancel = () => {
    setBookingStatus("cancelled");
    // In real app, make API call to cancel booking
  };

  const handlePayment = () => {
    // Simulate payment process
    setBookingStatus("completed");
    // In real app, integrate with payment gateway
  };

  const getStatusIcon = () => {
    switch (bookingStatus) {
      case "pending":
        return <Clock className="w-8 h-8 text-yellow-600" />;
      case "confirmed":
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case "payment_required":
        return <CreditCard className="w-8 h-8 text-blue-600" />;
      case "completed":
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case "cancelled":
        return <XCircle className="w-8 h-8 text-red-600" />;
      case "expired":
        return <AlertCircle className="w-8 h-8 text-red-600" />;
      default:
        return <Clock className="w-8 h-8 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (bookingStatus) {
      case "pending":
        return "yellow";
      case "confirmed":
        return "green";
      case "payment_required":
        return "blue";
      case "completed":
        return "green";
      case "cancelled":
        return "red";
      case "expired":
        return "red";
      default:
        return "gray";
    }
  };

  const getStatusText = () => {
    switch (bookingStatus) {
      case "pending":
        return "Menunggu Konfirmasi";
      case "confirmed":
        return "Dikonfirmasi Host";
      case "payment_required":
        return "Perlu Pembayaran";
      case "completed":
        return "Booking Selesai";
      case "cancelled":
        return "Dibatalkan";
      case "expired":
        return "Expired";
      default:
        return "Unknown";
    }
  };

  const getProgressValue = () => {
    switch (bookingStatus) {
      case "pending":
        return 25;
      case "confirmed":
        return 50;
      case "payment_required":
        return 75;
      case "completed":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
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
            {/* Main Status */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Header */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    {getStatusIcon()}
                  </div>
                  <CardTitle className="text-2xl">
                    <Badge variant="secondary" className={`text-${getStatusColor()}-700 bg-${getStatusColor()}-100 text-lg px-4 py-2`}>
                      {getStatusText()}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Booking ID: #BK{Date.now().toString().slice(-6)}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2 text-sm">
                      <span>Booking</span>
                      <span>Konfirmasi</span>
                      <span>Pembayaran</span>
                      <span>Selesai</span>
                    </div>
                    <Progress value={getProgressValue()} className="h-3" />
                  </div>

                  {/* Status-specific content */}
                  {bookingStatus === "pending" && (
                    <div className="text-center space-y-4">
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">Menunggu Konfirmasi Host</h4>
                        <p className="text-yellow-700 mb-4">
                          Host venue sedang meninjau booking Anda. Anda akan mendapat notifikasi maksimal dalam 6 jam.
                        </p>
                        <div className="text-2xl font-bold text-yellow-800">
                          Sisa waktu: {formatTime(timeRemaining)}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          Email konfirmasi telah dikirim ke alamat Anda
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingStatus === "confirmed" && (
                    <div className="text-center space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Booking Dikonfirmasi!</h4>
                        <p className="text-green-700">
                          Selamat! Host telah menyetujui booking Anda. Silakan lanjutkan ke pembayaran.
                        </p>
                      </div>
                    </div>
                  )}

                  {bookingStatus === "payment_required" && (
                    <div className="text-center space-y-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Pembayaran Diperlukan</h4>
                        <p className="text-blue-700 mb-4">
                          Booking Anda telah dikonfirmasi. Silakan selesaikan pembayaran dalam waktu yang tersisa.
                        </p>
                        <div className="text-2xl font-bold text-blue-800 mb-4">
                          Sisa waktu: {formatTime(paymentTimeRemaining)}
                        </div>
                        <Button 
                          onClick={handlePayment}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                        >
                          <CreditCard className="w-5 h-5 mr-2" />
                          Bayar Sekarang - Rp {totalPrice.toLocaleString()}
                        </Button>
                      </div>
                    </div>
                  )}

                  {bookingStatus === "completed" && (
                    <div className="text-center space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Booking Berhasil!</h4>
                        <p className="text-green-700 mb-4">
                          Pembayaran berhasil dan booking Anda telah dikonfirmasi. E-ticket telah dikirim ke email Anda.
                        </p>
                        <div className="flex gap-3 justify-center">
                          <Button variant="outline">
                            <Mail className="w-4 h-4 mr-2" />
                            Download E-ticket
                          </Button>
                          <Button variant="outline">
                            Hubungi Host
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingStatus === "expired" && (
                    <div className="text-center space-y-4">
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h4 className="font-semibold text-red-800 mb-2">Booking Expired</h4>
                        <p className="text-red-700 mb-4">
                          Maaf, host tidak merespon dalam waktu 6 jam. Anda dapat mencoba booking ulang atau pilih venue lain.
                        </p>
                        <div className="flex gap-3 justify-center">
                          <Button 
                            onClick={handleResubmit}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Kirim Ulang Booking
                          </Button>
                          <Button variant="outline" onClick={() => navigate("/catalog")}>
                            Pilih Venue Lain
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingStatus === "cancelled" && (
                    <div className="text-center space-y-4">
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h4 className="font-semibold text-red-800 mb-2">Booking Dibatalkan</h4>
                        <p className="text-red-700 mb-4">
                          Booking telah dibatalkan. Jika ada pembayaran yang sudah dilakukan, refund akan diproses sesuai kebijakan venue.
                        </p>
                        <Button variant="outline" onClick={() => navigate("/catalog")}>
                          Cari Venue Lain
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons for Pending Status */}
                  {bookingStatus === "pending" && (
                    <div className="flex gap-3 justify-center mt-6">
                      <Button 
                        onClick={handleResubmit}
                        variant="outline"
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Kirim Ulang
                      </Button>
                      <Button 
                        onClick={handleCancel}
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Batalkan
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Timeline Booking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Booking dikirim</div>
                        <div className="text-sm text-gray-600">Baru saja</div>
                      </div>
                    </div>
                    
                    {bookingStatus !== "pending" && (
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium">Dikonfirmasi host</div>
                          <div className="text-sm text-gray-600">2 menit yang lalu</div>
                        </div>
                      </div>
                    )}
                    
                    {bookingStatus === "completed" && (
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium">Pembayaran berhasil</div>
                          <div className="text-sm text-gray-600">Baru saja</div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Details Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Detail Booking</CardTitle>
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
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {bookingData.attendees} orang
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-semibold mb-2">Detail Acara</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Nama:</span> {bookingData.name}
                      </div>
                      <div>
                        <span className="font-medium">Jenis:</span> {bookingData.eventType}
                      </div>
                      {bookingData.eventDescription && (
                        <div>
                          <span className="font-medium">Deskripsi:</span> {bookingData.eventDescription}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Pembayaran</span>
                      <span className="text-xl font-bold text-blue-600">
                        Rp {totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="border-t border-gray-200 pt-4 text-sm text-gray-600">
                    <p className="font-medium text-gray-900 mb-2">Butuh bantuan?</p>
                    <p>Hubungi customer service:</p>
                    <p className="text-blue-600">+62 21 1234 5678</p>
                    <p className="text-blue-600">help@venuespace.com</p>
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

export default BookingStatus;
