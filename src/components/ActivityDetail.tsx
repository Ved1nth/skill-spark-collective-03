import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, MapPin, Clock, Star, Crown, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const ActivityDetail = () => {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false); // Mock auth state

  // Mock data - in a real app this would come from an API
  const activityData = {
    'weekend-hiking': {
      title: 'Weekend Hiking',
      description: 'Explore nature trails with fellow outdoor enthusiasts across beautiful locations',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=400&fit=crop',
      totalParticipants: 156,
      upcomingEvents: 3,
    },
    'tech-meetup': {
      title: 'Tech Meetup',
      description: 'Weekly discussions about latest in technology, coding, and innovation',
      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=400&fit=crop',
      totalParticipants: 89,
      upcomingEvents: 2,
    },
    'study-groups': {
      title: 'Study Groups',
      description: 'Collaborative learning sessions across various subjects and disciplines',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
      totalParticipants: 234,
      upcomingEvents: 5,
    },
  };

  const activity = activityData[activityId as keyof typeof activityData];

  if (!activity) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Activity not found</h1>
          <Button onClick={() => navigate('/')}>Go back home</Button>
        </div>
      </div>
    );
  }

  // Mock groups data for this activity
  const groups = [
    {
      id: 1,
      name: 'Morning Hikers Club',
      description: 'Early morning hiking adventures for fitness enthusiasts',
      members: 24,
      rating: 4.8,
      nextEvent: 'This Saturday 6:00 AM',
      location: 'Blue Ridge Trail',
      owner: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9fc8aa4?w=100&h=100&fit=crop&crop=face',
        title: 'Hiking Instructor',
        experience: '5 years'
      },
      isPrivate: false,
      tags: ['Beginner Friendly', 'Fitness', 'Nature']
    },
    {
      id: 2,
      name: 'Adventure Seekers',
      description: 'Challenging trails and overnight camping experiences',
      members: 18,
      rating: 4.9,
      nextEvent: 'Next Weekend',
      location: 'Mountain Peak Trail',
      owner: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        title: 'Mountain Guide',
        experience: '8 years'
      },
      isPrivate: false,
      tags: ['Advanced', 'Camping', 'Challenge']
    },
    {
      id: 3,
      name: 'Nature Photography Hikers',
      description: 'Combine hiking with landscape and wildlife photography',
      members: 31,
      rating: 4.7,
      nextEvent: 'Sunday 7:00 AM',
      location: 'Scenic Valley',
      owner: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        title: 'Professional Photographer',
        experience: '6 years'
      },
      isPrivate: false,
      tags: ['Photography', 'Creative', 'Scenic']
    },
    {
      id: 4,
      name: 'University Hiking Society',
      description: 'Weekly hikes for university students and alumni',
      members: 45,
      rating: 4.6,
      nextEvent: 'Friday 4:00 PM',
      location: 'Campus Trail',
      owner: {
        name: 'Alex Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        title: 'Student Leader',
        experience: '3 years'
      },
      isPrivate: false,
      tags: ['Students', 'Social', 'Weekly']
    },
    {
      id: 5,
      name: 'Weekend Warriors',
      description: 'Intensive weekend hiking expeditions for experienced hikers',
      members: 12,
      rating: 5.0,
      nextEvent: 'Next Saturday',
      location: 'Rocky Ridge',
      owner: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        title: 'Expedition Leader',
        experience: '10 years'
      },
      isPrivate: true,
      tags: ['Expert', 'Intensive', 'Exclusive']
    },
    {
      id: 6,
      name: 'Family Friendly Trails',
      description: 'Easy hiking trails perfect for families with children',
      members: 38,
      rating: 4.5,
      nextEvent: 'This Sunday 10:00 AM',
      location: 'Gentle Meadow Trail',
      owner: {
        name: 'Lisa Park',
        avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face',
        title: 'Family Coordinator',
        experience: '4 years'
      },
      isPrivate: false,
      tags: ['Family', 'Easy', 'Kids Welcome']
    },
  ];

  const handleJoinGroup = (group: typeof groups[0]) => {
    if (!isSignedIn) {
      alert('Please sign in to join groups and participate in activities!');
      return;
    }
    alert(`Joined ${group.name}! You'll receive notifications about upcoming events.`);
  };

  const handleViewGroupDetails = (group: typeof groups[0]) => {
    // In a real app, this would open a detailed modal or navigate to group page
    const details = `
Group: ${group.name}
Owner: ${group.owner.name} (${group.owner.title})
Experience: ${group.owner.experience}
Members: ${group.members}
Rating: ${group.rating}/5.0
Next Event: ${group.nextEvent}
Location: ${group.location}
Description: ${group.description}
    `;
    alert(details);
  };

  const handleSignIn = () => {
    // Mock sign in - in real app this would open sign-in modal
    setIsSignedIn(true);
    alert('Signed in successfully! You can now join groups.');
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
                <h1 className="text-2xl font-bold">{activity.title}</h1>
                <p className="text-muted-foreground">{activity.description}</p>
              </div>
            </div>
            
            {!isSignedIn && (
              <Button onClick={handleSignIn} className="gradient-electric text-primary-foreground">
                Sign In to Join
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="h-64 bg-gradient-to-r from-primary/10 to-primary/5 overflow-hidden">
          <img 
            src={activity.image} 
            alt={activity.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span className="font-semibold">{activity.totalParticipants} Total Members</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span className="font-semibold">{activity.upcomingEvents} Upcoming Events</span>
            </div>
          </div>
        </div>
      </section>

      {/* Groups Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Available Groups</h2>
            <div className="text-sm text-muted-foreground">
              {isSignedIn ? '✅ Signed in - You can join groups' : '⚠️ Sign in required to join groups'}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {groups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-smooth">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        {group.isPrivate && (
                          <Badge variant="secondary" className="text-xs">
                            <Crown className="h-3 w-3 mr-1" />
                            Private
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="mb-3">
                        {group.description}
                      </CardDescription>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {group.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Group Stats */}
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {group.members} members
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                          {group.rating}
                        </div>
                      </div>

                      {/* Next Event Info */}
                      <div className="bg-primary/5 rounded-lg p-3 mb-3">
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          <span className="font-medium">Next: {group.nextEvent}</span>
                        </div>
                        <div className="flex items-center text-sm mt-1">
                          <MapPin className="h-4 w-4 mr-2 text-primary" />
                          <span>{group.location}</span>
                        </div>
                      </div>

                      {/* Owner Info */}
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={group.owner.avatar} alt={group.owner.name} />
                          <AvatarFallback>{group.owner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{group.owner.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {group.owner.title} • {group.owner.experience}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex space-x-2">
                    <Button 
                      size="sm"
                      onClick={() => handleJoinGroup(group)}
                      disabled={!isSignedIn}
                      className={isSignedIn ? "gradient-electric text-primary-foreground" : ""}
                    >
                      {isSignedIn ? 'Join Group' : 'Sign In to Join'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewGroupDetails(group)}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActivityDetail;