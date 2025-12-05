import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onEnterApp: () => void;
}

const SplashScreen = ({ onEnterApp }: SplashScreenProps) => {
  const [showG, setShowG] = useState(false);
  const [showT, setShowT] = useState(false);
  const [showA, setShowA] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const gTimer = setTimeout(() => setShowG(true), 300);
    const tTimer = setTimeout(() => setShowT(true), 600);
    const aTimer = setTimeout(() => setShowA(true), 900);
    const animateOutTimer = setTimeout(() => setAnimateOut(true), 1500);
    const completeTimer = setTimeout(() => onEnterApp(), 2000);

    return () => {
      clearTimeout(gTimer);
      clearTimeout(tTimer);
      clearTimeout(aTimer);
      clearTimeout(animateOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onEnterApp]);

  return (
    <div className={`min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 ${animateOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Nebula Background - Only visible in dark mode */}
      <div className="absolute inset-0 overflow-hidden opacity-0 dark:opacity-100 transition-opacity duration-300">
        <div className="absolute w-[60vw] h-[60vw] rounded-full opacity-40 blur-[100px] animate-nebula-float"
          style={{
            background: 'radial-gradient(circle, hsl(280 70% 40% / 0.6), transparent 70%)',
            top: '-20%',
            left: '-20%',
          }}
        />
        <div className="absolute w-[50vw] h-[50vw] rounded-full opacity-35 blur-[80px] animate-nebula-float"
          style={{
            background: 'radial-gradient(circle, hsl(185 60% 35% / 0.5), transparent 70%)',
            bottom: '-15%',
            right: '-10%',
            animationDelay: '-5s',
          }}
        />
        <div className="absolute w-[40vw] h-[40vw] rounded-full opacity-30 blur-[90px] animate-nebula-float"
          style={{
            background: 'radial-gradient(circle, hsl(320 70% 45% / 0.4), transparent 70%)',
            top: '40%',
            left: '40%',
            animationDelay: '-10s',
          }}
        />
      </div>

      {/* Light mode subtle gradient */}
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute w-[60vw] h-[60vw] rounded-full opacity-20 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, hsl(262 83% 58% / 0.3), transparent 70%)',
            top: '-20%',
            left: '-20%',
          }}
        />
        <div className="absolute w-[50vw] h-[50vw] rounded-full opacity-15 blur-[80px]"
          style={{
            background: 'radial-gradient(circle, hsl(320 70% 55% / 0.2), transparent 70%)',
            bottom: '-15%',
            right: '-10%',
          }}
        />
      </div>

      {/* Grid pattern - darker in dark mode */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Letter Animations */}
      <div className="flex items-center justify-center space-x-4 relative z-10">
        <div className={`transition-all duration-700 ${showG ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-50'}`}>
          <span className="text-8xl font-bold text-primary dark:electric-pulse">
            G
          </span>
        </div>

        <div className={`transition-all duration-700 ${showT ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-50'}`}>
          <span className="text-8xl font-bold text-accent dark:electric-pulse">
            T
          </span>
        </div>

        <div className={`transition-all duration-700 ${showA ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-50'}`}>
          <span className="text-8xl font-bold text-primary dark:electric-pulse">
            A
          </span>
        </div>
      </div>

      {/* Subtitle */}
      {showA && (
        <div className={`mt-8 text-center transition-all duration-500 relative z-10 ${showA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-muted-foreground text-xl tracking-widest">
            GO TO APP
          </p>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
