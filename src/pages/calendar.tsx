import React, { useEffect, useState, useRef } from "react";
import Papa from "papaparse";
import ForceGraph3D from "react-force-graph-3d";
import axios from "axios";
import * as THREE from "three";

interface Publication {
  title: string;
  link: string;
}

interface Node {
  id: string;
  x?: number;
  y?: number;
  z?: number;
}

interface Link {
  source: string;
  target: string;
}

const HF_TOKEN = import.meta.env.VITE_HUGGINGFACE_TOKEN;

const KnowledgeGraph: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [graphData, setGraphData] = useState<{ nodes: Node[]; links: Link[] }>({
    nodes: [],
    links: [],
  });
  const [activePub, setActivePub] = useState<Publication | null>(null);
  const [aiSummary, setAiSummary] = useState<string>("Loading...");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Publication[]>([]);
  const fgRef = useRef<any>(null);

  // Load CSV
  useEffect(() => {
    Papa.parse("/data/SB_publication_PMC.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = (results.data as any[]).map((pub) => ({
          title: pub.Title,
          link: pub.Link,
        }));
        setPublications(data);

        const nodes: Node[] = data.map((pub) => ({ id: pub.title, group: 1 }));
        const links: Link[] = [];
        for (let i = 0; i < nodes.length; i++) {
          const targetIdx = (i + 1) % nodes.length;
          links.push({ source: nodes[i].id, target: nodes[targetIdx].id });
        }

        setGraphData({ nodes, links });
      },
    });
  }, []);

  // Add stars
  useEffect(() => {
    if (!fgRef.current) return;
    const fg = fgRef.current;

    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1200;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4000;
    }
    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
      transparent: true,
      opacity: 0.6,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    fg.scene().add(stars);
  }, [fgRef.current]);

  // Fetch AI summary
  const fetchAISummary = async (title: string) => {
    setAiSummary("Generating AI summary...");
    try {
      const response = await axios.post(
        "https://router.huggingface.co/v1/chat/completions",
        {
          model: "deepseek-ai/DeepSeek-V3.2-Exp:novita",
          messages: [{ role: "user", content: `Explain in simple terms: ${title}` }],
          stream: false,
        },
        {
          headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAiSummary(response.data?.choices?.[0]?.message?.content || "No summary available");
    } catch (error) {
      console.error(error);
      setAiSummary("AI summary failed");
    }
  };

  const handleNodeClick = (node: Node) => {
    const pub = publications.find((p) => p.title === node.id);
    if (pub) {
      setActivePub(pub);
      fetchAISummary(pub.title);
    }
  };

  const closePopup = () => {
    setActivePub(null);
    setAiSummary("");
  };

  // Zoom to node
  const zoomToNode = (title: string) => {
    if (!fgRef.current) return;
    const node = graphData.nodes.find((n) => n.id === title);
    if (!node) return;

    const distance = 150;
    const distRatio = 1 + distance / Math.hypot(node.x || 0, node.y || 0, node.z || 0);

    fgRef.current.cameraPosition(
      {
        x: (node.x || 0) * distRatio,
        y: (node.y || 0) * distRatio,
        z: (node.z || 0) * distRatio,
      },
      { x: node.x || 0, y: node.y || 0, z: node.z || 0 },
      1000
    );

    handleNodeClick(node);
  };

  // Update suggestions
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }
    const filtered = publications.filter((pub) =>
      pub.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  }, [searchTerm, publications]);

  return (
    <div className="w-screen h-screen bg-black relative overflow-hidden">
      {/* Search */}
      <div className="absolute top-4 left-4 w-[calc(100%-32px)] max-w-lg z-50">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search a publication..."
          className="w-full p-3 rounded-xl border border-cyan-500 bg-black text-cyan-400 placeholder-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-gray-900 border border-cyan-500 rounded-b-xl max-h-52 overflow-y-auto z-50">
            {suggestions.map((pub) => (
              <li
                key={pub.title}
                onClick={() => {
                  setSearchTerm(pub.title);
                  setSuggestions([]);
                  zoomToNode(pub.title);
                }}
                className="p-2 hover:bg-cyan-700 cursor-pointer text-cyan-200 text-sm"
              >
                {pub.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 3D Graph */}
      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        nodeAutoColorBy="group"
        nodeLabel="id"
        onNodeClick={handleNodeClick}
        linkOpacity={0.25}
        linkColor={() => "#00ffff"}
        linkWidth={1.5}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={1.2}
        linkDirectionalParticleColor={() => "#00ffff"}
        enableNodeDrag={true}
        nodeThreeObject={() => {
          const sprite = new THREE.Sprite(
            new THREE.SpriteMaterial({
              color: 0x00ffff,
              transparent: true,
              opacity: 0.9,
              depthWrite: false,
            })
          );
          sprite.scale.set(10, 10, 1);
          return sprite;
        }}
      />

      {/* Node Info */}
      {activePub && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-3xl shadow-2xl w-[90%] max-w-lg relative border border-cyan-500">
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-xl font-bold"
            >
              ✕
            </button>
            <h2 className="font-extrabold text-2xl text-cyan-400 mb-4 text-center">
              {activePub.title}
            </h2>
            <div className="p-4 bg-black rounded-xl border border-cyan-700 max-h-64 overflow-y-auto mb-4">
              <p className="text-gray-200 whitespace-pre-line text-sm">{aiSummary}</p>
            </div>
            <a
              href={activePub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-cyan-400 underline font-semibold hover:text-cyan-200"
            >
              🔗 Read Full Paper
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeGraph;
