import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Users, 
  MessageSquare, 
  Clock,
  CheckCircle2,
  XCircle,
  UserPlus
} from "lucide-react";

const appointments = [
  {
    id: 1,
    patient: "John Doe",
    time: "09:00 AM",
    type: "Consultation",
    status: "confirmed"
  },
  {
    id: 2,
    patient: "Jane Smith",
    time: "10:30 AM",
    type: "Follow-up",
    status: "pending"
  },
  {
    id: 3,
    patient: "Mike Johnson",
    time: "02:00 PM",
    type: "Initial Visit",
    status: "confirmed"
  }
];

const stats = [
  {
    title: "Today's Appointments",
    value: "8",
    change: "+2",
    trend: "up"
  },
  {
    title: "Total Patients",
    value: "156",
    change: "+12",
    trend: "up"
  },
  {
    title: "Pending Messages",
    value: "5",
    change: "-2",
    trend: "down"
  },
  {
    title: "Available Slots",
    value: "12",
    change: "0",
    trend: "neutral"
  }
];

export default function DoctorDashboard() {
  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-herbal-text-primary">Doctor Dashboard</h1>
          <p className="text-herbal-text-secondary">Manage your practice and patient care</p>
        </div>
        <Button className="bg-herbal-primary hover:bg-herbal-primary/90">
          <UserPlus className="mr-2 h-4 w-4" />
          New Patient
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.trend === 'up' ? 'text-green-500' : 
                stat.trend === 'down' ? 'text-red-500' : 
                'text-muted-foreground'
              }`}>
                {stat.change} from yesterday
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>Manage your daily schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-herbal-background rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-herbal-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{appointment.patient}</h3>
                        <p className="text-sm text-muted-foreground">
                          {appointment.time} • {appointment.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {appointment.status === 'confirmed' ? (
                        <span className="flex items-center text-green-500">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Confirmed
                        </span>
                      ) : (
                        <span className="flex items-center text-yellow-500">
                          <Clock className="h-4 w-4 mr-1" />
                          Pending
                        </span>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients">
          <Card>
            <CardHeader>
              <CardTitle>Patient Records</CardTitle>
              <CardDescription>Access and manage patient information</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Patient records content will go here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>View and respond to patient messages</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Messages content will go here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Management</CardTitle>
              <CardDescription>Set your availability and manage appointments</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Schedule management content will go here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 