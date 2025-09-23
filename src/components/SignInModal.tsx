import { useState } from 'react';
import { X, Mail, User, Lock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (userData: any) => void;
}

const SignInModal = ({ isOpen, onClose, onSignIn }: SignInModalProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    department: '',
    year: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    // Email validation - must contain @rnsit.ac.in
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@rnsit.ac.in')) {
      newErrors.email = 'Please use your RNSIT email address (@rnsit.ac.in)';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Department validation
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    // Year validation
    if (!formData.year) {
      newErrors.year = 'Academic year is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Store user data in localStorage
      const userData = {
        ...formData,
        id: Date.now().toString(),
        signedInAt: new Date().toISOString(),
      };
      
      localStorage.setItem('gta_user', JSON.stringify(userData));
      
      setIsLoading(false);
      onSignIn(userData);
      onClose();
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        password: '',
        department: '',
        year: ''
      });
      setErrors({});
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-0 top-0"
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Welcome to GTA</CardTitle>
          </div>
          <CardDescription>
            Sign in with your RNSIT email to connect with talented students
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`pl-10 ${errors.fullName ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">RNSIT Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="yourname@rnsit.ac.in"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Department */}
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <select
                id="department"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md bg-background text-foreground ${errors.department ? 'border-red-500' : 'border-border'}`}
              >
                <option value="">Select your department</option>
                <option value="Computer Science">Computer Science & Engineering</option>
                <option value="Information Science">Information Science & Engineering</option>
                <option value="Electronics">Electronics & Communication</option>
                <option value="Mechanical">Mechanical Engineering</option>
                <option value="Civil">Civil Engineering</option>
                <option value="Electrical">Electrical & Electronics</option>
                <option value="MBA">Master of Business Administration</option>
                <option value="MCA">Master of Computer Applications</option>
              </select>
              {errors.department && <p className="text-sm text-red-500">{errors.department}</p>}
            </div>

            {/* Academic Year */}
            <div className="space-y-2">
              <Label htmlFor="year">Academic Year</Label>
              <select
                id="year"
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md bg-background text-foreground ${errors.year ? 'border-red-500' : 'border-border'}`}
              >
                <option value="">Select your year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Graduate">Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
              </select>
              {errors.year && <p className="text-sm text-red-500">{errors.year}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full gradient-electric text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>By signing in, you agree to connect with fellow RNSIT students</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInModal;