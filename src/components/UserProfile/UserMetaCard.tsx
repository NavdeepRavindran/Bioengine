import React, { useEffect } from "react";

interface SketchfabEmbedProps {
  modelUrl: string;
  height?: string;
  width?: string;
  title?: string;
}

const SketchfabEmbed: React.FC<SketchfabEmbedProps> = ({
  modelUrl,
  height = "400px",
  width = "100%",
  title = "3D Model",
}) => {
  return (
    <div
      className="sketchfab-embed-wrapper mb-10"
      style={{
        width,
        height,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 0 20px rgba(0,255,255,0.4)",
      }}
    >
      <iframe
        title={title}
        frameBorder="0"
        allowFullScreen
        mozAllowFullScreen="true"
        webkitAllowFullScreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src={modelUrl}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

const ThreeDShowcase: React.FC = () => {
  const models = [
    {
      url: "https://sketchfab.com/models/71a173d76fc6419a8965ba2580784a27/embed",
      title: "Star-Planet Magnetic Interaction",
    },
    {
      url: "https://sketchfab.com/models/0b3c5a8b1e2b4b579d5a1cfa5f7e2a0d/embed",
      title: "Mars Rover",
    },
    {
      url: "https://sketchfab.com/models/4e1b2a1e3f634a6a9c3f2c7d12b45e2b/embed",
      title: "Space Satellite",
    },
  ];

  // Stars Background
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "star-canvas";
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "0";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const stars = Array.from({ length: 250 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.2,
      speed: Math.random() * 0.5 + 0.1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.y -= star.speed;
        if (star.y < 0) star.y = canvas.height;
      });
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.body.removeChild(canvas);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-black flex flex-col items-center justify-start px-6 py-12 z-10">
      <h1 className="text-5xl font-extrabold mb-12 text-cyan-400 text-center z-10">
        3D Space Models Showcase
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full z-10">
        {models.map((model, idx) => (
          <SketchfabEmbed
            key={idx}
            modelUrl={model.url}
            title={model.title}
            height="400px"
          />
        ))}
      </div>
    </div>
  );
};

export default ThreeDShowcase;
