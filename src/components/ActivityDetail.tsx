import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, MapPin, Clock, Star, Crown, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import MessagesModal from './MessagesModal';

const ActivityDetail = () => {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  // Check for existing user on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('gta_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsSignedIn(true);
    }
  }, []);

  const handleMessageClick = (person: any) => {
    if (!user) {
      alert('Please sign in to send messages');
      return;
    }
    setSelectedPerson(person);
    setShowMessagesModal(true);
  };

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

  // Mock groups data for this activity - different groups per activity type
  const getGroupsForActivity = (activityId: string) => {
    switch (activityId) {
      case 'weekend-hiking':
        return [
          {
            id: 1,
            name: 'Morning Hikers Club',
            description: 'Early morning hiking adventures for fitness enthusiasts',
            members: 24,
            rating: 4.8,
            nextEvent: 'This Saturday 6:00 AM',
            location: 'Blue Ridge Trail',
            owner: {
              name: 'Priya Menon',
              title: 'Hiking Instructor',
              experience: '3 years',
              branch: 'Mechanical Engineering',
              year: '4th Year',
              bio: 'ME student at RNS Institute Of Tech, passionate about outdoor activities'
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
              name: 'Rajesh Kumar',
              title: 'Mountain Guide',
              experience: '4 years',
              branch: 'Civil Engineering',
              year: '3rd Year',
              bio: 'CE student at RNS Institute Of Tech, experienced in trekking and camping'
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
              name: 'Ananya Sharma',
              title: 'Professional Photographer',
              experience: '2 years',
              branch: 'Information Science',
              year: '4th Year',
              bio: 'ISE student at RNS Institute Of Tech, combining photography with hiking'
            },
            isPrivate: false,
            tags: ['Photography', 'Creative', 'Scenic']
          },
          {
            id: 4,
            name: 'Family Friendly Trails',
            description: 'Easy hiking trails perfect for families with children',
            members: 38,
            rating: 4.5,
            nextEvent: 'This Sunday 10:00 AM',
            location: 'Gentle Meadow Trail',
            owner: {
              name: 'Deepika Reddy',
              title: 'Family Coordinator',
              experience: '2 years',
              branch: 'Biotechnology',
              year: '2nd Year',
              bio: 'BT student at RNS Institute Of Tech, organizing family-friendly activities'
            },
            isPrivate: false,
            tags: ['Family', 'Easy', 'Kids Welcome']
          }
        ];

      case 'tech-meetup':
        return [
          {
            id: 1,
            name: 'React Developers Circle',
            description: 'Weekly discussions about React, hooks, and modern frontend development',
            members: 42,
            rating: 4.9,
            nextEvent: 'Thursday 7:00 PM',
            location: 'Tech Hub Conference Room A',
            owner: {
              name: 'Arjun Patel',
              title: 'Senior Frontend Developer',
              experience: '3 years',
              branch: 'Computer Science',
              year: '4th Year',
              bio: 'CSE student at RNS Institute Of Tech, React enthusiast'
            },
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
            owner: {
              name: 'Divya Krishnan',
              title: 'AI/ML Researcher',
              experience: '2 years',
              branch: 'Computer Science',
              year: '4th Year',
              bio: 'CSE student at RNS Institute Of Tech, specializing in AI and machine learning'
            },
            isPrivate: false,
            tags: ['AI', 'Machine Learning', 'Python']
          },
          {
            id: 3,
            name: 'Startup Founders Network',
            description: 'Connect with fellow entrepreneurs and discuss startup strategies',
            members: 28,
            rating: 4.7,
            nextEvent: 'Wednesday 8:00 PM',
            location: 'Innovation Center',
            owner: {
              name: 'Karthik Iyer',
              title: 'Startup Founder',
              experience: '1 year',
              branch: 'Information Science',
              year: '3rd Year',
              bio: 'ISE student at RNS Institute Of Tech, building tech startups'
            },
            isPrivate: true,
            tags: ['Entrepreneurship', 'Startups', 'Business']
          },
          {
            id: 4,
            name: 'Mobile Development Squad',
            description: 'iOS, Android, and cross-platform mobile app development',
            members: 31,
            rating: 4.6,
            nextEvent: 'Saturday 2:00 PM',
            location: 'Tech Cafe',
            owner: {
              name: 'Meera Nair',
              title: 'Mobile Developer',
              experience: '2 years',
              branch: 'Information Science',
              year: '4th Year',
              bio: 'ISE student at RNS Institute Of Tech, Flutter and React Native developer'
            },
            isPrivate: false,
            tags: ['iOS', 'Android', 'Flutter']
          },
          {
            id: 5,
            name: 'DevOps & Cloud Engineers',
            description: 'Infrastructure, deployment, and cloud computing discussions',
            members: 22,
            rating: 4.8,
            nextEvent: 'Tuesday 7:30 PM',
            location: 'Online (Zoom)',
            owner: {
              name: 'Rohan Desai',
              title: 'DevOps Engineer',
              experience: '2 years',
              branch: 'Computer Science',
              year: '3rd Year',
              bio: 'CSE student at RNS Institute Of Tech, cloud computing and DevOps specialist'
            },
            isPrivate: false,
            tags: ['DevOps', 'AWS', 'Docker']
          },
          {
            id: 6,
            name: 'Cybersecurity Experts',
            description: 'Security best practices, ethical hacking, and threat analysis',
            members: 19,
            rating: 4.9,
            nextEvent: 'Monday 8:00 PM',
            location: 'Security Lab',
            owner: {
              name: 'Sneha Reddy',
              title: 'Security Researcher',
              experience: '2 years',
              branch: 'Computer Science',
              year: '4th Year',
              bio: 'CSE student at RNS Institute Of Tech, passionate about cybersecurity'
            },
            isPrivate: true,
            tags: ['Security', 'Ethical Hacking', 'Privacy']
          }
        ];

      case 'study-groups':
        return [
          {
            id: 1,
            name: 'Calculus Study Circle',
            description: 'Advanced calculus problem solving and exam preparation',
            members: 26,
            rating: 4.7,
            nextEvent: 'Tomorrow 3:00 PM',
            location: 'Library Study Room 3',
            owner: {
              name: 'Aditya Rao',
              title: 'Mathematics Tutor',
              experience: '1 year',
              branch: 'Mathematics',
              year: '3rd Year',
              bio: 'Mathematics student at RNS Institute Of Tech, helping peers with calculus'
            },
            isPrivate: false,
            tags: ['Mathematics', 'Calculus', 'Exam Prep']
          },
          {
            id: 2,
            name: 'Organic Chemistry Lab',
            description: 'Collaborative learning for organic chemistry concepts and lab work',
            members: 18,
            rating: 4.8,
            nextEvent: 'Wednesday 5:00 PM',
            location: 'Chemistry Building 205',
            owner: {
              name: 'Shruti Kulkarni',
              title: 'Chemistry Lab Assistant',
              experience: '2 years',
              branch: 'Biotechnology',
              year: '4th Year',
              bio: 'BT student at RNS Institute Of Tech, specializing in organic chemistry'
            },
            isPrivate: false,
            tags: ['Chemistry', 'Lab Work', 'STEM']
          },
          {
            id: 3,
            name: 'Business Finance Group',
            description: 'Financial analysis, accounting principles, and business cases',
            members: 34,
            rating: 4.6,
            nextEvent: 'Thursday 4:00 PM',
            location: 'Business School 101',
            owner: {
              name: 'Vikram Singh',
              title: 'Business Student',
              experience: '1 year',
              branch: 'MBA',
              year: '2nd Year',
              bio: 'MBA student at RNS Institute Of Tech, interested in finance'
            },
            isPrivate: false,
            tags: ['Finance', 'Business', 'Accounting']
          },
          {
            id: 4,
            name: 'Psychology Research Team',
            description: 'Research methods, statistical analysis, and psychology theories',
            members: 22,
            rating: 4.9,
            nextEvent: 'Friday 2:00 PM',
            location: 'Psychology Lab',
            owner: {
              name: 'Kavya Menon',
              title: 'Psychology Researcher',
              experience: '2 years',
              branch: 'Psychology',
              year: '4th Year',
              bio: 'Psychology student at RNS Institute Of Tech, conducting research'
            },
            isPrivate: false,
            tags: ['Psychology', 'Research', 'Statistics']
          },
          {
            id: 5,
            name: 'Language Exchange Circle',
            description: 'Practice Spanish, French, German, and other languages',
            members: 41,
            rating: 4.5,
            nextEvent: 'Daily 6:00 PM',
            location: 'International Center',
            owner: {
              name: 'Elena Rodriguez',
              avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face',
              title: 'Linguistics Student',
              experience: '2 years'
            },
            isPrivate: false,
            tags: ['Languages', 'Cultural Exchange', 'Speaking']
          },
          {
            id: 6,
            name: 'Pre-Med Study Alliance',
            description: 'MCAT preparation, medical school applications, and science review',
            members: 29,
            rating: 4.8,
            nextEvent: 'Saturday 9:00 AM',
            location: 'Pre-Med Center',
            owner: {
              name: 'James Liu',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
              title: 'Pre-Med Advisor',
              experience: '5 years'
            },
            isPrivate: true,
            tags: ['Pre-Med', 'MCAT', 'Medical School']
          }
        ];

      default:
        return [];
    }
  };

  const groups = getGroupsForActivity(activityId!);

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
                          <AvatarFallback>{group.owner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{group.owner.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {group.owner.title} • {group.owner.experience}
                          </p>
                          {group.owner.bio && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {group.owner.branch} • {group.owner.year}
                            </p>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMessageClick(group.owner);
                          }}
                          className="hover:text-primary"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
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

      {/* Messages Modal */}
      {showMessagesModal && (
        <MessagesModal
          isOpen={showMessagesModal}
          onClose={() => {
            setShowMessagesModal(false);
            setSelectedPerson(null);
          }}
          currentUser={user}
        />
      )}
    </div>
  );
};

export default ActivityDetail;