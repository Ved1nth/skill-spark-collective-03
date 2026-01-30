import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Mail, MapPin, Calendar, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import NebulaBackground from './NebulaBackground';
import MessagesModal from './MessagesModal';

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  department: string | null;
  academic_year: string | null;
  created_at: string;
}

interface Skill {
  id: string;
  title: string;
  description: string | null;
  category: string;
  experience: string | null;
  hourly_rate: string | null;
  availability: string | null;
}

interface Activity {
  id: string;
  title: string;
  description: string | null;
  category: string;
  date: string | null;
  time: string | null;
  venue: string | null;
}

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showMessagesModal, setShowMessagesModal] = useState(false);

  useEffect(() => {
    fetchUserData();
    checkCurrentUser();
  }, [userId]);

  const checkCurrentUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();
      
      setCurrentUser({ 
        id: session.user.id, 
        fullName: profile?.full_name || 'User' 
      });
    }
  };

  const fetchUserData = async () => {
    if (!userId) return;
    
    setLoading(true);
    
    // Fetch profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (profileError || !profileData) {
      console.error('Error fetching profile:', profileError);
      setLoading(false);
      return;
    }
    
    setProfile(profileData);
    
    // Fetch user's skills
    const { data: skillsData } = await supabase
      .from('skills')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    setSkills(skillsData || []);
    
    // Fetch user's activities
    const { data: activitiesData } = await supabase
      .from('activities')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    setActivities(activitiesData || []);
    setLoading(false);
  };

  const handleMessage = async () => {
    if (!currentUser) {
      toast.error('Please sign in to send messages');
      navigate('/auth');
      return;
    }
    
    if (currentUser.id === userId) {
      toast.error("You can't message yourself");
      return;
    }
    
    // Create an initial message to start the conversation
    const { error } = await supabase
      .from('messages')
      .insert({
        sender_id: currentUser.id,
        receiver_id: userId,
        content: `👋 Hi ${profile?.full_name?.split(' ')[0]}! I'd like to connect with you.`
      });
    
    if (error) {
      toast.error('Failed to start conversation');
      return;
    }
    
    toast.success('Conversation started! Opening messages...');
    setShowMessagesModal(true);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Graphics & Design': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Programming & Tech': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Digital Marketing': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'Writing & Translation': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Video & Animation': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Music & Audio': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Sports': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'Social': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      'Academic': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    };
    return colors[category] || 'bg-muted text-muted-foreground border-border';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-foreground">User not found</h1>
          <Button onClick={() => navigate('/')} className="plasma-button text-primary-foreground">
            Go back home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <NebulaBackground />
      
      {/* Header */}
      <header className="glass-header sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="text-foreground hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            
            {currentUser && currentUser.id !== userId && (
              <Button 
                onClick={handleMessage}
                className="plasma-button text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Profile Header */}
        <Card className="crystal-card mb-8">
          <CardContent className="pt-8 pb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-3xl md:text-4xl">
                  {getInitials(profile.full_name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {profile.full_name}
                </h1>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3 text-muted-foreground mb-4">
                  {profile.department && (
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      <span className="text-sm">{profile.department}</span>
                    </div>
                  )}
                  {profile.academic_year && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{profile.academic_year}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{profile.email}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    {skills.length} Skills
                  </Badge>
                  <Badge variant="outline" className="border-accent/30 text-accent">
                    {activities.length} Activities
                  </Badge>
                </div>
              </div>
              
              {currentUser && currentUser.id !== userId && (
                <div className="flex gap-2">
                  <Button 
                    onClick={handleMessage}
                    className="plasma-button text-primary-foreground"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Skills & Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <Card 
                  key={skill.id} 
                  className="crystal-card hover:border-primary/30 transition-all cursor-pointer"
                  onClick={() => navigate(`/skill/${skill.id}`)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-foreground">{skill.title}</CardTitle>
                      <Badge className={getCategoryColor(skill.category)}>
                        {skill.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {skill.description || 'No description provided'}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {skill.experience && (
                        <Badge variant="outline" className="border-border">
                          {skill.experience}
                        </Badge>
                      )}
                      {skill.hourly_rate && (
                        <Badge variant="outline" className="border-border">
                          ₹{skill.hourly_rate}/hr
                        </Badge>
                      )}
                      {skill.availability && (
                        <Badge variant="outline" className="border-border">
                          {skill.availability}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Activities Section */}
        {activities.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Activities & Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activities.map((activity) => (
                <Card 
                  key={activity.id} 
                  className="crystal-card hover:border-accent/30 transition-all cursor-pointer"
                  onClick={() => navigate(`/activity/${activity.id}`)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-foreground">{activity.title}</CardTitle>
                      <Badge className={getCategoryColor(activity.category)}>
                        {activity.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {activity.description || 'No description provided'}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {activity.date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {activity.date}
                        </div>
                      )}
                      {activity.time && (
                        <span>at {activity.time}</span>
                      )}
                      {activity.venue && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {activity.venue}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {skills.length === 0 && activities.length === 0 && (
          <Card className="crystal-card">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                This user hasn't added any skills or activities yet.
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      <MessagesModal 
        isOpen={showMessagesModal} 
        onClose={() => setShowMessagesModal(false)}
        currentUser={currentUser}
      />
    </div>
  );
};

export default UserProfile;
