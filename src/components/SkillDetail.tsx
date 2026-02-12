import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Mail, Users, Hash, Calendar, MapPin, Star, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import NebulaBackground from './NebulaBackground';
import MessagesModal from './MessagesModal';

const SkillDetail = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [dbSkill, setDbSkill] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<any[]>([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchSkillData();
  }, [skillId]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();
      setCurrentUser({ id: session.user.id, fullName: profile?.full_name || 'User' });
    }
  };

  const fetchSkillData = async () => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (skillId && uuidRegex.test(skillId)) {
      const { data } = await supabase
        .from('skills')
        .select('*')
        .eq('id', skillId)
        .maybeSingle();

      if (data) {
        // Get owner profile
        const { data: ownerProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', data.user_id)
          .maybeSingle();
        setDbSkill({ ...data, owner: ownerProfile });

        // Load reviews
        loadReviews(skillId);
        // Check bookmark
        checkBookmark(skillId);
      }
    }
    setLoading(false);
  };

  const loadReviews = async (targetId: string) => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('target_id', targetId)
      .eq('target_type', 'skill')
      .order('created_at', { ascending: false });

    if (data && data.length > 0) {
      const userIds = [...new Set(data.map(r => r.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name, avatar_url')
        .in('user_id', userIds);
      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);
      setReviews(data.map(r => ({ ...r, profile: profileMap.get(r.user_id) })));
    } else {
      setReviews([]);
    }
  };

  const checkBookmark = async (targetId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const { data } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('target_id', targetId)
      .eq('target_type', 'skill')
      .maybeSingle();
    setIsBookmarked(!!data);
  };

  const toggleBookmark = async () => {
    if (!currentUser || !skillId) {
      toast.error('Please sign in to bookmark');
      return;
    }
    if (isBookmarked) {
      await supabase.from('bookmarks').delete()
        .eq('user_id', currentUser.id)
        .eq('target_id', skillId)
        .eq('target_type', 'skill');
      setIsBookmarked(false);
      toast.success('Bookmark removed');
    } else {
      await supabase.from('bookmarks').insert({
        user_id: currentUser.id,
        target_id: skillId,
        target_type: 'skill',
      });
      setIsBookmarked(true);
      toast.success('Bookmarked!');
    }
  };

  const submitReview = async () => {
    if (!currentUser || !skillId) {
      toast.error('Please sign in to leave a review');
      return;
    }
    setSubmittingReview(true);
    const { error } = await supabase.from('reviews').insert({
      user_id: currentUser.id,
      target_id: skillId,
      target_type: 'skill',
      rating: newRating,
      comment: newComment.trim() || null,
    });
    if (error) {
      toast.error(error.message.includes('duplicate') ? 'You already reviewed this skill' : 'Failed to submit review');
    } else {
      toast.success('Review submitted!');
      setNewComment('');
      setNewRating(5);
      loadReviews(skillId);
    }
    setSubmittingReview(false);
  };

  const handleContactPerson = (person: any) => {
    if (!currentUser) {
      toast.error('Please sign in to send messages');
      navigate('/auth');
      return;
    }
    setShowMessagesModal(true);
  };

  const handleJoinCommunity = async (communityTitle: string) => {
    if (!currentUser) {
      toast.error('Please sign in to join communities');
      navigate('/auth');
      return;
    }
    toast.success(`Joined ${communityTitle}! Check your messages.`);
  };

  // Mock data for base skills
  const skillData: Record<string, any> = {
    'web-development': { name: 'Web Development', description: 'Build amazing web applications and websites', totalMembers: 124 },
    'graphic-design': { name: 'Graphic Design', description: 'Design visual content and brand identities', totalMembers: 103 },
    'writing-services': { name: 'Writing & Assignments', description: 'Academic writing, essays, research papers and assignments', totalMembers: 156 },
    'video-editing': { name: 'Video Editing', description: 'Professional video editing and post-production services', totalMembers: 78 },
    'digital-marketing': { name: 'Digital Marketing', description: 'Social media marketing, SEO, and online advertising', totalMembers: 92 },
    'photography': { name: 'Photography', description: 'Capture moments and create visual stories', totalMembers: 89 },
    'music-production': { name: 'Music Production', description: 'Create and produce music across all genres', totalMembers: 67 },
    'voice-over': { name: 'Voice Over', description: 'Professional voice acting and narration services', totalMembers: 45 },
  };

  const baseSkill = skillId ? skillData[skillId] : null;
  const skill = dbSkill ? {
    name: dbSkill.title,
    description: dbSkill.description || 'No description provided',
    totalMembers: 1,
    isDbSkill: true,
  } : baseSkill;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <NebulaBackground />
        <div className="relative z-10">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading skill...</p>
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <NebulaBackground />
        <div className="text-center relative z-10">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Skill not found</h1>
          <Button onClick={() => navigate('/')} className="plasma-button text-primary-foreground">Go back home</Button>
        </div>
      </div>
    );
  }

  // Mock people for base skills
  const people = [
    { id: 1, name: 'Arjun Sharma', bio: 'CSE student passionate about full-stack development', skills: ['React', 'Node.js', 'TypeScript'], year: '3rd Year', branch: 'Computer Science' },
    { id: 2, name: 'Priya Patel', bio: 'ISE student specializing in frontend development and UI/UX', skills: ['React', 'CSS', 'Figma'], year: '4th Year', branch: 'Information Science' },
    { id: 3, name: 'Rohan Kumar', bio: 'CSE student building scalable backend systems', skills: ['Python', 'Django', 'PostgreSQL'], year: '2nd Year', branch: 'Computer Science' },
  ];

  const communities = [
    { id: 1, title: 'General Discussion', description: 'Open discussion about this skill', members: 20, posts: 50, lastActivity: '1 hour ago' },
  ];

  const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  return (
    <div className="min-h-screen bg-background relative">
      <NebulaBackground />

      <header className="glass-header sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="text-foreground/70 hover:text-foreground hover:bg-primary/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{skill.name}</h1>
                <p className="text-muted-foreground text-sm">{skill.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {dbSkill && (
                <Button variant="ghost" size="sm" onClick={toggleBookmark} className="text-muted-foreground hover:text-primary">
                  {isBookmarked ? <BookmarkCheck className="h-5 w-5 text-primary" /> : <Bookmark className="h-5 w-5" />}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* DB Skill Owner Card */}
        {dbSkill?.owner && (
          <Card className="crystal-card mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-primary/30">
                  <AvatarImage src={dbSkill.owner.avatar_url} />
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {dbSkill.owner.full_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p
                    className="font-semibold text-foreground hover:text-primary cursor-pointer"
                    onClick={() => navigate(`/user/${dbSkill.user_id}`)}
                  >
                    {dbSkill.owner.full_name}
                  </p>
                  <p className="text-sm text-muted-foreground">{dbSkill.owner.department} • {dbSkill.owner.academic_year}</p>
                  {dbSkill.experience && <Badge variant="outline" className="mt-1 text-xs border-border">{dbSkill.experience}</Badge>}
                </div>
                <div className="flex gap-2">
                  {dbSkill.hourly_rate && <Badge className="bg-accent/20 text-accent border-accent/30">₹{dbSkill.hourly_rate}/hr</Badge>}
                  {dbSkill.availability && <Badge variant="outline" className="border-border">{dbSkill.availability}</Badge>}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reviews Section for DB skills */}
        {dbSkill && (
          <Card className="crystal-card mb-6">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Star className="h-5 w-5 text-accent" />
                Reviews {reviews.length > 0 && `(${avgRating.toFixed(1)} avg)`}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Write review */}
              {currentUser && currentUser.id !== dbSkill.user_id && (
                <div className="p-4 bg-muted/30 rounded-lg space-y-3">
                  <p className="text-sm font-medium text-foreground">Leave a review</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} onClick={() => setNewRating(star)}>
                        <Star className={`h-5 w-5 ${star <= newRating ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
                      </button>
                    ))}
                  </div>
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your review..."
                    className="bg-background border-border"
                  />
                  <Button onClick={submitReview} disabled={submittingReview} size="sm" className="plasma-button text-primary-foreground">
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </div>
              )}

              {/* Review list */}
              {reviews.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-4">No reviews yet. Be the first!</p>
              ) : (
                reviews.map(review => (
                  <div key={review.id} className="flex gap-3 p-3 rounded-lg bg-muted/20">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={review.profile?.avatar_url} />
                      <AvatarFallback className="bg-primary/20 text-primary text-xs">
                        {review.profile?.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{review.profile?.full_name || 'Anonymous'}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} className={`h-3 w-3 ${s <= review.rating ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
                          ))}
                        </div>
                      </div>
                      {review.comment && <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        )}

        {/* Tabs for base skills */}
        {!dbSkill && (
          <Tabs defaultValue="people" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="people"><Users className="h-4 w-4 mr-2" />People ({skill.totalMembers})</TabsTrigger>
              <TabsTrigger value="communities"><Hash className="h-4 w-4 mr-2" />Communities</TabsTrigger>
            </TabsList>

            <TabsContent value="people" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {people.map((person) => (
                  <Card key={person.id} className="crystal-card hover:scale-[1.01] transition-all">
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                            {person.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg text-foreground">{person.name}</CardTitle>
                            <Badge variant="secondary">{person.year}</Badge>
                          </div>
                          <CardDescription className="mt-1">{person.bio}</CardDescription>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {person.skills.map((s) => (
                              <Badge key={s} variant="outline" className="text-xs border-border">{s}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button size="sm" variant="outline" onClick={() => handleContactPerson(person)} className="border-primary/30 text-primary">
                        <MessageCircle className="h-4 w-4 mr-2" />Message
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="communities" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {communities.map((community) => (
                  <Card key={community.id} className="crystal-card">
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground">{community.title}</CardTitle>
                      <CardDescription>{community.description}</CardDescription>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-3">
                        <div className="flex items-center"><Users className="h-4 w-4 mr-1" />{community.members} members</div>
                        <div className="flex items-center"><MessageCircle className="h-4 w-4 mr-1" />{community.posts} posts</div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center"><Calendar className="h-4 w-4 mr-1" />Last: {community.lastActivity}</span>
                        <Button size="sm" onClick={() => handleJoinCommunity(community.title)} className="plasma-button text-primary-foreground">Join</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>

      <MessagesModal isOpen={showMessagesModal} onClose={() => setShowMessagesModal(false)} currentUser={currentUser} />
    </div>
  );
};

export default SkillDetail;
