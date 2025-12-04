import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Code, Camera, Music, Palette, PenTool, Video, Mic, Briefcase, Smartphone, Globe, FileText, TrendingUp, BookOpen, Megaphone, DollarSign, Languages, Calculator, Paintbrush, Headphones, Database, Shield, Zap, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import NebulaBackground from './NebulaBackground';

const categoryIcons: Record<string, any> = {
  'Programming & Tech': Code,
  'Graphics & Design': Palette,
  'Writing & Translation': PenTool,
  'Video & Animation': Video,
  'Music & Audio': Music,
  'Digital Marketing': TrendingUp,
  'Business': Briefcase,
};

const AllSkills = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [dbSkills, setDbSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch skills from database
  useEffect(() => {
    fetchDbSkills();
  }, []);

  const fetchDbSkills = async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*, profiles(full_name)')
      .order('created_at', { ascending: false });
    
    if (data) setDbSkills(data);
    setLoading(false);
  };

  // Base skills list
  const baseSkills = [
    { id: 'web-development', name: 'Web Development', icon: Code, count: 124, color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30', category: 'Programming & Tech' },
    { id: 'mobile-apps', name: 'Mobile App Development', icon: Smartphone, count: 87, color: 'from-cyan-500/20 to-teal-500/20 border-cyan-500/30', category: 'Programming & Tech' },
    { id: 'database-design', name: 'Database Design', icon: Database, count: 56, color: 'from-slate-500/20 to-gray-500/20 border-slate-500/30', category: 'Programming & Tech' },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: Shield, count: 43, color: 'from-red-500/20 to-orange-500/20 border-red-500/30', category: 'Programming & Tech' },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: Zap, count: 71, color: 'from-violet-500/20 to-purple-500/20 border-violet-500/30', category: 'Programming & Tech' },
    { id: 'graphic-design', name: 'Graphic Design', icon: Palette, count: 103, color: 'from-orange-500/20 to-amber-500/20 border-orange-500/30', category: 'Graphics & Design' },
    { id: 'logo-design', name: 'Logo Design', icon: Paintbrush, count: 94, color: 'from-pink-500/20 to-rose-500/20 border-pink-500/30', category: 'Graphics & Design' },
    { id: 'ui-ux', name: 'UI/UX Design', icon: Smartphone, count: 112, color: 'from-teal-500/20 to-emerald-500/20 border-teal-500/30', category: 'Graphics & Design' },
    { id: 'photography', name: 'Photography', icon: Camera, count: 89, color: 'from-purple-500/20 to-violet-500/20 border-purple-500/30', category: 'Graphics & Design' },
    { id: 'writing-services', name: 'Writing & Assignments', icon: PenTool, count: 156, color: 'from-green-500/20 to-emerald-500/20 border-green-500/30', category: 'Writing & Translation' },
    { id: 'content-writing', name: 'Content Writing', icon: FileText, count: 134, color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30', category: 'Writing & Translation' },
    { id: 'translation', name: 'Translation Services', icon: Languages, count: 65, color: 'from-indigo-500/20 to-violet-500/20 border-indigo-500/30', category: 'Writing & Translation' },
    { id: 'video-editing', name: 'Video Editing', icon: Video, count: 78, color: 'from-red-500/20 to-pink-500/20 border-red-500/30', category: 'Video & Animation' },
    { id: 'music-production', name: 'Music Production', icon: Music, count: 67, color: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30', category: 'Music & Audio' },
    { id: 'voice-over', name: 'Voice Over', icon: Mic, count: 45, color: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30', category: 'Music & Audio' },
    { id: 'digital-marketing', name: 'Digital Marketing', icon: TrendingUp, count: 92, color: 'from-pink-500/20 to-fuchsia-500/20 border-pink-500/30', category: 'Digital Marketing' },
    { id: 'social-media', name: 'Social Media Marketing', icon: Globe, count: 118, color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30', category: 'Digital Marketing' },
    { id: 'business-consulting', name: 'Business Consulting', icon: Briefcase, count: 74, color: 'from-slate-500/20 to-zinc-500/20 border-slate-500/30', category: 'Business' },
  ];

  // Convert DB skills to display format and merge with base skills
  const convertedDbSkills = dbSkills.map((skill) => {
    const IconComponent = categoryIcons[skill.category] || Code;
    return {
      id: skill.id,
      name: skill.title,
      icon: IconComponent,
      count: 1,
      color: 'from-primary/20 to-accent/20 border-primary/30',
      category: skill.category,
      isUserSkill: true,
      ownerName: skill.profiles?.full_name || 'Unknown',
    };
  });

  // Merge base skills with user-added skills
  const allSkills = [...baseSkills, ...convertedDbSkills];

  // Filter skills based on search term
  const filteredSkills = allSkills.filter(skill =>
    (skill.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (skill.category || '').toLowerCase().includes(searchTerm.toLowerCase())
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
                  All Skills & Services
                </h1>
                <p className="text-muted-foreground text-sm">Browse all available skills and find the perfect talent</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="py-8 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search skills or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card/50 backdrop-blur-sm border-primary/20 focus:border-primary/50 text-center"
              />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              Showing {filteredSkills.length} skills across {Object.keys(skillsByCategory).length} categories
            </p>
          </div>
        </div>
      </section>

      {/* Skills by Category */}
      <section className="pb-12 px-4 relative z-10">
        <div className="container mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading skills...</p>
            </div>
          ) : (
            Object.entries(skillsByCategory).map(([category, skills]) => (
              <div key={category} className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">{category}</h2>
                  <Badge variant="secondary" className="text-sm bg-primary/20 text-primary border-primary/30">
                    {skills.length} skills
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {skills.map((skill) => {
                    const IconComponent = skill.icon;
                    return (
                      <Card 
                        key={skill.id} 
                        className={`crystal-card group cursor-pointer transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br ${skill.color}`}
                        onClick={() => handleSkillClick(skill.id)}
                      >
                        <CardHeader className="pb-3 relative z-10">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-300 shadow-glow">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-lg text-foreground">{skill.name}</CardTitle>
                          <CardDescription className="text-muted-foreground">
                            {(skill as any).isUserSkill ? (
                              <span className="text-primary/80">By {(skill as any).ownerName}</span>
                            ) : (
                              `${skill.count} talented students`
                            )}
                          </CardDescription>
                          {(skill as any).isUserSkill && (
                            <Badge className="mt-2 bg-accent/20 text-accent border-accent/30 text-xs">
                              User Added
                            </Badge>
                          )}
                        </CardHeader>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Empty State */}
      {!loading && filteredSkills.length === 0 && (
        <div className="text-center py-12 relative z-10">
          <h3 className="text-xl font-semibold mb-2 text-foreground">No skills found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search term or browse all categories
          </p>
          <Button 
            onClick={() => setSearchTerm('')}
            className="plasma-button text-primary-foreground"
          >
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllSkills;