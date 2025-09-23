import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import electricBolt from '@/assets/electric-bolt.png';

interface SplashScreenProps {
  onEnterApp: () => void;
}

const SplashScreen = ({ onEnterApp }: SplashScreenProps) => {
  const [showBolt, setShowBolt] = useState(false);
  const [showAppName, setShowAppName] = useState(false);
  const [showGoToApp, setShowGoToApp] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    console.log('SplashScreen mounted - starting 2s animation sequence');
    
    // Stage 1: Show electric bolt (0.2s delay)
    const boltTimer = setTimeout(() => {
      setShowBolt(true);
    }, 200);

    // Stage 2: Show GTA app name (0.8s)
    const appNameTimer = setTimeout(() => {
      setShowAppName(true);
    }, 800);

    // Stage 3: Show "Go to App" text (1.4s)
    const goToAppTimer = setTimeout(() => {
      setShowGoToApp(true);
    }, 1400);

    // Stage 4: Start animate out (1.8s)
    const animateOutTimer = setTimeout(() => {
      setAnimateOut(true);
    }, 1800);

    // Stage 5: Complete transition to main app (2.2s)
    const completeTimer = setTimeout(() => {
      console.log('Animation sequence complete - transitioning to main app');
      onEnterApp();
    }, 2200);

    return () => {
      clearTimeout(boltTimer);
      clearTimeout(appNameTimer);
      clearTimeout(goToAppTimer);
      clearTimeout(animateOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onEnterApp]);

  return (
    <div className={`min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 ${animateOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Background electric effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-primary/5 to-black" />
      
      {/* Electric bolt animation */}
      {showBolt && (
        <div className={`relative z-10 transition-all duration-300 ${showBolt ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
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

      {/* GTA App Name */}
      {showAppName && (
        <div className={`mt-8 text-center transition-all duration-500 ${showAppName ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-6xl font-bold text-white mb-2 tracking-wider">
            <span className="text-primary electric-pulse">GTA</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Go To App
          </p>
        </div>
      )}

      {/* Go to App Text */}
      {showGoToApp && (
        <div className={`mt-8 text-center transition-all duration-500 ${showGoToApp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-2xl text-white font-semibold tracking-wide">
            Go to App
          </p>
          <div className="w-24 h-1 bg-gradient-electric mx-auto mt-2 rounded-full" />
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