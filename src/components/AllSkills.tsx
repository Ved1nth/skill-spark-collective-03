import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Code, Camera, Music, Palette, PenTool, Video, Mic, Briefcase, Smartphone, Globe, FileText, TrendingUp, BookOpen, Megaphone, DollarSign, Languages, Calculator, Paintbrush, Headphones, Database, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';

const AllSkills = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [userSkills, setUserSkills] = useState<any[]>([]);

  // Load user-generated skills from localStorage
  useEffect(() => {
    const savedSkills = localStorage.getItem('user_skills');
    if (savedSkills) {
      setUserSkills(JSON.parse(savedSkills));
    }
  }, []);

  // Comprehensive skills list with Fiverr-like services
  const allSkills = [
    // Programming & Tech
    { id: 'web-development', name: 'Web Development', icon: Code, count: 124, color: 'bg-blue-100 text-blue-600', category: 'Programming & Tech' },
    { id: 'mobile-apps', name: 'Mobile App Development', icon: Smartphone, count: 87, color: 'bg-cyan-100 text-cyan-600', category: 'Programming & Tech' },
    { id: 'database-design', name: 'Database Design', icon: Database, count: 56, color: 'bg-slate-100 text-slate-600', category: 'Programming & Tech' },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: Shield, count: 43, color: 'bg-red-100 text-red-600', category: 'Programming & Tech' },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: Zap, count: 71, color: 'bg-violet-100 text-violet-600', category: 'Programming & Tech' },

    // Graphics & Design
    { id: 'graphic-design', name: 'Graphic Design', icon: Palette, count: 103, color: 'bg-orange-100 text-orange-600', category: 'Graphics & Design' },
    { id: 'logo-design', name: 'Logo Design', icon: Paintbrush, count: 94, color: 'bg-pink-100 text-pink-600', category: 'Graphics & Design' },
    { id: 'ui-ux', name: 'UI/UX Design', icon: Smartphone, count: 112, color: 'bg-teal-100 text-teal-600', category: 'Graphics & Design' },
    { id: 'photography', name: 'Photography', icon: Camera, count: 89, color: 'bg-purple-100 text-purple-600', category: 'Graphics & Design' },

    // Writing & Translation
    { id: 'writing-services', name: 'Writing & Assignments', icon: PenTool, count: 156, color: 'bg-green-100 text-green-600', category: 'Writing & Translation' },
    { id: 'content-writing', name: 'Content Writing', icon: FileText, count: 134, color: 'bg-blue-100 text-blue-600', category: 'Writing & Translation' },
    { id: 'copywriting', name: 'Copywriting', icon: Megaphone, count: 78, color: 'bg-yellow-100 text-yellow-600', category: 'Writing & Translation' },
    { id: 'translation', name: 'Translation Services', icon: Languages, count: 65, color: 'bg-indigo-100 text-indigo-600', category: 'Writing & Translation' },
    { id: 'proofreading', name: 'Proofreading & Editing', icon: BookOpen, count: 92, color: 'bg-emerald-100 text-emerald-600', category: 'Writing & Translation' },

    // Video & Animation
    { id: 'video-editing', name: 'Video Editing', icon: Video, count: 78, color: 'bg-red-100 text-red-600', category: 'Video & Animation' },
    { id: 'animation', name: 'Animation', icon: Video, count: 54, color: 'bg-orange-100 text-orange-600', category: 'Video & Animation' },
    { id: 'video-production', name: 'Video Production', icon: Camera, count: 67, color: 'bg-purple-100 text-purple-600', category: 'Video & Animation' },

    // Music & Audio
    { id: 'music-production', name: 'Music Production', icon: Music, count: 67, color: 'bg-indigo-100 text-indigo-600', category: 'Music & Audio' },
    { id: 'voice-over', name: 'Voice Over', icon: Mic, count: 45, color: 'bg-yellow-100 text-yellow-600', category: 'Music & Audio' },
    { id: 'audio-editing', name: 'Audio Editing', icon: Headphones, count: 38, color: 'bg-green-100 text-green-600', category: 'Music & Audio' },
    { id: 'podcast-editing', name: 'Podcast Editing', icon: Mic, count: 29, color: 'bg-blue-100 text-blue-600', category: 'Music & Audio' },

    // Digital Marketing
    { id: 'digital-marketing', name: 'Digital Marketing', icon: TrendingUp, count: 92, color: 'bg-pink-100 text-pink-600', category: 'Digital Marketing' },
    { id: 'social-media', name: 'Social Media Marketing', icon: Globe, count: 118, color: 'bg-cyan-100 text-cyan-600', category: 'Digital Marketing' },
    { id: 'seo', name: 'SEO Services', icon: TrendingUp, count: 85, color: 'bg-green-100 text-green-600', category: 'Digital Marketing' },
    { id: 'ppc-advertising', name: 'PPC Advertising', icon: DollarSign, count: 63, color: 'bg-yellow-100 text-yellow-600', category: 'Digital Marketing' },

    // Business
    { id: 'business-consulting', name: 'Business Consulting', icon: Briefcase, count: 74, color: 'bg-slate-100 text-slate-600', category: 'Business' },
    { id: 'financial-planning', name: 'Financial Planning', icon: Calculator, count: 52, color: 'bg-emerald-100 text-emerald-600', category: 'Business' },
    { id: 'project-management', name: 'Project Management', icon: Briefcase, count: 68, color: 'bg-blue-100 text-blue-600', category: 'Business' },
  ];

  // Merge user-generated skills with base skills
  const convertedUserSkills = userSkills.map((skill, index) => ({
    id: `user-${skill.id || index}`,
    name: skill.name,
    icon: Code,
    count: 1,
    color: 'bg-green-100 text-green-600',
    category: skill.category || 'User Skills'
  }));

  const allSkillsWithUser = [...allSkills, ...convertedUserSkills];

  // Filter skills based on search term
  const filteredSkills = allSkillsWithUser.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group skills by category
  const skillsByCategory = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof allSkills>);

  const handleSkillClick = (skillId: string) => {
    navigate(`/skill/${skillId}`);
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
                <h1 className="text-2xl font-bold">All Skills & Services</h1>
                <p className="text-muted-foreground">Browse all available skills and find the perfect talent</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto mb-8">
            <Input
              placeholder="Search skills or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-center"
            />
          </div>
          
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              Showing {filteredSkills.length} skills across {Object.keys(skillsByCategory).length} categories
            </p>
          </div>
        </div>
      </section>

      {/* Skills by Category */}
      <section className="pb-12 px-4">
        <div className="container mx-auto">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{category}</h2>
                <Badge variant="secondary" className="text-sm">
                  {skills.length} skills
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {skills.map((skill) => {
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
          ))}
        </div>
      </section>

      {/* Empty State */}
      {filteredSkills.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No skills found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search term or browse all categories
          </p>
          <Button onClick={() => setSearchTerm('')}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllSkills;