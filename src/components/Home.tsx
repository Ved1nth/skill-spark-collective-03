import { Search, Users, Calendar, Zap, Code, Camera, Music, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  const skills = [
    { name: 'Web Development', icon: Code, count: 124, color: 'bg-blue-100 text-blue-600' },
    { name: 'Photography', icon: Camera, count: 89, color: 'bg-purple-100 text-purple-600' },
    { name: 'Music Production', icon: Music, count: 67, color: 'bg-green-100 text-green-600' },
    { name: 'Graphic Design', icon: Palette, count: 103, color: 'bg-orange-100 text-orange-600' },
  ];

  const activities = [
    {
      title: 'Weekend Hiking',
      description: 'Explore nature trails with fellow outdoor enthusiasts',
      participants: 23,
      nextEvent: 'This Saturday',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop'
    },
    {
      title: 'Tech Meetup',
      description: 'Weekly discussions about latest in technology',
      participants: 45,
      nextEvent: 'Thursday 7PM',
      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop'
    },
    {
      title: 'Study Groups',
      description: 'Collaborative learning sessions across subjects',
      participants: 78,
      nextEvent: 'Tomorrow 3PM',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-primary electric-pulse" />
              <h1 className="text-2xl font-bold">
                <span className="text-primary">GTA</span>
              </h1>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search skills, activities, or people..." 
                  className="pl-10 border-border/50 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                Sign In
              </Button>
              <Button className="gradient-electric text-primary-foreground hover:opacity-90 electric-glow">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 gradient-electric bg-clip-text text-transparent">
            Connect Through Skills
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover talented students, join exciting activities, and build meaningful connections 
            based on shared interests and complementary skills.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button size="lg" className="gradient-electric text-primary-foreground electric-glow">
              <Users className="mr-2 h-5 w-5" />
              Find Talent
            </Button>
            <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
              <Calendar className="mr-2 h-5 w-5" />
              Browse Activities
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12 px-4 bg-background/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">Popular Skills</h3>
            <Button variant="ghost" className="text-primary hover:bg-primary/10">
              View All Skills →
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <Card 
                  key={skill.name} 
                  className="group hover:shadow-lg transition-smooth cursor-pointer border-border/50 hover:border-primary/20"
                >
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-lg ${skill.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-smooth`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{skill.name}</CardTitle>
                    <CardDescription>
                      {skill.count} talented students
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">Active Communities</h3>
            <Button variant="ghost" className="text-primary hover:bg-primary/10">
              Explore All →
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <Card 
                key={activity.title}
                className="group hover:shadow-lg transition-smooth cursor-pointer overflow-hidden border-border/50 hover:border-primary/20"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium">
                    {activity.participants} members
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {activity.title}
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {activity.nextEvent}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    {activity.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Make Connections?</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of students already connecting through shared passions and skills.
          </p>
          <Button size="lg" className="gradient-electric text-primary-foreground electric-glow">
            Start Connecting Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;