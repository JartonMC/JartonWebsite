"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

const Background = () => {
  const [bgNum, setBgNum] = useState(1); // Default to 1 for SSR
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setBgNum(Math.floor(Math.random() * 10) + 1);
  }, []);

  // Use default background during SSR and hydration
  if (!mounted) {
    return (
      <Image 
        src="/backgrounds/1.webp" 
        alt="Background" 
        fill 
        priority 
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          minHeight: '100vh'
        }}
      />
    );
  }

  return (
    <Image 
      src={`/backgrounds/${bgNum}.webp`} 
      alt="Background" 
      fill 
      priority 
      style={{
        objectFit: 'cover',
        objectPosition: 'center',
        minHeight: '100vh'
      }}
    />
  );
};

export default Background;
