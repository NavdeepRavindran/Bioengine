import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "../../icons"; // your icon import path

const Plant: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.1, 0.2, 1, 8]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

const Microbe: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color="purple" />
    </mesh>
  );
};

const SpaceFoodChain: React.FC = () => {
  const navigate = useNavigate();
  const [plants, setPlants] = useState<[number, number, number][]>([]);
  const [microbes, setMicrobes] = useState<[number, number, number][]>([]);

  const addPlant = () =>
    setPlants([...plants, [Math.random() * 4 - 2, 0, Math.random() * 4 - 2]]);
  const addMicrobe = () =>
    setMicrobes([...microbes, [Math.random() * 4 - 2, Math.random() * 2, Math.random() * 4 - 2]]);

  // Simple environment stats
  const oxygen = plants.length * 10;
  const co2 = microbes.length * 5;
  const water = Math.max(100 - plants.length * 5 - microbes.length * 2, 0);

  return (
    <div className="w-screen h-screen relative bg-black text-white">
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-gray-900/60 hover:bg-gray-800/70 text-white px-3 py-1 rounded"
      >
        <ChevronLeftIcon className="w-5 h-5" /> Back to Home
      </button>

      {/* Controls */}
      <div className="absolute top-16 left-4 z-10 space-y-2 p-2 bg-gray-900/50 rounded-lg">
        <button onClick={addPlant} className="bg-green-500 px-3 py-1 rounded">
          🌱 Add Plant
        </button>
        <button onClick={addMicrobe} className="bg-purple-500 px-3 py-1 rounded">
          🦠 Add Microbe
        </button>
        <div>💨 Oxygen: {oxygen}</div>
        <div>☁️ CO₂: {co2}</div>
        <div>💧 Water: {water}</div>
      </div>

      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        <OrbitControls />

        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#222222" />
        </mesh>

        {/* Render plants */}
        {plants.map((pos, i) => (
          <Plant key={i} position={pos} />
        ))}

        {/* Render microbes */}
        {microbes.map((pos, i) => (
          <Microbe key={i} position={pos} />
        ))}
      </Canvas>
    </div>
  );
};

export default SpaceFoodChain;
