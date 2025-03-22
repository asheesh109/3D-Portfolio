import { MeshDistortMaterial, OrbitControls, Sphere } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Test3d = () => {
  return (
    <section
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Canvas>
        <mesh>
          <Sphere args={[1, 100, 200]} scale={2.4}>
            <MeshDistortMaterial
              color="#DB8B9B"
              attach="material"
              distort={0.5}
              speed={2}
            />
          </Sphere>
          
          <ambientLight intensity={2} />
          <directionalLight position={[1, 2, 3]} />
        
        </mesh>
      </Canvas>
    </section>
  );
};

export default Test3d;
