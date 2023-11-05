import Navbar from "./incs/Navbar";

import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import React, { Suspense } from "react";


const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    height: 200vh;
  }
`;

const Container = styled.div`
  height: 100%;
  scroll-snap-align: center;
  width: 1400px;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Left = styled.div`
  margin-left: 100px;
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  @media only screen and (max-width: 768px) {
    flex: 1;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 74px;

  @media only screen and (max-width: 768px) {
    text-align: center;
  }
`;

const WhatWeDo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Line = styled.img`
  height: 5px;
`;

const Subtitle = styled.h2`
  color: #e95420;
`;

const Desc = styled.p`
  font-size: 24px;
  color: lightgray;
  @media only screen and (max-width: 768px) {
    padding: 20px;
    text-align: center;
  }
`;

const Button = styled.button`
  background-color: #e95420;
  color: white;
  font-weight: 500;
  width: auto;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 3;
  position: relative;
  @media only screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

const Img = styled.img`
  width: 600px;
  height: 400px;
  object-fit: contain;
  position: absolute;
  top: -10%;
  bottom: 0;
  left: 50%;
  right: 0;
  margin: auto;
  animation: animate 2s infinite ease alternate;

  @media only screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
  }

  @media only screen and (max-width: 1400px) {
    width: 300px;
    height: 300px;
  }

  @keyframes animate {
    to {
      transform: translateY(20px);
    }
  }
`;

function Home() {
  return (
      <>
        <Navbar />
        <div className={"container-fluid"}>
          <div className={"row"}>
            <div className={"col-md-6 container-left"}>
                <Title>Think. Make. Solve.</Title>
                <WhatWeDo>
                  <Line src="./img/line.png" />
                  <Subtitle>Francis Lafontaine</Subtitle>
                </WhatWeDo>
                <Desc>
                  we enjoy creating delightful, human-centered digital
                  experiences.
                </Desc>
                <Button>Learn More</Button>
            </div>

            <div className={"col-md-6 container-right"}>
                <Canvas>
                  <Suspense fallback={null}>
                    <OrbitControls enableZoom={true} />
                    <ambientLight intensity={1} />
                    <directionalLight position={[3, 2, 1]} />
                    <Sphere args={[1, 100, 200]} scale={2.4}>
                      <MeshDistortMaterial
                          color="#e95420"
                          attach="material"
                          distort={0.5}
                          speed={2}
                      />
                    </Sphere>
                  </Suspense>
                </Canvas>
                <Img src="/../img/moon.png" />
            </div>
          </div>
        </div>

      </>
  );
}

export default Home;
