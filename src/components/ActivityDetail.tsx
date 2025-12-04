import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, MapPin, Clock, Star, Crown, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import MessagesModal from './MessagesModal';
import NebulaBackground from './NebulaBackground';

const ActivityDetail = () => {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [dbActivity, setDbActivity] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Check auth and fetch activity
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setIsSignedIn(true);
      }
    };
    checkAuth();
    fetchActivity();
  }, [activityId]);

  const fetchActivity = async () => {
    // First check if it's a UUID (database activity)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (activityId && uuidRegex.test(activityId)) {
      const { data, error } = await supabase
        .from('activities')
        .select('*, profiles(full_name, department, academic_year)')
        .eq('id', activityId)
        .single();
      
      if (data) {
        setDbActivity(data);
      }
    }
    setLoading(false);
  };

  const handleMessageClick = (person: any) => {
    if (!user) {
      alert('Please sign in to send messages');
      return;
    }
    setSelectedPerson(person);
    setShowMessagesModal(true);
  };

  // Hardcoded activity data for base activities
  const activityData: Record<string, any> = {
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

  // Determine which activity to show
  const baseActivity = activityId ? activityData[activityId] : null;
  const activity = dbActivity ? {
    title: dbActivity.title,
    description: dbActivity.description || 'No description provided',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
    totalParticipants: dbActivity.max_participants || 0,
    upcomingEvents: 1,
    isUserActivity: true,
    owner: dbActivity.profiles,
    date: dbActivity.date,
    time: dbActivity.time,
    venue: dbActivity.venue,
    requirements: dbActivity.requirements,
  } : baseActivity;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <NebulaBackground />
        <div className="relative z-10 text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading activity...</p>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center relative">
        <NebulaBackground />
        <div className="text-center relative z-10">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Activity not found</h1>
          <p className="text-muted-foreground mb-4">This activity may have been removed or doesn't exist.</p>
          <Button onClick={() => navigate('/')} className="plasma-button text-primary-foreground">
            Go back home
          </Button>
        </div>
      </div>
    );
  }

  // Groups data for base activities
  const getGroupsForActivity = (activityId: string) => {
    const groupsMap: Record<string, any[]> = {
      'weekend-hiking': [
        {
          id: 1,
          name: 'Morning Hikers Club',
          description: 'Early morning hiking adventures for fitness enthusiasts',
          members: 24,
          rating: 4.8,
          nextEvent: 'This Saturday 6:00 AM',
          location: 'Blue Ridge Trail',
          owner: { name: 'Priya Menon', title: 'Hiking Instructor', branch: 'Mechanical Engineering', year: '4th Year' },
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
          owner: { name: 'Rajesh Kumar', title: 'Mountain Guide', branch: 'Civil Engineering', year: '3rd Year' },
          isPrivate: false,
          tags: ['Advanced', 'Camping', 'Challenge']
        },
      ],
      'tech-meetup': [
        {
          id: 1,
          name: 'React Developers Circle',
          description: 'Weekly discussions about React, hooks, and modern frontend development',
          members: 42,
          rating: 4.9,
          nextEvent: 'Thursday 7:00 PM',
          location: 'Tech Hub Conference Room A',
          owner: { name: 'Arjun Patel', title: 'Senior Frontend Developer', branch: 'Computer Science', year: '4th Year' },
          isPrivate: false,
          tags: ['React', 'Frontend', 'JavaScript']
        },
        {
          id: 2,
          name: 'AI & Machine Learning Group',
          description: 'Exploring artificial intelligence, ML algorithms, and data science',
          members: 35,
          rating: 4.8,
          nextEvent: 'Friday 6:30 PM',
          location: 'University Lab 201',
          owner: { name: 'Divya Krishnan', title: 'AI/ML Researcher', branch: 'Computer Science', year: '4th Year' },
          isPrivate: false,
          tags: ['AI', 'Machine Learning', 'Python']
        },
      ],
      'study-groups': [
        {
          id: 1,
          name: 'Calculus Study Circle',
          description: 'Advanced calculus problem solving and exam preparation',
          members: 26,
          rating: 4.7,
          nextEvent: 'Tomorrow 3:00 PM',
          location: 'Library Study Room 3',
          owner: { name: 'Aditya Rao', title: 'Mathematics Tutor', branch: 'Mathematics', year: '3rd Year' },
          isPrivate: false,
          tags: ['Mathematics', 'Calculus', 'Exam Prep']
        },
      ],
    };
    return groupsMap[activityId] || [];
  };

  const groups = dbActivity ? [] : getGroupsForActivity(activityId!);

  const handleJoinGroup = (group: any) => {
    if (!isSignedIn) {
      navigate('/auth');
      return;
    }
    alert(`Joined ${group.name}! You'll receive notifications about upcoming events.`);
  };

  const handleSignIn = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background relative">
      <NebulaBackground />
      
      {/* Header */}
      <header className="glass-header sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-foreground/70 hover:text-foreground hover:bg-primary/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {activity.title}
                </h1>
                <p className="text-muted-foreground text-sm">{activity.description}</p>
              </div>
            </div>
            
            {!isSignedIn && (
              <Button onClick={handleSignIn} className="plasma-button text-primary-foreground">
                Sign In to Join
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10">
        <div className="h-64 overflow-hidden relative">
          <img 
            src={activity.image} 
            alt={activity.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        <div className="absolute bottom-4 left-4 text-foreground">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-semibold">{activity.totalParticipants} Total Members</span>
            </div>
            <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <Calendar className="h-5 w-5 text-accent" />
              <span className="font-semibold">{activity.upcomingEvents} Upcoming Events</span>
            </div>
          </div>
        </div>
      </section>

      {/* User Activity Details */}
      {activity.isUserActivity && (
        <section className="py-8 px-4 relative z-10">
          <div className="container mx-auto">
            <Card className="crystal-card">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Crown className="h-5 w-5 text-primary" />
                  Activity Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activity.owner && (
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-primary/30">
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {activity.owner.full_name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">Organized by {activity.owner.full_name}</p>
                        <p className="text-sm text-muted-foreground">{activity.owner.department} • {activity.owner.academic_year}</p>
                      </div>
                    </div>
                  )}
                  {activity.date && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{activity.date}</span>
                    </div>
                  )}
                  {activity.time && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4 text-accent" />
                      <span>{activity.time}</span>
                    </div>
                  )}
                  {activity.venue && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{activity.venue}</span>
                    </div>
                  )}
                </div>
                {activity.requirements && (
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Requirements:</span> {activity.requirements}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Groups Section */}
      {groups.length > 0 && (
        <section className="py-8 px-4 relative z-10">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Join a Group
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <Card key={group.id} className="crystal-card group hover:scale-[1.02] transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-foreground flex items-center gap-2">
                          {group.name}
                          {group.isPrivate && (
                            <Badge variant="outline" className="text-xs border-accent/30 text-accent">
                              Private
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">{group.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-primary">
                        <Star className="h-4 w-4 fill-primary" />
                        <span>{group.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {group.tags.map((tag: string) => (
                        <Badge key={tag} className="bg-primary/20 text-primary/90 border-primary/30 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                      <Avatar className="h-8 w-8 border border-primary/30">
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          {group.owner.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium text-foreground">{group.owner.name}</p>
                        <p className="text-muted-foreground text-xs">{group.owner.branch} • {group.owner.year}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{group.members} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{group.nextEvent}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        className="flex-1 plasma-button text-primary-foreground"
                        onClick={() => handleJoinGroup(group)}
                      >
                        Join Group
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="border-primary/30 text-primary hover:bg-primary/10"
                        onClick={() => handleMessageClick(group.owner)}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Messages Modal */}
      <MessagesModal 
        isOpen={showMessagesModal}
        onClose={() => setShowMessagesModal(false)}
        currentUser={user}
      />
    </div>
  );
};

export default ActivityDetail;