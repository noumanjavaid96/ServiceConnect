import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

interface Booking {
  id: string;
  customerName: string;
  customerPhoto: string;
  service: string;
  date: string;
  time: string;
  location: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  price: string;
}

interface BookingsListProps {
  bookings: Booking[];
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
  onComplete?: (id: string) => void;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
};

const BookingsList = ({
  bookings,
  onAccept,
  onDecline,
  onComplete,
}: BookingsListProps) => {
  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id} className="p-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={booking.customerPhoto}
                alt={booking.customerName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{booking.customerName}</h4>
                  <p className="text-sm text-gray-600">{booking.service}</p>
                </div>
                <Badge className={statusColors[booking.status]}>
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{booking.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{booking.location}</span>
                </div>
                <div className="text-sm font-semibold">{booking.price}</div>
              </div>

              {booking.status === "pending" && (
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onAccept?.(booking.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDecline?.(booking.id)}
                  >
                    Decline
                  </Button>
                </div>
              )}

              {booking.status === "confirmed" && (
                <Button
                  variant="default"
                  size="sm"
                  className="mt-4"
                  onClick={() => onComplete?.(booking.id)}
                >
                  Mark as Completed
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BookingsList;
