import { useMemo } from "react";

type Quote = {
  quote: string;
  source: string;
};

// Array of inspirational Islamic quotes
const islamicQuotes: Quote[] = [
  {
    quote: "Verily, with hardship comes ease.",
    source: "Quran 94:5",
  },
  {
    quote: "The best of people are those who are most beneficial to people.",
    source: "Prophet Muhammad (PBUH)",
  },
  {
    quote: "Whoever believes in Allah and the Last Day should speak a good word or remain silent.",
    source: "Prophet Muhammad (PBUH)",
  },
  {
    quote:
      "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.",
    source: "Prophet Muhammad (PBUH)",
  },
  {
    quote: "Be in this world as if you were a stranger or a traveler.",
    source: "Prophet Muhammad (PBUH)",
  },
  {
    quote: "Indeed, Allah will not change the condition of a people until they change what is in themselves.",
    source: "Quran 13:11",
  },
  {
    quote:
      "And when My servants ask you concerning Me - indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.",
    source: "Quran 2:186",
  },
];

export default function QuoteOfTheDay() {
  const quoteOfTheDay = useMemo(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return islamicQuotes[dayOfYear % islamicQuotes.length];
  }, []);

  return (
    <div className="mt-2 p-4 bg-accent/50 rounded-lg border border-border">
      <p className="text-lg italic text-foreground">"{quoteOfTheDay.quote}"</p>
      <p className="text-sm text-muted-foreground mt-1">— {quoteOfTheDay.source}</p>
    </div>
  );
}
