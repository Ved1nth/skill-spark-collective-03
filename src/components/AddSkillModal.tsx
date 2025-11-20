import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
}

const AddSkillModal = ({ isOpen, onClose, currentUser }: AddSkillModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    experience: '',
    hourlyRate: '',
    availability: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error('Please sign in to add a skill');
      return;
    }

    const newSkill = {
      id: `user-skill-${Date.now()}`,
      ...formData,
      provider: {
        id: currentUser.id,
        name: currentUser.fullName,
        branch: currentUser.branch || 'Student',
        year: currentUser.year || '3rd Year'
      },
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingSkills = JSON.parse(localStorage.getItem('user_skills') || '[]');
    existingSkills.push(newSkill);
    localStorage.setItem('user_skills', JSON.stringify(existingSkills));

    toast.success('Skill added successfully!');
    setFormData({
      title: '',
      description: '',
      category: '',
      experience: '',
      hourlyRate: '',
      availability: ''
    });
    onClose();
    window.location.reload(); // Reload to show new skill
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Add Your Skill</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="title">Skill Title *</Label>
            <Input
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Web Development, Graphic Design"
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your skill and what you can offer"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Input
              id="category"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="e.g., Technology, Design, Academic"
            />
          </div>

          <div>
            <Label htmlFor="experience">Experience Level *</Label>
            <Input
              id="experience"
              required
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="e.g., 2 years, Beginner, Expert"
            />
          </div>

          <div>
            <Label htmlFor="hourlyRate">Hourly Rate (₹) *</Label>
            <Input
              id="hourlyRate"
              required
              type="number"
              value={formData.hourlyRate}
              onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
              placeholder="e.g., 500"
            />
          </div>

          <div>
            <Label htmlFor="availability">Availability *</Label>
            <Input
              id="availability"
              required
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              placeholder="e.g., Weekends, After 5 PM"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Skill
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSkillModal;
