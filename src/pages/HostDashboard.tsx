
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Star,
  Eye,
  Edit,
  MoreVertical,
  CheckCircle,
  Clock,
  XCircle,
  Filter
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";

const HostDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");

  // Mock data for host venues
  const venues = [
    {
      id: 1,
      name: "Sky Lounge Premium",
      location: "Jakarta Selatan",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
      rating: 4.8,
      totalBookings: 45,
      revenue: 112500000,
      status: "active"
    },
    {
      id: 2,
      name: "Garden Space",
      location: "Bandung",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop",
      rating: 4.6,
      totalBookings: 32,
      revenue: 57600000,
      status: "active"
    },
    {
      id: 3,
      name: "Modern Co-Space",
      location: "Jakarta Pusat",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop",
      rating: 4.9,
      totalBookings: 28,
      revenue: 33600000,
      status: "draft"
    }
  ];

  // Mock booking data
  const bookings = [
    {
      id: "BK001234",
      venueName: "Sky Lounge Premium",
      customerName: "John Doe",
      date: "2024-01-15",
      time: "09:00",
      attendees: 25,
      amount: 2500000,
      status: "pending",
      eventType: "Meeting"
    },
    {
      id: "BK001235",
      venueName: "Garden Space",
      customerName: "Jane Smith",
      date: "2024-01-16",
      time: "14:00",
      attendees: 15,
      amount: 1800000,
      status: "confirmed",
      eventType: "Workshop"
    },
    {
      id: "BK001236",
      venueName: "Sky Lounge Premium",
      customerName: "Robert Johnson",
      date: "2024-01-14",
      time: "10:00",
      attendees: 30,
      amount: 2500000,
      status: "completed",
      eventType: "Seminar"
    },
    {
      id: "BK001237",
      venueName: "Modern Co-Space",
      customerName: "Alice Brown",
      date: "2024-01-13",
      time: "16:00",
      attendees: 12,
      amount: 1200000,
      status: "cancelled",
      eventType: "Meeting"
    }
  ];

  // Mock transaction data
  const transactions = [
    {
      id: "TRX001",
      bookingId: "BK001236",
      amount: 2500000,
      commission: 250000,
      netAmount: 2250000,
      date: "2024-01-14",
      status: "completed"
    },
    {
      id: "TRX002",
      bookingId: "BK001235",
      amount: 1800000,
      commission: 180000,
      netAmount: 1620000,
      date: "2024-01-16",
      status: "pending"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "yellow";
      case "confirmed":
        return "blue";
      case "completed":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Menunggu";
      case "confirmed":
        return "Dikonfirmasi";
      case "completed":
        return "Selesai";
      case "cancelled":
        return "Dibatalkan";
      default:
        return status;
    }
  };

  // Calculate summary stats
  const totalRevenue = venues.reduce((sum, venue) => sum + venue.revenue, 0);
  const totalBookings = venues.reduce((sum, venue) => sum + venue.totalBookings, 0);
  const pendingBookings = bookings.filter(b => b.status === "pending").length;
  const ongoingBookings = bookings.filter(b => b.status === "confirmed").length;
  const completedBookings = bookings.filter(b => b.status === "completed").length;
  const refundedBookings = bookings.filter(b => b.status === "cancelled").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Host</h1>
              <p className="text-gray-600">Kelola venue dan booking Anda</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mt-4 sm:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Venue
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">
                      Rp {(totalRevenue / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+12% dari bulan lalu</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-600">+8% dari bulan lalu</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Venue Aktif</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {venues.filter(v => v.status === "active").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-sm text-gray-600">
                    {venues.filter(v => v.status === "draft").length} draft
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Rating Rata-rata</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(venues.reduce((sum, v) => sum + v.rating, 0) / venues.length).toFixed(1)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-4 h-4 text-yellow-600 fill-current" />
                  <span className="text-sm text-gray-600">Dari 156 ulasan</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="venues" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="venues">Venue Saya</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="transactions">Transaksi</TabsTrigger>
            </TabsList>

            {/* Venues Tab */}
            <TabsContent value="venues" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <h2 className="text-xl font-bold">Venue Saya</h2>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {venues.map((venue) => (
                  <Card key={venue.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative">
                      <img 
                        src={venue.image} 
                        alt={venue.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Venue
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge variant={venue.status === "active" ? "default" : "secondary"}>
                          {venue.status === "active" ? "Aktif" : "Draft"}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{venue.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {venue.location}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{venue.rating}</span>
                        </div>
                        <div className="text-gray-600">{venue.totalBookings} bookings</div>
                      </div>
                      
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-sm text-gray-600">Revenue Bulan Ini</div>
                        <div className="text-lg font-bold text-green-600">
                          Rp {(venue.revenue / 1000000).toFixed(1)}M
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          Lihat
                        </Button>
                        <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Booking Management</h2>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="text-yellow-600">Pending: {pendingBookings}</span>
                    <span className="text-blue-600">Ongoing: {ongoingBookings}</span>
                    <span className="text-green-600">Done: {completedBookings}</span>
                    <span className="text-red-600">Refund: {refundedBookings}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-lg">#{booking.id}</span>
                            <Badge variant="secondary" className={`text-${getStatusColor(booking.status)}-700 bg-${getStatusColor(booking.status)}-100`}>
                              {getStatusText(booking.status)}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                            <div><span className="font-medium">Venue:</span> {booking.venueName}</div>
                            <div><span className="font-medium">Customer:</span> {booking.customerName}</div>
                            <div><span className="font-medium">Tanggal:</span> {booking.date} {booking.time}</div>
                            <div><span className="font-medium">Peserta:</span> {booking.attendees} orang</div>
                          </div>
                          <div className="text-lg font-bold text-green-600">
                            Rp {booking.amount.toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {booking.status === "pending" && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Terima
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                                <XCircle className="w-4 h-4 mr-1" />
                                Tolak
                              </Button>
                            </>
                          )}
                          {booking.status === "confirmed" && (
                            <Badge variant="secondary" className="text-blue-700 bg-blue-100">
                              <Clock className="w-4 h-4 mr-1" />
                              Menunggu Pembayaran
                            </Badge>
                          )}
                          <Button variant="outline" size="sm">
                            Detail
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <h2 className="text-xl font-bold">Log Transaksi</h2>
                <div className="flex gap-2">
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="thisWeek">Minggu Ini</SelectItem>
                      <SelectItem value="thisMonth">Bulan Ini</SelectItem>
                      <SelectItem value="lastMonth">Bulan Lalu</SelectItem>
                      <SelectItem value="thisYear">Tahun Ini</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <Card key={transaction.id} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="font-bold">{transaction.id}</span>
                            <span className="text-gray-600">• Booking #{transaction.bookingId}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {transaction.date}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Gross Amount:</span>
                              <div className="font-medium">Rp {transaction.amount.toLocaleString()}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Commission (10%):</span>
                              <div className="font-medium text-red-600">- Rp {transaction.commission.toLocaleString()}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Net Amount:</span>
                              <div className="font-bold text-green-600">Rp {transaction.netAmount.toLocaleString()}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                            {transaction.status === "completed" ? "Selesai" : "Pending"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
