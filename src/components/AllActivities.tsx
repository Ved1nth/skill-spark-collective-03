import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, MapPin, Clock, Mountain, Code, BookOpen, Palette, Music, Camera, Dumbbell, Coffee, Gamepad2, Globe, Heart, TreePine, Microscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const AllActivities = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Comprehensive activities and events list
  const allActivities = [
    // Outdoor & Adventure
    {
      id: 'weekend-hiking',
      title: 'Weekend Hiking',
      description: 'Explore nature trails with fellow outdoor enthusiasts',
      participants: 156,
      upcomingEvents: 3,
      nextEvent: 'This Saturday',
      category: 'Outdoor & Adventure',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop',
      icon: Mountain
    },
    {
      id: 'rock-climbing',
      title: 'Rock Climbing Club',
      description: 'Indoor and outdoor climbing for all skill levels',
      participants: 89,
      upcomingEvents: 2,
      nextEvent: 'Friday 7PM',
      category: 'Outdoor & Adventure',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      icon: Mountain
    },
    {
      id: 'camping-trips',
      title: 'Camping Adventures',
      description: 'Weekend camping trips and wilderness experiences',
      participants: 67,
      upcomingEvents: 1,
      nextEvent: 'Next Weekend',
      category: 'Outdoor & Adventure',
      image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=400&h=300&fit=crop',
      icon: TreePine
    },

    // Technology & Innovation
    {
      id: 'tech-meetup',
      title: 'Tech Meetup',
      description: 'Weekly discussions about latest in technology',
      participants: 234,
      upcomingEvents: 4,
      nextEvent: 'Thursday 7PM',
      category: 'Technology & Innovation',
      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop',
      icon: Code
    },
    {
      id: 'hackathons',
      title: 'Hackathon Events',
      description: '24-hour coding challenges and innovation competitions',
      participants: 187,
      upcomingEvents: 2,
      nextEvent: 'Next Month',
      category: 'Technology & Innovation',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
      icon: Code
    },
    {
      id: 'ai-workshops',
      title: 'AI & ML Workshops',
      description: 'Hands-on workshops in artificial intelligence and machine learning',
      participants: 145,
      upcomingEvents: 3,
      nextEvent: 'Wednesday 6PM',
      category: 'Technology & Innovation',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
      icon: Code
    },

    // Academic & Learning
    {
      id: 'study-groups',
      title: 'Study Groups',
      description: 'Collaborative learning sessions across subjects',
      participants: 298,
      upcomingEvents: 8,
      nextEvent: 'Tomorrow 3PM',
      category: 'Academic & Learning',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      icon: BookOpen
    },
    {
      id: 'research-symposium',
      title: 'Research Symposium',
      description: 'Present and discuss ongoing research projects',
      participants: 134,
      upcomingEvents: 1,
      nextEvent: 'Next Friday',
      category: 'Academic & Learning',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      icon: Microscope
    },
    {
      id: 'language-exchange',
      title: 'Language Exchange',
      description: 'Practice languages with native speakers',
      participants: 112,
      upcomingEvents: 5,
      nextEvent: 'Daily 6PM',
      category: 'Academic & Learning',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop',
      icon: Globe
    },

    // Arts & Creativity
    {
      id: 'art-workshops',
      title: 'Art Workshops',
      description: 'Painting, drawing, and creative expression sessions',
      participants: 78,
      upcomingEvents: 2,
      nextEvent: 'Sunday 2PM',
      category: 'Arts & Creativity',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
      icon: Palette
    },
    {
      id: 'music-sessions',
      title: 'Music Jam Sessions',
      description: 'Collaborative music making and performance opportunities',
      participants: 94,
      upcomingEvents: 3,
      nextEvent: 'Saturday 7PM',
      category: 'Arts & Creativity',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      icon: Music
    },
    {
      id: 'photography-walks',
      title: 'Photography Walks',
      description: 'Explore the city while practicing photography skills',
      participants: 56,
      upcomingEvents: 2,
      nextEvent: 'Sunday 9AM',
      category: 'Arts & Creativity',
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop',
      icon: Camera
    },

    // Health & Fitness
    {
      id: 'fitness-groups',
      title: 'Fitness Groups',
      description: 'Group workouts, yoga, and wellness activities',
      participants: 201,
      upcomingEvents: 6,
      nextEvent: 'Every Morning',
      category: 'Health & Fitness',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      icon: Dumbbell
    },
    {
      id: 'mental-health',
      title: 'Mental Health Support',
      description: 'Peer support groups and wellness workshops',
      participants: 167,
      upcomingEvents: 4,
      nextEvent: 'Tuesday 5PM',
      category: 'Health & Fitness',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
      icon: Heart
    },

    // Social & Entertainment
    {
      id: 'coffee-meetups',
      title: 'Coffee Meetups',
      description: 'Casual networking and social gatherings',
      participants: 145,
      upcomingEvents: 5,
      nextEvent: 'Every Day 4PM',
      category: 'Social & Entertainment',
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&fit=crop',
      icon: Coffee
    },
    {
      id: 'game-nights',
      title: 'Game Nights',
      description: 'Board games, video games, and friendly competitions',
      participants: 123,
      upcomingEvents: 3,
      nextEvent: 'Friday 8PM',
      category: 'Social & Entertainment',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
      icon: Gamepad2
    },
  ];

  const categories = ['All', ...Array.from(new Set(allActivities.map(activity => activity.category)))];

  // Filter activities based on search term and category
  const filteredActivities = allActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || activity.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group activities by category for display
  const activitiesByCategory = filteredActivities.reduce((acc, activity) => {
    if (!acc[activity.category]) {
      acc[activity.category] = [];
    }
    acc[activity.category].push(activity);
    return acc;
  }, {} as Record<string, typeof allActivities>);

  const handleActivityClick = (activityId: string) => {
    navigate(`/activity/${activityId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl font-bold">All Activities & Events</h1>
                <p className="text-muted-foreground">Join communities and participate in exciting events</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto mb-6">
            <Input
              placeholder="Search activities or events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-center"
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "gradient-electric text-primary-foreground" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              Showing {filteredActivities.length} activities across {Object.keys(activitiesByCategory).length} categories
            </p>
          </div>
        </div>
      </section>

      {/* Activities by Category */}
      <section className="pb-12 px-4">
        <div className="container mx-auto">
          {Object.entries(activitiesByCategory).map(([category, activities]) => (
            <div key={category} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{category}</h2>
                <Badge variant="secondary" className="text-sm">
                  {activities.length} activities
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <Card 
                      key={activity.id}
                      className="group hover:shadow-lg transition-smooth cursor-pointer overflow-hidden border-border/50 hover:border-primary/20"
                      onClick={() => handleActivityClick(activity.id)}
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
                        <div className="absolute bottom-3 left-3">
                          <div className={`w-8 h-8 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center`}>
                            <IconComponent className="h-4 w-4 text-primary" />
                          </div>
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
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {activity.participants} members
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {activity.upcomingEvents} events
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Empty State */}
      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No activities found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search term or browse different categories
          </p>
          <Button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllActivities;