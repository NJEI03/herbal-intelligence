import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Utensils, 
  Calendar, 
  Lock,
  ChevronRight
} from "lucide-react";

const workouts = [
  {
    id: 1,
    title: "Morning Yoga Flow",
    duration: "30 min",
    difficulty: "Beginner",
    isPremium: false
  },
  {
    id: 2,
    title: "HIIT Cardio Blast",
    duration: "45 min",
    difficulty: "Intermediate",
    isPremium: true
  },
  {
    id: 3,
    title: "Strength Training",
    duration: "60 min",
    difficulty: "Advanced",
    isPremium: true
  }
];

const mealPlans = [
  {
    id: 1,
    title: "Balanced Breakfast",
    calories: "350-400",
    type: "Vegetarian",
    isPremium: false
  },
  {
    id: 2,
    title: "Protein-Packed Lunch",
    calories: "500-550",
    type: "High Protein",
    isPremium: true
  },
  {
    id: 3,
    title: "Light Dinner",
    calories: "400-450",
    type: "Low Carb",
    isPremium: true
  }
];

export default function Fitness() {
  const isPremium = false; // This would come from your auth state

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-herbal-text-primary">Fitness & Diet</h1>
          <p className="text-herbal-text-secondary">Your personalized wellness journey</p>
        </div>
        <Button className="bg-herbal-primary hover:bg-herbal-primary/90">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Workout
        </Button>
      </div>

      <Tabs defaultValue="workouts" className="space-y-8">
        <TabsList>
          <TabsTrigger value="workouts">Workouts</TabsTrigger>
          <TabsTrigger value="diet">Diet Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="workouts" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <Card key={workout.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">
                        {workout.isPremium && !isPremium ? (
                          <span className="flex items-center gap-2">
                            {workout.title}
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          </span>
                        ) : (
                          workout.title
                        )}
                      </CardTitle>
                      <CardDescription>
                        {workout.duration} • {workout.difficulty}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {workout.isPremium && !isPremium ? (
                    <Button variant="outline" className="w-full">
                      Upgrade to Access
                    </Button>
                  ) : (
                    <Button className="w-full bg-herbal-primary hover:bg-herbal-primary/90">
                      Start Workout
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="diet" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mealPlans.map((meal) => (
              <Card key={meal.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">
                        {meal.isPremium && !isPremium ? (
                          <span className="flex items-center gap-2">
                            {meal.title}
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          </span>
                        ) : (
                          meal.title
                        )}
                      </CardTitle>
                      <CardDescription>
                        {meal.calories} calories • {meal.type}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {meal.isPremium && !isPremium ? (
                    <Button variant="outline" className="w-full">
                      Upgrade to Access
                    </Button>
                  ) : (
                    <Button className="w-full bg-herbal-primary hover:bg-herbal-primary/90">
                      View Meal Plan
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {!isPremium && (
        <Card className="bg-herbal-background">
          <CardHeader>
            <CardTitle>Upgrade to Premium</CardTitle>
            <CardDescription>
              Get access to all workouts, meal plans, and personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-herbal-primary hover:bg-herbal-primary/90">
              Upgrade Now
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 