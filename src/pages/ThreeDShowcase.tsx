import React from "react";

const ThreeDShowcase: React.FC = () => {
  const models = [
    {
      title: "Star-planet Magnetic Interaction",
      src: "https://sketchfab.com/models/71a173d76fc6419a8965ba2580784a27/embed",
    },
    {
      title: "Exo Planet Tetra-XC-120-9",
      src: "https://sketchfab.com/models/4ef7e65080bb41639e2d80d62867fbeb/embed",
    },
    {
      title: "Inhabited Planet",
      src: "https://sketchfab.com/models/653e3500421d48708d3e836ee9253e45/embed",
    },
    {
      title: "Need some space?",
      src: "https://sketchfab.com/models/d6521362b37b48e3a82bce4911409303/embed",
    },
    {
      title: "Solar System animation",
      src: "https://sketchfab.com/models/b7c69a6b655b47c99f871d5ec5aee854/embed",
    },
    {
      title: "H-IIA - Launch Vehicle - Rocket",
      src: "https://sketchfab.com/models/c64106de297447f880f2fceea2c4d172/embed",
    },
  ];

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        3D Model Showcase
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {models.map((model, i) => (
          <div
            key={i}
            className="relative w-full h-[340px] rounded-xl overflow-hidden shadow-lg"
          >
            <iframe
              title={model.title}
              src={model.src}
              frameBorder="0"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
              className="w-full h-full"
            />
            {/* Full bottom overlay to hide Sketchfab branding & controls */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-black pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreeDShowcase;