import React, { Suspense, useEffect, useState } from 'react';
import styles from './ThreeDDetail.module.css'
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Html, useProgress } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress}% loaded</Html>;
}

const Model = ({ threeDSelected }) => {
  const gltf = useLoader(GLTFLoader, `./scene${threeDSelected}/scene.gltf`);
  return <primitive object={gltf.scene} scale={1} />;
};

const ThreeDDetail = ({ modal, threeDSelected }) => {

  const [showContent, setContent] = useState(true);

  useEffect(()=> {
    if(modal){

    } else{ //입장하기를 클릭하여 모달창이 사라지면(modal === false)
    setContent(true); //'esc입력하세요'메세지 fadein
    setTimeout(()=> {
      setContent(false); //'esc입력하세요'메세지 fadeout
    }, 2000)
    }
  }, [modal]);

  return (
    <>
    {modal? null :
    <div className={showContent? styles.topContent : styles.topContentClose}>전시관을 나가려면 esc키를 입력하세요</div>}

    <section className={styles.container}>
      <Canvas camera={{ position: [4, 0.3, 3.9]}}>
        <Suspense fallback={<Loader />}>

          <ambientLight intensity={0.2} />
          <directionalLight castShadow position={[0, -10, 0]} intensity={1.5}/>
          <directionalLight castShadow position={[0, 10, 0]} intensity={0.25}/>
          <pointLight position={[0, -10, 0]} intensity={0.1} />
          <pointLight position={[0, 0, 50]} intensity={0.4} />
          <pointLight position={[0, 0, -50]} intensity={0.4} />
          <pointLight position={[50, 0, 0]} intensity={0.4} />

          <Model threeDSelected={threeDSelected}/>
          <OrbitControls />

        </Suspense>
      </Canvas>
    </section>

    </>
  );

}

export default ThreeDDetail;