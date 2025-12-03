import { Search, Users, Calendar, Zap, Code, Camera, Music, Palette, PenTool, Video, Mic, Briefcase, Smartphone, Globe, FileText, TrendingUp, Moon, Sun, MessageCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import MessagesModal from './MessagesModal';
import AddSkillModal from './AddSkillModal';
import AddActivityModal from './AddActivityModal';
import { toast } from 'sonner';

const Home = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [dbSkills, setDbSkills] = useState<any[]>([]);
  const [dbActivities, setDbActivities] = useState<any[]>([]);
  
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

  // Auth state management
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(() => {
          fetchProfile(session.user.id);
        }, 0);
      } else {
        setProfile(null);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    setProfile(data);
  };

  // Fetch skills and activities from database
  useEffect(() => {
    fetchDbSkills();
    fetchDbActivities();
  }, []);

  const fetchDbSkills = async () => {
    const { data } = await supabase
      .from('skills')
      .select('*, profiles(full_name)')
      .order('created_at', { ascending: false })
      .limit(8);
    if (data) setDbSkills(data);
  };

  const fetchDbActivities = async () => {
    const { data } = await supabase
      .from('activities')
      .select('*, profiles(full_name)')
      .order('created_at', { ascending: false })
      .limit(6);
    if (data) setDbActivities(data);
  };

  const scrollToSkills = () => {
    const skillsSection = document.getElementById('skills-section');
    skillsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToActivities = () => {
    const activitiesSection = document.getElementById('activities-section');
    activitiesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSignIn = () => {
    navigate('/auth');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    toast.success('Signed out successfully');
  };

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleFindTalent = () => {
    scrollToSkills();
  };

  const handleBrowseActivities = () => {
    scrollToActivities();
  };

  const handleSkillClick = (skillId: string) => {
    navigate(`/skill/${skillId}`);
  };

  const handleActivityClick = (activityId: string) => {
    navigate(`/activity/${activityId}`);
  };

  const handleViewAllSkills = () => {
    navigate('/skills');
  };

  const handleExploreAll = () => {
    navigate('/activities');
  };

  const handleStartConnecting = () => {
    if (!user) {
      navigate('/auth');
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      
      const skillMatch = skills.find(skill => 
        skill.name.toLowerCase().includes(lowerSearch)
      );
      if (skillMatch) {
        navigate(`/skill/${skillMatch.id}`);
        setSearchTerm('');
        return;
      }
      
      const activityMatch = activities.find(activity => 
        activity.title.toLowerCase().includes(lowerSearch)
      );
      if (activityMatch) {
        navigate(`/activity/${activityMatch.id}`);
        setSearchTerm('');
        return;
      }
      
      navigate('/skills');
      setSearchTerm('');
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const userName = profile?.full_name || user?.user_metadata?.full_name || 'User';

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 md:h-8 md:w-8 text-primary electric-pulse" />
              <h1 className="text-xl md:text-2xl font-bold">
                <span className="text-primary">GTA</span>
              </h1>
            </div>
            
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search skills, activities, or people..." 
                  className="pl-10 border-border/50 focus:ring-primary/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </div>
            </div>

            <div className="flex items-center space-x-1 md:space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-primary p-2"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              
              {user ? (
                <div className="flex items-center space-x-1 md:space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMessagesModal(true)}
                    className="text-muted-foreground hover:text-primary relative p-2"
                    aria-label="Messages"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {unreadCount > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center"
                      >
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </Badge>
                    )}
                  </Button>
                  <div className="hidden md:block text-sm">
                    <span className="text-muted-foreground">Welcome, </span>
                    <span className="font-medium">{userName.split(' ')[0]}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-muted-foreground hover:text-primary"
                    onClick={handleSignOut}
                  >
                    <span className="hidden md:inline">Sign Out</span>
                    <span className="md:hidden">Out</span>
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-muted-foreground hover:text-primary"
                    onClick={handleSignIn}
                  >
                    <span className="hidden md:inline">Sign In</span>
                    <span className="md:hidden">In</span>
                  </Button>
                  <Button 
                    size="sm"
                    className="gradient-electric text-primary-foreground hover:opacity-90 electric-glow"
                    onClick={handleGetStarted}
                  >
                    <span className="hidden md:inline">Get Started</span>
                    <span className="md:hidden">Start</span>
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="md:hidden mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search skills, activities, or people..." 
                className="pl-10 border-border/50 focus:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 md:py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="hidden md:block absolute top-20 left-10 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center animate-float-slow">
            <Code className="h-6 w-6 text-primary/60" />
          </div>
          <div className="absolute top-16 md:top-32 right-4 md:right-20 w-8 md:w-10 h-8 md:h-10 rounded-full bg-purple-100 flex items-center justify-center animate-float-delayed">
            <Camera className="h-4 md:h-5 w-4 md:w-5 text-purple-500" />
          </div>
          <div className="hidden md:block absolute bottom-32 left-20 w-14 h-14 rounded-full bg-green-100 flex items-center justify-center animate-float-reverse">
            <PenTool className="h-7 w-7 text-green-500" />
          </div>
          <div className="absolute top-24 md:top-40 right-8 md:right-40 w-6 md:w-8 h-6 md:h-8 rounded-full bg-orange-100 flex items-center justify-center animate-float-slow">
            <Palette className="h-3 md:h-4 w-3 md:w-4 text-orange-500" />
          </div>
          <div className="absolute bottom-20 md:bottom-40 right-6 md:right-16 w-9 md:w-11 h-9 md:h-11 rounded-full bg-blue-100 flex items-center justify-center animate-float-delayed">
            <Video className="h-4 md:h-5 w-4 md:w-5 text-blue-500" />
          </div>
          <div className="hidden md:block absolute top-60 left-32 w-9 h-9 rounded-full bg-yellow-100 flex items-center justify-center animate-float-reverse">
            <Mic className="h-4 w-4 text-yellow-500" />
          </div>

          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            <path
              d="M100,80 Q200,120 300,100 T500,90"
              stroke="url(#connectionGradient)"
              strokeWidth="2"
              fill="none"
              className="hidden md:block animate-draw-line"
            />
            <path
              d="M150,200 Q250,160 400,180 T600,170"
              stroke="url(#connectionGradient)"
              strokeWidth="1.5"
              fill="none"
              className="hidden md:block animate-draw-line-delayed"
            />
          </svg>

          <div className="hidden md:block absolute top-24 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-pulse-float"></div>
          <div className="absolute bottom-16 md:bottom-32 right-1/4 md:right-1/3 w-1.5 h-1.5 bg-purple-400/50 rounded-full animate-pulse-float-delayed"></div>
          <div className="hidden md:block absolute top-48 right-1/4 w-3 h-3 bg-green-400/30 rounded-full animate-pulse-float-reverse"></div>

          <div className="absolute top-8 md:top-16 right-4 md:right-12 w-16 md:w-32 h-16 md:h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-xl animate-blob"></div>
          <div className="absolute bottom-8 md:bottom-20 left-4 md:left-16 w-20 md:w-40 h-20 md:h-40 bg-gradient-to-br from-purple-400/15 to-pink-400/10 rounded-full blur-2xl animate-blob-delayed"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 gradient-electric bg-clip-text text-transparent">
            Connect Through Skills
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Discover talented students, join exciting activities, and build meaningful connections 
            based on shared interests and complementary skills.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4">
            <Button 
              size="lg" 
              className="gradient-electric text-primary-foreground electric-glow w-full sm:w-auto"
              onClick={handleFindTalent}
            >
              <Users className="mr-2 h-5 w-5" />
              Find Talent
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/20 hover:bg-primary/5 w-full sm:w-auto"
              onClick={handleBrowseActivities}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Browse Activities
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills-section" className="py-8 md:py-12 px-4 bg-background/50">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 space-y-2 sm:space-y-0">
            <h3 className="text-2xl md:text-3xl font-bold">Skills and Service</h3>
            <div className="flex items-center gap-2">
              {user && (
                <Button 
                  size="sm"
                  className="gradient-electric text-primary-foreground"
                  onClick={() => setShowAddSkillModal(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Your Skill
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm"
                className="text-primary hover:bg-primary/10"
                onClick={handleViewAllSkills}
              >
                View All →
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {skills.slice(0, 8).map((skill) => {
              const IconComponent = skill.icon;
              return (
                <Card 
                  key={skill.id} 
                  className="group hover:shadow-lg transition-smooth cursor-pointer border-border/50 hover:border-primary/20"
                  onClick={() => handleSkillClick(skill.id)}
                >
                  <CardHeader className="pb-2 md:pb-3">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${skill.color} flex items-center justify-center mb-2 md:mb-3 group-hover:scale-110 transition-smooth`}>
                      <IconComponent className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <CardTitle className="text-base md:text-lg">{skill.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {skill.count} talented students
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* User-added skills from database */}
          {dbSkills.length > 0 && (
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4">Recently Added by Students</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {dbSkills.slice(0, 4).map((skill) => (
                  <Card 
                    key={skill.id} 
                    className="group hover:shadow-lg transition-smooth cursor-pointer border-border/50 hover:border-primary/20"
                  >
                    <CardHeader className="pb-2 md:pb-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2 md:mb-3">
                        <Code className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                      </div>
                      <CardTitle className="text-base md:text-lg">{skill.title}</CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {skill.description}
                      </CardDescription>
                      <Badge variant="secondary" className="w-fit mt-2">
                        {skill.category}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        by {skill.profiles?.full_name || 'Anonymous'}
                      </p>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities-section" className="py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 space-y-2 sm:space-y-0">
            <h3 className="text-2xl md:text-3xl font-bold">Activity and Events</h3>
            <div className="flex items-center gap-2">
              {user && (
                <Button 
                  size="sm"
                  className="gradient-electric text-primary-foreground"
                  onClick={() => setShowAddActivityModal(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Activity
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm"
                className="text-primary hover:bg-primary/10"
                onClick={handleExploreAll}
              >
                Explore All →
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {activities.map((activity) => (
              <Card 
                key={activity.id} 
                className="group hover:shadow-lg transition-smooth cursor-pointer overflow-hidden border-border/50 hover:border-primary/20"
                onClick={() => handleActivityClick(activity.id)}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">{activity.title}</CardTitle>
                  <CardDescription className="text-sm">{activity.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="flex items-center text-muted-foreground">
                      <Users className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                      {activity.participants} joined
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {activity.nextEvent}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* User-added activities from database */}
          {dbActivities.length > 0 && (
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4">Recently Added Events</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dbActivities.slice(0, 3).map((activity) => (
                  <Card 
                    key={activity.id} 
                    className="group hover:shadow-lg transition-smooth cursor-pointer border-border/50 hover:border-primary/20"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{activity.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{activity.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 text-sm">
                        <Badge variant="secondary">{activity.category}</Badge>
                        <p className="text-muted-foreground">
                          📅 {activity.date} at {activity.time}
                        </p>
                        <p className="text-muted-foreground">
                          📍 {activity.venue}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Organized by {activity.profiles?.full_name || 'Anonymous'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-12 md:py-16 px-4 bg-background/50">
          <div className="container mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Connect?</h3>
            <p className="text-muted-foreground mb-6 md:mb-8 max-w-xl mx-auto">
              Join thousands of students who are already building meaningful connections through shared skills and interests.
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
      )}

      {/* Modals */}
      <MessagesModal 
        isOpen={showMessagesModal} 
        onClose={() => setShowMessagesModal(false)}
        currentUser={user ? { id: user.id, fullName: userName } : null}
      />
      
      <AddSkillModal 
        isOpen={showAddSkillModal} 
        onClose={() => setShowAddSkillModal(false)}
        onSkillAdded={fetchDbSkills}
      />
      
      <AddActivityModal 
        isOpen={showAddActivityModal} 
        onClose={() => setShowAddActivityModal(false)}
        onActivityAdded={fetchDbActivities}
      />
    </div>
  );
};

export default Home;
