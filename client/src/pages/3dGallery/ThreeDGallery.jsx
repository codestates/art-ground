import React, { Suspense } from 'react';
import styles from './ThreeDGallery.module.css'
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Html, useProgress } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress}% loaded</Html>;
}

const Model = () => {
  const gltf = useLoader(GLTFLoader, "./scene.gltf");
  return <primitive object={gltf.scene} scale={1} />;
};

const ThreeDGallery = (props) => {
  return (
    <div className={styles.container}>
      <Canvas camera={{ position: [4, 0.3, 3.9]}}>
        <Suspense fallback={<Loader />}>

          <ambientLight intensity={0.2} />
          <directionalLight castShadow position={[0, -10, 0]} intensity={1.5}/>
          <directionalLight castShadow position={[0, 10, 0]} intensity={0.25}/>
          <pointLight position={[0, -10, 0]} intensity={0.1} />
          <pointLight position={[0, 0, 50]} intensity={0.4} />
          <pointLight position={[0, 0, -50]} intensity={0.4} />
          <pointLight position={[50, 0, 0]} intensity={0.4} />

          <Model />
          <OrbitControls />

        </Suspense>
      </Canvas>
    </div>
  );
}

export default ThreeDGallery;