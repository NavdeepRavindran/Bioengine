import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  FaRocket,
  FaSatellite,
  FaDna,
  FaGlobe,
  FaMoon,
  FaLeaf,
  FaUserMd,
  FaBrain,
  FaRadiation,
  FaMicroscope,
} from "react-icons/fa";

export default function MissionTimeline() {
  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-10 text-center text-blue-400">
        🚀 Space Biology Mission Timeline
      </h1>

      <VerticalTimeline lineColor="#1CAAD9">
        {/* Skylab */}
        <VerticalTimelineElement
          date="1973"
          iconStyle={{ background: "#1CAAD9", color: "#fff" }}
          icon={<FaRocket />}
          contentStyle={{ background: "#0d1b2a", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid #0d1b2a" }}
        >
          <h3>Skylab</h3>
          <h4>NASA</h4>
          <p>
            First U.S. space station with human biology experiments – paved the
            way for understanding microgravity’s effects.
          </p>
        </VerticalTimelineElement>

        {/* Spacelab */}
        <VerticalTimelineElement
          date="1984"
          iconStyle={{ background: "#9C27B0", color: "#fff" }}
          icon={<FaMicroscope />}
          contentStyle={{ background: "#0d1b2a", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid #0d1b2a" }}
        >
          <h3>Spacelab Life Sciences Missions</h3>
          <h4>NASA Shuttle Program</h4>
          <p>
            First dedicated shuttle flights to biology and medical research,
            using animal models and astronauts.
          </p>
        </VerticalTimelineElement>

        {/* ISS */}
        <VerticalTimelineElement
          date="2000"
          iconStyle={{ background: "#FF9800", color: "#fff" }}
          icon={<FaSatellite />}
          contentStyle={{ background: "#0d1b2a", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid #0d1b2a" }}
        >
          <h3>International Space Station</h3>
          <h4>NASA / Roscosmos / Partners</h4>
          <p>
            Continuous human presence in orbit, studying astronaut health,
            genetics, and long-duration spaceflight.
          </p>
        </VerticalTimelineElement>

        {/* Bion-M */}
        <VerticalTimelineElement
          date="2006"
          iconStyle={{ background: "#607D8B", color: "#fff" }}
          icon={<FaDna />}
          contentStyle={{ background: "#0d1b2a", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid #0d1b2a" }}
        >
          <h3>Bion-M Satellites</h3>
          <h4>Russia</h4>
          <p>
            Carried mice, fish, plants, and microorganisms into orbit to study
            biology in spaceflight conditions.
          </p>
        </VerticalTimelineElement>

        {/* NASA Twins Study */}
        <VerticalTimelineElement
          date="2019"
          iconStyle={{ background: "#E91E63", color: "#fff" }}
          icon={<FaDna />}
          contentStyle={{ background: "#0d1b2a", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid #0d1b2a" }}
        >
          <h3>NASA Twins Study</h3>
          <h4>NASA</h4>
          <p>
            Scott & Mark Kelly compared after a year in space – major insights
            into genetics, immune system, and cognition in space.
          </p>
        </VerticalTimelineElement>

        {/* SpaceX Missions */}
        <VerticalTimelineElement
          date="2020s"
          iconStyle={{ background: "#2196F3", color: "#fff" }}
          icon={<FaRocket />}
          contentStyle={{ background: "#0d1b2a", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid #0d1b2a" }}
        >
          <h3>SpaceX Crew Dragon Missions</h3>
          <h4>NASA / SpaceX</h4>
          <p>
            Expanded access to ISS with more astronauts and biology experiments
            aboard commercial spacecraft.
          </p>
        </VerticalTimelineElement>

        {/* Artemis */}
        <VerticalTimelineElement
          date="2025 (Planned)"
          iconStyle={{ background: "#4CAF50", color: "#fff" }}
          icon={<FaMoon />}
          contentStyle={{ background: "#0d1b2a", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid #0d1b2a" }}
        >
          <h3>Artemis III</h3>
          <h4>NASA</h4>
          <p>
            First woman and next man on the Moon – lunar experiments on biology,
            radiation, and sustainability.
          </p>
        </VerticalTimelineElement>

        {/* Mars Missions */}
        <VerticalTimelineElement
          date="2030s (Planned)"
          iconStyle={{ background: "#673AB7", color: "#fff" }}
          icon={<FaGlobe />}
          contentStyle={{ background: "#0d1b2a", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid #0d1b2a" }}
        >
          <h3>Mars Missions</h3>
          <h4>NASA / ESA / SpaceX</h4>
          <p>
            Future crewed missions to Mars to study long-term survival,
            physiology, and human adaptation to deep space.
          </p>
        </VerticalTimelineElement>

        {/* RESEARCH AREAS */}
        <VerticalTimelineElement
          date="Research Areas"
          iconStyle={{ background: "#1CAAD9", color: "#fff" }}
          icon={<FaMicroscope />}
          contentStyle={{ background: "#0d1b2a", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid #0d1b2a" }}
        >
          <h3>Key Biology Focus Areas</h3>
          <ul className="list-disc ml-5">
            <li>
              <FaUserMd className="inline mr-2 text-red-400" />
              Human Physiology & Medicine
            </li>
            <li>
              <FaRadiation className="inline mr-2 text-yellow-400" />
              Space Radiation & DNA Damage
            </li>
            <li>
              <FaDna className="inline mr-2 text-pink-400" />
              Genomics & Epigenetics
            </li>
            <li>
              <FaBrain className="inline mr-2 text-purple-400" />
              Cognition & Neuroscience
            </li>
            <li>
              <FaLeaf className="inline mr-2 text-green-400" />
              Plant Growth & Food Systems
            </li>
          </ul>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
}