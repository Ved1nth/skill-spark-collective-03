import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Mail, Users, Hash, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const SkillDetail = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();

  // Mock data - in a real app this would come from an API
  const skillData = {
    'web-development': {
      name: 'Web Development',
      description: 'Build amazing web applications and websites',
      totalMembers: 124,
      color: 'bg-blue-100 text-blue-600',
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
      color: 'bg-green-100 text-green-600',
    },
    'graphic-design': {
      name: 'Graphic Design',
      description: 'Design visual content and brand identities',
      totalMembers: 103,
      color: 'bg-orange-100 text-orange-600',
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

  // Mock communities data
  const communities = [
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
    },
  ];

  const handleContactPerson = (personName: string) => {
    alert(`Contact feature coming soon! For now, you can browse ${personName}'s profile freely.`);
  };

  const handleJoinCommunity = (communityTitle: string) => {
    alert(`Join feature coming soon! Sign up to participate in ${communityTitle}.`);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
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
                        onClick={() => handleContactPerson(person.name)}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleContactPerson(person.name)}
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