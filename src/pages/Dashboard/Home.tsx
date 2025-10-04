import React, { useEffect, useState, useRef } from "react";
import Papa from "papaparse";

interface Publication {
  title: string;
  link: string;
}

const Home: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAI, setShowAI] = useState(false);
  const [activePub, setActivePub] = useState<Publication | null>(null);
  const [aiResponse, setAiResponse] = useState<string>("Loading summary...");
  const [suggestions, setSuggestions] = useState<Publication[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    Papa.parse("/data/SB_publication_PMC.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = (results.data as any[]).map((pub) => ({
          title: pub.Title || "No title available",
          link: pub.Link || "#",
        }));
        setPublications(data);
      },
    });
  }, []);

  const fetchAISummary = async (title: string) => {
    setAiResponse("Loading AI summary...");
    setShowAI(true);
    setTimeout(() => {
      setAiResponse(
        `"${title}" summary: This publication provides insights into space biology experiments relevant to Moon and Mars missions, highlighting critical findings and research applications.`
      );
    }, 800);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    const filtered = publications.filter((pub) =>
      pub.title.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  };

  const selectPublication = (pub: Publication) => {
    setSearchQuery(pub.title);
    setSuggestions([]);
    setActivePub(pub);
    fetchAISummary(pub.title);
  };

  // Canvas Background: stars + dynamic flowing aurora
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Stars
    const stars: { x: number; y: number; r: number; twinkle: number }[] = [];
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 0.6,
        twinkle: Math.random() * 0.05,
      });
    }

    // Aurora wave parameters
    const auroraLayers = 4;
    const auroraColors = ["rgba(0,255,255,0.08)", "rgba(0,128,255,0.06)", "rgba(0,255,128,0.05)", "rgba(128,0,255,0.04)"];

    let time = 0;

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r + Math.sin(time * 0.01 + s.twinkle) * 0.3, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
      });

      // Draw aurora waves
      for (let l = 0; l < auroraLayers; l++) {
        ctx.beginPath();
        const amplitude = 60 + l * 20;
        const wavelength = 150 + l * 50;
        const yOffset = canvas.height * 0.3 + l * 30;
        ctx.moveTo(0, canvas.height);
        for (let x = 0; x <= canvas.width; x += 10) {
          const y =
            Math.sin((x + time * (0.5 + l * 0.2)) / wavelength) * amplitude +
            yOffset +
            Math.sin(time * 0.002 + l) * 10;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fillStyle = auroraColors[l];
        ctx.fill();
      }

      time += 1;
      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex bg-black text-white min-h-screen relative overflow-hidden">
      {/* Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-4xl font-bold mb-6 text-cyan-400">
              Space Publications
            </h1>

            {/* Search */}
            <div className="relative mb-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search publications..."
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
              {suggestions.length > 0 && (
                <ul className="absolute w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow max-h-64 overflow-auto z-10">
                  {suggestions.map((pub, idx) => (
                    <li
                      key={idx}
                      className="p-3 cursor-pointer hover:bg-gray-700"
                      onClick={() => selectPublication(pub)}
                    >
                      {pub.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Publications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publications
                .filter((pub) =>
                  pub.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((pub, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-md hover:shadow-xl transition cursor-pointer"
                    onClick={() => selectPublication(pub)}
                  >
                    <h2 className="text-lg font-semibold mb-2 text-cyan-300">
                      {pub.title}
                    </h2>
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-cyan-400 underline transition"
                    >
                      🔗 Read Full Paper
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Summary Panel */}
      {showAI && activePub && (
        <div className="fixed top-0 right-0 h-full w-full md:w-1/3 bg-gray-800 border-l border-gray-700 p-6 shadow-lg overflow-y-auto z-50">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-cyan-400">{activePub.title}</h2>
            <button
              onClick={() => setShowAI(false)}
              className="text-gray-400 hover:text-gray-100 text-2xl font-bold"
            >
              ✕
            </button>
          </div>
          <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
            <p className="text-gray-200 whitespace-pre-line">{aiResponse}</p>
          </div>
          <a
            href={activePub.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 text-cyan-400 underline hover:text-cyan-200"
          >
            🔗 Read Full Paper
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
