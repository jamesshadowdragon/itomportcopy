import { useRef, useMemo } from 'react';
import { useTexture, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SignSystem = (props) => {
    const groupRef = useRef();
    const mountTexture = useTexture('/textures/entrance/belka.webp');

    const timeOffset = useMemo(() => Math.random() * 100, []);

    useFrame((state) => {
        if (groupRef.current) {
            const time = state.clock.elapsedTime + timeOffset;
            const windSway = Math.sin(time * 2) * 0.05;
            groupRef.current.rotation.x = windSway;
            groupRef.current.rotation.y = 0;
        }
    });

    return (
        <group {...props}>
            <mesh position={[-0.05, 2.05, 0.65]}>
                <planeGeometry args={[2.7, 0.4]} />
                <meshBasicMaterial color="#e0e0e0" map={mountTexture} transparent={true} side={THREE.DoubleSide} />
            </mesh>

            <group ref={groupRef} position={[0, 1.9, 0.60]}>
                <mesh position={[0, -0.5, 0]}>
                    <planeGeometry args={[2.3, 1.1]} />
                    <meshBasicMaterial color="#f4f1ea" transparent={true} side={THREE.DoubleSide} depthWrite={false} />
                </mesh>

                <Text
                    position={[0, -0.45, 0.02]}
                    fontSize={0.26}
                    color="#121212"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={1.9}
                    textAlign="center"
                    letterSpacing={0.04}
                    font="/fonts/CabinSketch-Bold.ttf"
                >
                    LOGICNEST
                </Text>
            </group>
        </group>
    );
};

export default SignSystem;
