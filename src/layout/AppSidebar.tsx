import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

import {
  BookOpenIcon, // Publications
  BarChart3Icon, // Visual Graphs
  HeartIcon,
  Activity,
  LayersIcon, // Health Dashboard
  ClockIcon, // Mission Timeline
} from "lucide-react";

import { ChevronDownIcon, HorizontaLDots, PlugInIcon } from "../icons";

import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <BookOpenIcon />,
    name: "Publications",
    subItems: [{ name: "Space Biology Publications", path: "/" }],
  },
  {
    icon: <BarChart3Icon />,
    name: "Visual Graphs",
    path: "/calendar",
  },
  {
    icon: <LayersIcon />,
    name: "3D Models",
    path: "/threed",
  },
  {
    icon: <HeartIcon />,
    name: "Health Dashboard",
    path: "/health-dashboard",
  },
  {
    icon: <ClockIcon />,
    name: "Mission Timeline",
    path: "/timeline",
  },
  { icon: <Activity />, name: "Mini Game", path: "/mini-game" },
];

const othersItems: NavItem[] = [
  {
    icon: <PlugInIcon />,
    name: "Account",
    subItems: [{ name: "Sign In", path: "/signin" }],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, toggleSidebar } =
    useSidebar();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        nav.subItems?.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu({ type: menuType as "main" | "others", index });
            submenuMatched = true;
          }
        });
      });
    });
    if (!submenuMatched) setOpenSubmenu(null);
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prev) =>
      prev && prev.type === menuType && prev.index === index
        ? null
        : { type: menuType, index }
    );
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-1">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 cursor-pointer
                ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "bg-gray-800"
                    : "hover:bg-gray-700"
                }`}
            >
              <span className="text-gray-300">{nav.icon}</span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="ml-3 text-gray-100 font-medium">
                  {nav.name}
                </span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200
                  ${isActive(nav.path) ? "bg-gray-800" : "hover:bg-gray-700"}`}
              >
                <span className="text-gray-300">{nav.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="ml-3 text-gray-100 font-medium">
                    {nav.name}
                  </span>
                )}
              </Link>
            )
          )}

          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300 ml-6"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-1 space-y-1">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`block p-2 rounded-lg text-gray-300 text-sm transition-colors hover:bg-gray-700 ${
                        isActive(subItem.path) ? "bg-gray-800 text-white" : ""
                      }`}
                    >
                      {subItem.name}
                      {subItem.new && (
                        <span className="ml-2 text-xs text-blue-400">NEW</span>
                      )}
                      {subItem.pro && (
                        <span className="ml-2 text-xs text-yellow-400">
                          PRO
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed top-0 left-0 flex flex-col h-screen bg-gray-900 text-gray-100 shadow-lg transition-all duration-300 z-50
        ${isExpanded || isMobileOpen ? "w-64" : isHovered ? "w-64" : "w-16"}
        ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-2 border-b border-gray-800">
        <button
          onClick={toggleSidebar}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-200 transition"
        >
          {isExpanded ? "←" : "→"}
        </button>
      </div>

      {/* Logo */}
      <div className="flex items-center justify-center p-4  bg-white">
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <img src="/images/logo/logo.svg" alt="Logo" className="h-12" />
          ) : (
            <img src="/images/logo/logo.svg" alt="Logo" className="h-8" />
          )}
        </Link>
      </div>

      {/* Menu */}
      <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar px-2 py-3">
        <div className="mb-2 text-xs uppercase text-gray-400 px-3">
          {isExpanded || isHovered || isMobileOpen ? (
            "Menu"
          ) : (
            <HorizontaLDots />
          )}
        </div>
        {renderMenuItems(navItems, "main")}
        <div className="mt-4 mb-2 text-xs uppercase text-gray-400 px-3">
          {isExpanded || isHovered || isMobileOpen ? (
            "Others"
          ) : (
            <HorizontaLDots />
          )}
        </div>
        {renderMenuItems(othersItems, "others")}
      </div>
    </aside>
  );
};

export default AppSidebar;
