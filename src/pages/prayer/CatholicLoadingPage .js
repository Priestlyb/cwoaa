import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const verses = [
  { text: "Be still and know that I am God...", reference: "Psalm 46:10" },
  { text: "I can do all things through Christ who strengthens me.", reference: "Philippians 4:13" },
  { text: "The Lord is my shepherd; I shall not want.", reference: "Psalm 23:1" },
  { text: "Let all that you do be done in love.", reference: "1 Corinthians 16:14" },
  { text: "Trust in the Lord with all your heart.", reference: "Proverbs 3:5" }
];

export default function CatholicLoadingPage() {
  const [verse, setVerse] = useState({ text: "", reference: "" });

  useEffect(() => {
    const randomVerse = verses[Math.floor(Math.random() * verses.length)];
    setVerse(randomVerse);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-black flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="mb-6"
        >
          <Loader2 className="h-16 w-16 text-yellow-300 mx-auto" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl font-bold mb-2"
        >
          "{verse.text}"
        </motion.h1>

        <p className="italic text-yellow-200">{verse.reference}</p>
        <p className="mt-4 text-lg">Loading with Faith...</p>
      </div>

      <div className="mt-12 w-48 h-48 relative">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-yellow-400"
            style={{
              transform: `rotate(${i * 36}deg) translateX(80px)`
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <p className="mt-8 text-sm text-gray-300">Your holy experience is loading...</p>
    </div>
  );
}
