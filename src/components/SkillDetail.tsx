import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Mail, Users, Hash, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const SkillDetail = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - in a real app this would come from an API
  const skillData = {
    'web-development': {
      name: 'Web Development',
      description: 'Build amazing web applications and websites',
      totalMembers: 124,
      color: 'bg-blue-100 text-blue-600',
    },
    'graphic-design': {
      name: 'Graphic Design',
      description: 'Design visual content and brand identities',
      totalMembers: 103,
      color: 'bg-orange-100 text-orange-600',
    },
    'writing-services': {
      name: 'Writing & Assignments',
      description: 'Academic writing, essays, research papers and assignments',
      totalMembers: 156,
      color: 'bg-green-100 text-green-600',
    },
    'video-editing': {
      name: 'Video Editing',
      description: 'Professional video editing and post-production services',
      totalMembers: 78,
      color: 'bg-red-100 text-red-600',
    },
    'digital-marketing': {
      name: 'Digital Marketing',
      description: 'Social media marketing, SEO, and online advertising',
      totalMembers: 92,
      color: 'bg-pink-100 text-pink-600',
    },
    'photography': {
      name: 'Photography',
      description: 'Capture moments and create visual stories',
      totalMembers: 89,
      color: 'bg-purple-100 text-purple-600',
    },
    'music-production': {
      name: 'Music Production',
      description: 'Create and produce music across all genres',
      totalMembers: 67,
      color: 'bg-indigo-100 text-indigo-600',
    },
    'voice-over': {
      name: 'Voice Over',
      description: 'Professional voice acting and narration services',
      totalMembers: 45,
      color: 'bg-yellow-100 text-yellow-600',
    },
  };

  const skill = skillData[skillId as keyof typeof skillData];

  if (!skill) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Skill not found</h1>
          <Button onClick={() => navigate('/')}>Go back home</Button>
        </div>
      </div>
    );
  }

  // Mock people data
  const people = [
    {
      id: 1,
      name: 'Alex Johnson',
      bio: 'Full-stack developer with 3 years experience',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      skills: ['React', 'Node.js', 'TypeScript'],
      year: 'Junior'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      bio: 'Frontend specialist passionate about UX',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9fc8aa4?w=100&h=100&fit=crop&crop=face',
      skills: ['React', 'CSS', 'Figma'],
      year: 'Senior'
    },
    {
      id: 3,
      name: 'Mike Rodriguez',
      bio: 'Backend engineer and API architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      skills: ['Python', 'Django', 'PostgreSQL'],
      year: 'Graduate'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      bio: 'DevOps and cloud infrastructure expert',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      skills: ['AWS', 'Docker', 'Kubernetes'],
      year: 'Senior'
    },
  ];

  // Mock communities data for this skill - different communities per skill type
  const getCommunitiesForSkill = (skillId: string) => {
    switch (skillId) {
      case 'web-development':
        return [
          {
            id: 1,
            title: 'React Developers Hub',
            description: 'Discussion and help for React developers',
            members: 45,
            posts: 234,
            lastActivity: '2 hours ago'
          },
          {
            id: 2,
            title: 'Full-Stack Projects',
            description: 'Share and collaborate on full-stack projects',
            members: 32,
            posts: 156,
            lastActivity: '5 hours ago'
          },
          {
            id: 3,
            title: 'Web Dev Career Tips',
            description: 'Career guidance and industry insights',
            members: 67,
            posts: 89,
            lastActivity: '1 day ago'
          },
          {
            id: 4,
            title: 'Code Review Circle',
            description: 'Get feedback on your code and projects',
            members: 28,
            posts: 178,
            lastActivity: '3 hours ago'
          }
        ];

      case 'video-editing':
        return [
          {
            id: 1,
            title: 'Adobe Premiere Pro Masters',
            description: 'Advanced techniques and tips for Premiere Pro editing',
            members: 38,
            posts: 145,
            lastActivity: '1 hour ago'
          },
          {
            id: 2,
            title: 'DaVinci Resolve Community',
            description: 'Color grading and editing with DaVinci Resolve',
            members: 42,
            posts: 198,
            lastActivity: '3 hours ago'
          },
          {
            id: 3,
            title: 'Motion Graphics & Effects',
            description: 'After Effects, animations, and visual effects',
            members: 29,
            posts: 87,
            lastActivity: '2 hours ago'
          },
          {
            id: 4,
            title: 'YouTuber Editors Network',
            description: 'Community for YouTube content creators and editors',
            members: 56,
            posts: 234,
            lastActivity: '30 minutes ago'
          }
        ];

      case 'graphic-design':
        return [
          {
            id: 1,
            title: 'Photoshop Professionals',
            description: 'Advanced Photoshop techniques and tutorials',
            members: 52,
            posts: 167,
            lastActivity: '45 minutes ago'
          },
          {
            id: 2,
            title: 'Illustrator Artists',
            description: 'Vector art, logos, and illustration community',
            members: 34,
            posts: 123,
            lastActivity: '2 hours ago'
          },
          {
            id: 3,
            title: 'Brand Identity Designers',
            description: 'Logo design, branding, and corporate identity',
            members: 41,
            posts: 98,
            lastActivity: '4 hours ago'
          },
          {
            id: 4,
            title: 'Freelance Design Network',
            description: 'Tips for freelance designers and client management',
            members: 63,
            posts: 201,
            lastActivity: '1 hour ago'
          }
        ];

      case 'writing-services':
        return [
          {
            id: 1,
            title: 'Academic Writing Hub',
            description: 'Research papers, essays, and academic assignments',
            members: 78,
            posts: 312,
            lastActivity: '20 minutes ago'
          },
          {
            id: 2,
            title: 'Creative Writers Circle',
            description: 'Fiction, poetry, and creative writing community',
            members: 45,
            posts: 189,
            lastActivity: '1 hour ago'
          },
          {
            id: 3,
            title: 'Content Marketing Writers',
            description: 'Blog posts, articles, and marketing content',
            members: 62,
            posts: 245,
            lastActivity: '2 hours ago'
          },
          {
            id: 4,
            title: 'Proofreading & Editing',
            description: 'Grammar, style, and editing support community',
            members: 39,
            posts: 156,
            lastActivity: '3 hours ago'
          }
        ];

      case 'digital-marketing':
        return [
          {
            id: 1,
            title: 'Social Media Strategists',
            description: 'Instagram, TikTok, and social media marketing',
            members: 67,
            posts: 234,
            lastActivity: '15 minutes ago'
          },
          {
            id: 2,
            title: 'SEO & Content Marketing',
            description: 'Search engine optimization and content strategy',
            members: 43,
            posts: 178,
            lastActivity: '1 hour ago'
          },
          {
            id: 3,
            title: 'Google Ads & PPC',
            description: 'Paid advertising and campaign optimization',
            members: 31,
            posts: 124,
            lastActivity: '2 hours ago'
          },
          {
            id: 4,
            title: 'Email Marketing Masters',
            description: 'Email campaigns, automation, and newsletters',
            members: 28,
            posts: 98,
            lastActivity: '4 hours ago'
          }
        ];

      case 'photography':
        return [
          {
            id: 1,
            title: 'Portrait Photography',
            description: 'Portrait techniques, lighting, and posing',
            members: 54,
            posts: 198,
            lastActivity: '30 minutes ago'
          },
          {
            id: 2,
            title: 'Landscape & Nature',
            description: 'Outdoor photography and nature shots',
            members: 46,
            posts: 167,
            lastActivity: '2 hours ago'
          },
          {
            id: 3,
            title: 'Wedding Photographers',
            description: 'Event photography and wedding coverage',
            members: 38,
            posts: 134,
            lastActivity: '1 hour ago'
          },
          {
            id: 4,
            title: 'Photo Editing & Lightroom',
            description: 'Post-processing and photo editing techniques',
            members: 61,
            posts: 223,
            lastActivity: '45 minutes ago'
          }
        ];

      case 'music-production':
        return [
          {
            id: 1,
            title: 'FL Studio Producers',
            description: 'Beat making and music production in FL Studio',
            members: 49,
            posts: 187,
            lastActivity: '1 hour ago'
          },
          {
            id: 2,
            title: 'Ableton Live Community',
            description: 'Electronic music production and live performance',
            members: 36,
            posts: 145,
            lastActivity: '2 hours ago'
          },
          {
            id: 3,
            title: 'Hip-Hop Producers',
            description: 'Rap beats, sampling, and hip-hop production',
            members: 42,
            posts: 201,
            lastActivity: '30 minutes ago'
          },
          {
            id: 4,
            title: 'Audio Mixing & Mastering',
            description: 'Professional mixing and mastering techniques',
            members: 33,
            posts: 112,
            lastActivity: '3 hours ago'
          }
        ];

      case 'voice-over':
        return [
          {
            id: 1,
            title: 'Voice Acting Network',
            description: 'Character voices and animation voice work',
            members: 27,
            posts: 89,
            lastActivity: '2 hours ago'
          },
          {
            id: 2,
            title: 'Commercial Voice Over',
            description: 'Advertising, commercials, and promotional content',
            members: 34,
            posts: 123,
            lastActivity: '1 hour ago'
          },
          {
            id: 3,
            title: 'Audiobook Narrators',
            description: 'Long-form narration and audiobook production',
            members: 19,
            posts: 67,
            lastActivity: '4 hours ago'
          },
          {
            id: 4,
            title: 'Home Studio Setup',
            description: 'Recording equipment and studio acoustics',
            members: 25,
            posts: 98,
            lastActivity: '3 hours ago'
          }
        ];

      default:
        return [
          {
            id: 1,
            title: 'General Discussion',
            description: 'Open discussion about this skill',
            members: 20,
            posts: 50,
            lastActivity: '1 hour ago'
          }
        ];
    }
  };

  const communities = getCommunitiesForSkill(skillId!);

  const handleContactPerson = (person: typeof people[0], contactType: 'message' | 'email') => {
    const currentUser = JSON.parse(localStorage.getItem('gta_user') || 'null');
    
    if (!currentUser) {
      toast({
        title: "Sign in required",
        description: "Please sign in to contact other students.",
        variant: "destructive",
      });
      return;
    }

    if (contactType === 'message') {
      // Create a new message conversation
      const conversationId = [currentUser.id, person.id.toString()].sort().join('-');
      const allMessages = JSON.parse(localStorage.getItem('gta_messages') || '[]');
      
      // Check if conversation already exists
      const existingMessage = allMessages.find((msg: any) => msg.conversationId === conversationId);
      
      if (!existingMessage) {
        // Create initial system message
        const initialMessage = {
          id: Date.now().toString(),
          conversationId,
          senderId: 'system',
          senderName: 'System',
          receiverId: currentUser.id,
          receiverName: currentUser.fullName,
          content: `You can now message ${person.name}. Start a conversation!`,
          timestamp: new Date().toISOString(),
          read: false
        };
        
        allMessages.push(initialMessage);
        localStorage.setItem('gta_messages', JSON.stringify(allMessages));
      }

      toast({
        title: "Conversation started!",
        description: `You can now message ${person.name}. Check your messages.`,
      });
    } else {
      toast({
        title: "Email feature",
        description: `Would open email client to contact ${person.name} at their RNSIT email.`,
      });
    }
  };

  const handleJoinCommunity = (communityTitle: string) => {
    const currentUser = JSON.parse(localStorage.getItem('gta_user') || 'null');
    
    if (!currentUser) {
      toast({
        title: "Sign in required",
        description: "Please sign in to join communities.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Joined community!",
      description: `You've successfully joined ${communityTitle}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
            <div className="flex items-center space-x-3 md:space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1 md:mr-2" />
                <span className="text-sm md:text-base">Back to Home</span>
              </Button>
            </div>
            <div className="md:hidden">
              <h1 className="text-xl font-bold">{skill.name}</h1>
              <p className="text-sm text-muted-foreground">{skill.description}</p>
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold">{skill.name}</h1>
              <p className="text-muted-foreground">{skill.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="people" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="people">
              <Users className="h-4 w-4 mr-2" />
              People ({skill.totalMembers})
            </TabsTrigger>
            <TabsTrigger value="communities">
              <Hash className="h-4 w-4 mr-2" />
              Communities
            </TabsTrigger>
          </TabsList>

          {/* People Tab */}
          <TabsContent value="people" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {people.map((person) => (
                <Card key={person.id} className="hover:shadow-lg transition-smooth">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={person.avatar} alt={person.name} />
                        <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{person.name}</CardTitle>
                          <Badge variant="secondary">{person.year}</Badge>
                        </div>
                        <CardDescription className="mt-1">
                          {person.bio}
                        </CardDescription>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {person.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleContactPerson(person, 'message')}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleContactPerson(person, 'email')}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Communities Tab */}
          <TabsContent value="communities" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {communities.map((community) => (
                <Card key={community.id} className="hover:shadow-lg transition-smooth">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{community.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {community.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-3">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {community.members} members
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {community.posts} posts
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        Last activity: {community.lastActivity}
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleJoinCommunity(community.title)}
                      >
                        Join Community
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SkillDetail;