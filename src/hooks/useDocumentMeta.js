import { useEffect, useRef } from 'react';
import { useScene } from '../context/SceneContext';

const ROOM_META = {
    null: {
        path: '/',
        title: 'LogicNest — Creative 3D Studio',
        description: 'LogicNest builds immersive web experiences, interactive product showcases, and bold digital experiences with React, 3D, and motion design.',
    },
    about: {
        path: '/about',
        title: 'About LogicNest',
        description: 'Learn about LogicNest, a creative digital studio crafting immersive web experiences, product launches, and modern interactive brand experiences.',
    },
    gallery: {
        path: '/gallery',
        title: 'LogicNest Projects',
        description: 'Explore LogicNest projects, product concepts, and interactive web experiences designed for ambitious brands and modern launches.',
    },
    studio: {
        path: '/studio',
        title: 'LogicNest Studio',
        description: 'Explore the LogicNest studio, where product design, motion, UI, and 3D experiences come together in custom digital experiences.',
    },
    contact: {
        path: '/contact',
        title: 'Contact LogicNest',
        description: 'Get in touch with LogicNest for web design, product experiences, UI systems, and immersive front-end builds.',
    },
};

const PATH_TO_ROOM = {
    '/': null,
    '/about': 'about',
    '/gallery': 'gallery',
    '/studio': 'studio',
    '/contact': 'contact',
};

export function getInitialRoomFromUrl() {
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    return PATH_TO_ROOM[path] !== undefined ? PATH_TO_ROOM[path] : null;
}

export function useDocumentMeta() {
    const { currentRoom, teleportTo, hasEntered } = useScene();
    const isHandlingPopState = useRef(false);
    const lastPushedRoom = useRef(undefined);

    useEffect(() => {
        const roomKey = currentRoom === null ? 'null' : currentRoom;
        const meta = ROOM_META[roomKey] || ROOM_META['null'];

        document.title = meta.title;

        const descTag = document.querySelector('meta[name="description"]');
        if (descTag) descTag.setAttribute('content', meta.description);

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', meta.title);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', meta.description);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', `https://logicnestmodel.vercel.app${meta.path}`);

        const canonicalTag = document.querySelector('link[rel="canonical"]');
        if (canonicalTag) canonicalTag.setAttribute('href', `https://logicnestmodel.vercel.app${meta.path}`);

        if (!isHandlingPopState.current && lastPushedRoom.current !== currentRoom) {
            if (lastPushedRoom.current === undefined) {
                window.history.replaceState({ room: currentRoom }, '', meta.path);
            } else {
                window.history.pushState({ room: currentRoom }, '', meta.path);
            }
            lastPushedRoom.current = currentRoom;
        }

        isHandlingPopState.current = false;
    }, [currentRoom]);

    useEffect(() => {
        const handlePopState = (event) => {
            isHandlingPopState.current = true;
            const targetRoom = event.state?.room ?? null;
            lastPushedRoom.current = targetRoom;

            if (targetRoom === null) {
                const meta = ROOM_META['null'];
                document.title = meta.title;
            } else if (hasEntered) {
                teleportTo(targetRoom);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [teleportTo, hasEntered]);
}
