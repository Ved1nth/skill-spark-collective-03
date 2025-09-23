import { Search, Users, Calendar, Zap, Code, Camera, Music, Palette, PenTool, Video, Mic, Briefcase, Smartphone, Globe, FileText, TrendingUp, Moon, Sun, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SignInModal from './SignInModal';
import MessagesModal from './MessagesModal';

const Home = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const skills = [
    { id: 'web-development', name: 'Web Development', icon: Code, count: 124, color: 'bg-blue-100 text-blue-600' },
    { id: 'graphic-design', name: 'Graphic Design', icon: Palette, count: 103, color: 'bg-orange-100 text-orange-600' },
    { id: 'writing-services', name: 'Writing & Assignments', icon: PenTool, count: 156, color: 'bg-green-100 text-green-600' },
    { id: 'video-editing', name: 'Video Editing', icon: Video, count: 78, color: 'bg-red-100 text-red-600' },
    { id: 'digital-marketing', name: 'Digital Marketing', icon: TrendingUp, count: 92, color: 'bg-pink-100 text-pink-600' },
    { id: 'photography', name: 'Photography', icon: Camera, count: 89, color: 'bg-purple-100 text-purple-600' },
    { id: 'music-production', name: 'Music Production', icon: Music, count: 67, color: 'bg-indigo-100 text-indigo-600' },
    { id: 'voice-over', name: 'Voice Over', icon: Mic, count: 45, color: 'bg-yellow-100 text-yellow-600' },
  ];

  const activities = [
    {
      id: 'weekend-hiking',
      title: 'Weekend Hiking',
      description: 'Explore nature trails with fellow outdoor enthusiasts',
      participants: 23,
      nextEvent: 'This Saturday',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop'
    },
    {
      id: 'tech-meetup',
      title: 'Tech Meetup',
      description: 'Weekly discussions about latest in technology',
      participants: 45,
      nextEvent: 'Thursday 7PM',
      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop'
    },
    {
      id: 'study-groups',
      title: 'Study Groups',
      description: 'Collaborative learning sessions across subjects',
      participants: 78,
      nextEvent: 'Tomorrow 3PM',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop'
    },
  ];

  const scrollToSkills = () => {
    const skillsSection = document.getElementById('skills-section');
    skillsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToActivities = () => {
    const activitiesSection = document.getElementById('activities-section');
    activitiesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSignIn = () => {
    console.log('Sign In clicked - opening sign-in modal');
    setShowSignInModal(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('gta_user');
    setUser(null);
    console.log('User signed out');
  };

  const handleUserSignIn = (userData: any) => {
    setUser(userData);
    console.log('User signed in:', userData);
  };

  const handleGetStarted = () => {
    console.log('Get Started clicked - would open sign-up modal');
    // For now, just show an alert - later this would open a sign-up modal  
    alert('Sign-up feature coming soon! Continue exploring to see what we offer.');
  };

  const handleFindTalent = () => {
    console.log('Find Talent clicked - scrolling to skills');
    scrollToSkills();
  };

  const handleBrowseActivities = () => {
    console.log('Browse Activities clicked - scrolling to activities');
    scrollToActivities();
  };

  const handleSkillClick = (skillId: string) => {
    console.log('Skill clicked:', skillId);
    navigate(`/skill/${skillId}`);
  };

  const handleActivityClick = (activityId: string) => {
    console.log('Activity clicked:', activityId);
    navigate(`/activity/${activityId}`);
  };

  const handleViewAllSkills = () => {
    console.log('View All Skills clicked');
    navigate('/skills');
  };

  const handleExploreAll = () => {
    console.log('Explore All clicked');
    navigate('/activities');
  };

  const handleStartConnecting = () => {
    console.log('Start Connecting clicked - would show sign-up prompt');
    alert('Ready to connect? Sign up to start messaging talented students and joining activities!');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Apply theme on component mount and when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Check for existing user on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('gta_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Update unread message count
  useEffect(() => {
    if (user) {
      const updateUnreadCount = () => {
        const allMessages = JSON.parse(localStorage.getItem('gta_messages') || '[]');
        const unread = allMessages.filter((message: any) => 
          message.receiverId === user.id && !message.read
        ).length;
        setUnreadCount(unread);
      };

      updateUnreadCount();
      // Check for new messages every 5 seconds
      const interval = setInterval(updateUnreadCount, 5000);
      return () => clearInterval(interval);
    }
  }, [user]);

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
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-primary"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              
              {user ? (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMessagesModal(true)}
                    className="text-muted-foreground hover:text-primary relative"
                    aria-label="Messages"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {unreadCount > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                      >
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </Badge>
                    )}
                  </Button>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Welcome, </span>
                    <span className="font-medium">{user.fullName.split(' ')[0]}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-muted-foreground hover:text-primary"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-muted-foreground hover:text-primary"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="gradient-electric text-primary-foreground hover:opacity-90 electric-glow"
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        {/* Animated Background Graphics */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Skill Icons */}
          <div className="absolute top-20 left-10 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center animate-float-slow">
            <Code className="h-6 w-6 text-primary/60" />
          </div>
          <div className="absolute top-32 right-20 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center animate-float-delayed">
            <Camera className="h-5 w-5 text-purple-500" />
          </div>
          <div className="absolute bottom-32 left-20 w-14 h-14 rounded-full bg-green-100 flex items-center justify-center animate-float-reverse">
            <PenTool className="h-7 w-7 text-green-500" />
          </div>
          <div className="absolute top-40 right-40 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center animate-float-slow">
            <Palette className="h-4 w-4 text-orange-500" />
          </div>
          <div className="absolute bottom-40 right-16 w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center animate-float-delayed">
            <Video className="h-5 w-5 text-blue-500" />
          </div>
          <div className="absolute top-60 left-32 w-9 h-9 rounded-full bg-yellow-100 flex items-center justify-center animate-float-reverse">
            <Mic className="h-4 w-4 text-yellow-500" />
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Animated connection lines */}
            <path
              d="M100,80 Q200,120 300,100 T500,90"
              stroke="url(#connectionGradient)"
              strokeWidth="2"
              fill="none"
              className="animate-draw-line"
            />
            <path
              d="M150,200 Q250,160 400,180 T600,170"
              stroke="url(#connectionGradient)"
              strokeWidth="1.5"
              fill="none"
              className="animate-draw-line-delayed"
            />
            <path
              d="M80,300 Q180,260 280,280 T480,270"
              stroke="url(#connectionGradient)"
              strokeWidth="1"
              fill="none"
              className="animate-draw-line-reverse"
            />
          </svg>

          {/* Floating Particles */}
          <div className="absolute top-24 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-pulse-float"></div>
          <div className="absolute bottom-32 right-1/3 w-1.5 h-1.5 bg-purple-400/50 rounded-full animate-pulse-float-delayed"></div>
          <div className="absolute top-48 right-1/4 w-3 h-3 bg-green-400/30 rounded-full animate-pulse-float-reverse"></div>
          <div className="absolute bottom-48 left-1/3 w-2.5 h-2.5 bg-orange-400/40 rounded-full animate-pulse-float"></div>
          <div className="absolute top-36 left-2/3 w-1 h-1 bg-blue-400/60 rounded-full animate-pulse-float-delayed"></div>

          {/* Gradient Orbs */}
          <div className="absolute top-16 right-12 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-xl animate-blob"></div>
          <div className="absolute bottom-20 left-16 w-40 h-40 bg-gradient-to-br from-purple-400/15 to-pink-400/10 rounded-full blur-2xl animate-blob-delayed"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-green-400/20 to-blue-400/10 rounded-full blur-xl animate-blob-reverse"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6 gradient-electric bg-clip-text text-transparent">
            Connect Through Skills
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover talented students, join exciting activities, and build meaningful connections 
            based on shared interests and complementary skills.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button 
              size="lg" 
              className="gradient-electric text-primary-foreground electric-glow"
              onClick={handleFindTalent}
            >
              <Users className="mr-2 h-5 w-5" />
              Find Talent
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/20 hover:bg-primary/5"
              onClick={handleBrowseActivities}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Browse Activities
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills-section" className="py-12 px-4 bg-background/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">Skills and Service</h3>
            <Button 
              variant="ghost" 
              className="text-primary hover:bg-primary/10"
              onClick={handleViewAllSkills}
            >
              View All Skills →
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <Card 
                  key={skill.id} 
                  className="group hover:shadow-lg transition-smooth cursor-pointer border-border/50 hover:border-primary/20"
                  onClick={() => handleSkillClick(skill.id)}
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
      <section id="activities-section" className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">Activity and Events</h3>
            <Button 
              variant="ghost" 
              className="text-primary hover:bg-primary/10"
              onClick={handleExploreAll}
            >
              Explore All →
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
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
          <Button 
            size="lg" 
            className="gradient-electric text-primary-foreground electric-glow"
            onClick={handleStartConnecting}
          >
            Start Connecting Today
          </Button>
        </div>
      </section>

      {/* Sign In Modal */}
      <SignInModal 
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        onSignIn={handleUserSignIn}
      />

      {/* Messages Modal */}
      <MessagesModal 
        isOpen={showMessagesModal}
        onClose={() => setShowMessagesModal(false)}
        currentUser={user}
      />
    </div>
  );
};

export default Home;