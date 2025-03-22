import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, PerspectiveCamera, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { 
  FaJava, 
  FaDatabase, 
  FaLinux, 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaReact, 
  FaPython,
  FaGithub,
  FaNodeJs,
  FaDocker,
  FaAws
} from "react-icons/fa";
import { SiTypescript, SiSpringboot, SiBootstrap, SiFigma, SiCplusplus, SiC } from "react-icons/si";


const techIcons = [
  { id: "java", name: "Java", color: "#E76F00", Icon: FaJava },
  { id: "spring", name: "Spring Boot", color: "#6DB33F", Icon: SiSpringboot },
  { id: "mysql", name: "MySQL", color: "#00758F", Icon: FaDatabase },
  { id: "linux", name: "Linux", color: "#FCC624", Icon: FaLinux },
  { id: "html", name: "HTML5", color: "#E34F26", Icon: FaHtml5 },
  { id: "css", name: "CSS3", color: "#1572B6", Icon: FaCss3Alt },
  { id: "javascript", name: "JavaScript", color: "#F7DF1E", Icon: FaJs },
  { id: "react", name: "React", color: "#61DAFB", Icon: FaReact },
  { id: "python", name: "Python", color: "#3776AB", Icon: FaPython },
  { id: "github", name: "GitHub", color: "#181717", Icon: FaGithub },
  { id: "bootstrap", name: "Bootstrap", color: "#3178C6", Icon: SiBootstrap },
  { id: "figma", name: "Figma", color: "#FF9900", Icon: SiFigma },
  { id: "cpp", name: "C++", color: "#00599C", Icon: SiCplusplus },
  { id: "c", name: "C", color: "#555555", Icon: SiC }
];

const IconNode = ({ position, icon, onHover, isHovered }) => {
  const meshRef = useRef();
  const localHovered = isHovered === icon.id;
  const Icon = icon.Icon;
  
  useFrame((state) => {
    if (meshRef.current) {
      
      if (localHovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
      
   
      meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime + position.x) * 0.05;
    }
  });
  
  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => onHover(icon.id)}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color={icon.color} 
          emissive={icon.color} 
          emissiveIntensity={localHovered ? 0.6 : 0.3}
          metalness={0.8}
          roughness={0.2}
          transparent={true}
          opacity={0.8}
        />
        
       
        <Html
          position={[0, 0, 0.15]}
          center
          distanceFactor={7}
          
        >
          <div 
            style={{ 
              color: "#ffffff", 
              fontSize: localHovered ? "3rem" : "2.5rem",
              transition: "font-size 0.3s ease",
              pointerEvents: "none"
            }}
          >
            <Icon />
          </div>
        </Html>
      </mesh>
      
     
      {localHovered && (
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor={icon.color}
        >
          {icon.name}
        </Text>
      )}
    </group>
  );
};


const CoreSphere = () => {
  const ref = useRef();
  
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshPhongMaterial 
        color="#1a1a2e" 
        emissive="#505080"
        emissiveIntensity={0.5}
        wireframe={true}
        transparent={true}
        opacity={0.8}
      />
    </mesh>
  );
};


const Line = ({ start, end, color, visible }) => {
  const points = [start, end];
  const lineRef = useRef();
  
  return (
    <line ref={lineRef}>
      <bufferGeometry
        attach="geometry"
        setFromPoints={points}
      />
      <lineBasicMaterial 
        attach="material" 
        color={color} 
        linewidth={1} 
        opacity={visible ? 0.8 : 0.2} 
        transparent 
      />
    </line>
  );
};


const getFibonacciSpherePoints = (samples, radius) => {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(6)); 

  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2; 
    const radiusAtY = Math.sqrt(1 - y * y); 
    
    const theta = phi * i; 
    
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }

  return points;
};


const TechSphere = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const groupRef = useRef();
  
  
  const radius = 2.5;
  const positions = getFibonacciSpherePoints(techIcons.length, radius);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });
  
  return (
    <group ref={groupRef}>
      <CoreSphere />
      
      
      {techIcons.map((icon, index) => (
        <Line 
          key={`line-${icon.id}`}
          start={new THREE.Vector3(0, 0, 0)}
          end={positions[index]}
          color={icon.color}
          visible={hoveredIcon === icon.id}
        />
      ))}
      
      
      {techIcons.map((icon, index) => (
        <IconNode 
          key={icon.id}
          position={positions[index]}
          icon={icon}
          onHover={setHoveredIcon}
          isHovered={hoveredIcon}
        />
      ))}
    </group>
  );
};


const TechStackSphere = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[-10, 10, 10]} angle={0.3} penumbra={1} intensity={1} />
          
          <TechSphere />
          
          <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
          <PerspectiveCamera position={[0, 0, 6]} makeDefault />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TechStackSphere;