import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import electricBolt from '@/assets/electric-bolt.png';

interface SplashScreenProps {
  onEnterApp: () => void;
}

const SplashScreen = ({ onEnterApp }: SplashScreenProps) => {
  const [showBolt, setShowBolt] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    console.log('SplashScreen mounted');
    // Show electric bolt after brief delay
    const boltTimer = setTimeout(() => {
      setShowBolt(true);
      console.log('Bolt shown');
    }, 500);

    // Show "Go to App" button after bolt animation
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
      console.log('Button shown');
    }, 2500);

    return () => {
      clearTimeout(boltTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const handleButtonClick = () => {
    console.log('Go to App button clicked');
    onEnterApp();
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background electric effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-primary/5 to-black" />
      
      {/* Electric bolt animation */}
      {showBolt && (
        <div className="relative z-10 fade-in-up">
          <img 
            src={electricBolt} 
            alt="Electric Bolt" 
            className="w-48 h-36 object-contain drop-shadow-2xl electric-pulse"
            style={{
              filter: 'drop-shadow(0 0 30px hsl(217 91% 60% / 0.8))'
            }}
          />
          
          {/* Sparkle effects around the bolt */}
          <div className="absolute -top-4 -left-4 w-2 h-2 bg-primary rounded-full animate-ping" />
          <div className="absolute -bottom-2 -right-2 w-1 h-1 bg-primary rounded-full animate-ping animation-delay-300" />
          <div className="absolute top-1/2 -left-8 w-1.5 h-1.5 bg-primary rounded-full animate-ping animation-delay-700" />
        </div>
      )}

      {/* App title - appears with bolt */}
      {showBolt && (
        <div className="mt-8 text-center fade-in-up">
          <h1 className="text-4xl font-bold text-white mb-2">
            Spark<span className="text-primary">Connect</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Where skills meet opportunity
          </p>
        </div>
      )}

      {/* Go to App button */}
      {showButton && (
        <div className="mt-12 fade-in-up">
          <Button
            onClick={handleButtonClick}
            size="lg"
            className="px-8 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300"
          >
            Go to App
          </Button>
        </div>
      )}

      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, hsl(217 91% 60%) 1px, transparent 0)`,
               backgroundSize: '50px 50px'
             }} 
        />
      </div>
    </div>
  );
};

export default SplashScreen;