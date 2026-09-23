import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Stickman avatar for LogicNest.
 * Simple, clean, and intentionally not a face-based portrait.
 */
const Avatar = ({ position = [10, -20, 30] }) => {
    const groupRef = useRef();
    const headRef = useRef();
    const leftArmRef = useRef();
    const rightArmRef = useRef();
    const leftLegRef = useRef();
    const rightLegRef = useRef();
    const { camera } = useThree();

    const dodgeX = useRef(0);
    const targetDodgeX = useRef(0);
    const worldPosVec = useRef(new THREE.Vector3());

    useEffect(() => undefined, []);

    useFrame((state) => {
        if (!groupRef.current) return;

        groupRef.current.getWorldPosition(worldPosVec.current);
        const distance = camera.position.z - worldPosVec.current.z;

        const DODGE_START = 3;
        const DODGE_PEAK = 0;
        const DODGE_END = -2;
        const DODGE_AMOUNT = -1.5;

        if (distance > DODGE_PEAK && distance < DODGE_START) {
            const t = (DODGE_START - distance) / (DODGE_START - DODGE_PEAK);
            targetDodgeX.current = DODGE_AMOUNT * easeOutQuad(t);
        } else if (distance <= DODGE_PEAK && distance > DODGE_END) {
            const t = (distance - DODGE_END) / (DODGE_PEAK - DODGE_END);
            targetDodgeX.current = DODGE_AMOUNT * easeOutQuad(t);
        } else {
            targetDodgeX.current = 0;
        }

        dodgeX.current = THREE.MathUtils.lerp(dodgeX.current, targetDodgeX.current, 0.08);
        groupRef.current.position.x = position[0] + dodgeX.current;
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.06;

        const swing = Math.sin(state.clock.elapsedTime * 4) * 0.6;
        if (leftArmRef.current) leftArmRef.current.rotation.z = -0.6 + swing * 0.5;
        if (rightArmRef.current) rightArmRef.current.rotation.z = 0.6 - swing * 0.5;
        if (leftLegRef.current) leftLegRef.current.rotation.z = 0.1 + swing * 0.15;
        if (rightLegRef.current) rightLegRef.current.rotation.z = -0.1 - swing * 0.15;
        if (headRef.current) headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
    });

    const materialProps = {
        color: '#1a1a1a',
        roughness: 0.8,
        metalness: 0.05,
    };

    return (
        <group ref={groupRef} position={position}>
            <mesh ref={headRef} position={[0, 1.55, 0]}>
                <sphereGeometry args={[0.22, 18, 18]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh position={[0, 0.72, 0]}>
                <capsuleGeometry args={[0.12, 0.8, 6, 12]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh ref={leftArmRef} position={[-0.32, 0.85, 0]} rotation={[0, 0, -0.6]}>
                <capsuleGeometry args={[0.06, 0.7, 4, 10]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh ref={rightArmRef} position={[0.32, 0.85, 0]} rotation={[0, 0, 0.6]}>
                <capsuleGeometry args={[0.06, 0.7, 4, 10]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh ref={leftLegRef} position={[-0.15, -0.08, 0]} rotation={[0, 0, 0.1]}>
                <capsuleGeometry args={[0.07, 0.9, 4, 10]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh ref={rightLegRef} position={[0.15, -0.08, 0]} rotation={[0, 0, -0.1]}>
                <capsuleGeometry args={[0.07, 0.9, 4, 10]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>
        </group>
    );
};

const easeOutQuad = (t) => t * (2 - t);

export default Avatar;
