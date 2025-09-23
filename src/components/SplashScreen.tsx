import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import electricBolt from '@/assets/electric-bolt.png';

interface SplashScreenProps {
  onEnterApp: () => void;
}

const SplashScreen = ({ onEnterApp }: SplashScreenProps) => {
  const [showG, setShowG] = useState(false);
  const [showT, setShowT] = useState(false);
  const [showA, setShowA] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    console.log('SplashScreen mounted - starting letter animations');
    
    // Stage 1: Show G (0.3s delay)
    const gTimer = setTimeout(() => {
      setShowG(true);
    }, 300);

    // Stage 2: Show T (0.6s)
    const tTimer = setTimeout(() => {
      setShowT(true);
    }, 600);

    // Stage 3: Show A (0.9s)
    const aTimer = setTimeout(() => {
      setShowA(true);
    }, 900);

    // Stage 4: Start animate out all together (1.5s)
    const animateOutTimer = setTimeout(() => {
      setAnimateOut(true);
    }, 1500);

    // Stage 5: Complete transition to main app (2.0s)
    const completeTimer = setTimeout(() => {
      console.log('Letter animation sequence complete - transitioning to main app');
      onEnterApp();
    }, 2000);

    return () => {
      clearTimeout(gTimer);
      clearTimeout(tTimer);
      clearTimeout(aTimer);
      clearTimeout(animateOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onEnterApp]);

  return (
    <div className={`min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 ${animateOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Background electric effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-primary/5 to-black" />
      
      {/* Individual Letter Animations - G T A */}
      <div className="flex items-center justify-center space-x-4">
        {/* Letter G */}
        <div className={`transition-all duration-700 ${showG ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-50'}`}>
          <span className="text-8xl font-bold text-primary electric-pulse" 
                style={{ filter: 'drop-shadow(0 0 20px hsl(217 91% 60% / 0.8))' }}>
            G
          </span>
        </div>

        {/* Letter T */}
        <div className={`transition-all duration-700 ${showT ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-50'}`}>
          <span className="text-8xl font-bold text-primary electric-pulse" 
                style={{ filter: 'drop-shadow(0 0 20px hsl(217 91% 60% / 0.8))' }}>
            T
          </span>
        </div>

        {/* Letter A */}
        <div className={`transition-all duration-700 ${showA ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-50'}`}>
          <span className="text-8xl font-bold text-primary electric-pulse" 
                style={{ filter: 'drop-shadow(0 0 20px hsl(217 91% 60% / 0.8))' }}>
            A
          </span>
        </div>
      </div>

      {/* Subtitle appears after all letters are shown */}
      {showA && (
        <div className={`mt-8 text-center transition-all duration-500 ${showA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-gray-400 text-xl tracking-widest">
            GO TO APP
          </p>
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