/**
 * LogicNest Studio Content Data
 */

export const PLATFORM_CONFIG = {
    youtube: {
        color: '#FF0000',
        accentColor: '#cc0000',
        icon: '▶',
        label: 'YouTube',
        shape: 'tv',
    },
    blog: {
        color: '#4A90D9',
        accentColor: '#2d6cb5',
        icon: '📝',
        label: 'Builds',
        shape: 'monitor',
    },
    tiktok: {
        color: '#00F2EA',
        accentColor: '#FF0050',
        icon: '🎵',
        label: 'TikTok',
        shape: 'phone',
    },
    discord: {
        color: '#5865F2',
        accentColor: '#404EED',
        icon: '💬',
        label: 'Discord',
        shape: 'monitor',
    },
    project: {
        color: '#1F7A8C',
        accentColor: '#0F4C5C',
        icon: '🚀',
        label: 'Project',
        shape: 'monitor',
    },
};

const RAW_CONTENT_DATA = [
    {
        id: 'ln-model',
        platform: 'project',
        title: 'LogicNest Model',
        description: 'Interactive product showcase and portfolio landing experience for LogicNest.',
        frontTexture: '/textures/studio/tvfront_filmikprojektdlamultiego.webp',
        paintedFrontTexture: '/textures/studio/tvfront_filmikprojektdlamultiego_painted.webp',
        thumbnail: null,
        url: 'https://logicnestmodel.vercel.app/',
        date: '2026-09-23',
        views: 'Live',
        duration: 'Project Site',
    },
    {
        id: 'ln-build',
        platform: 'project',
        title: 'LogicNest Build',
        description: 'Build-focused project hub for launch-ready product experiences and creative development.',
        frontTexture: '/textures/studio/tvfront_filmikedytowaniezdjec.webp',
        paintedFrontTexture: '/textures/studio/tvfront_filmikedytowaniezdjec_painted.webp',
        thumbnail: null,
        url: 'https://logicnestbuild.vercel.app/',
        date: '2026-09-23',
        views: 'Live',
        duration: 'Build Site',
    },
    {
        id: 'ln-tscripter',
        platform: 'project',
        title: 'LogicNest TScripter',
        description: 'Code-focused LogicNest workspace for scripts, tooling, and technical experiments.',
        thumbnail: null,
        url: 'https://logicnesttscripter.vercel.app/',
        date: '2026-09-23',
        views: 'Live',
        duration: 'Dev Site',
    },
    {
        id: 'ln-tt',
        platform: 'project',
        title: 'LogicNest TT',
        description: 'Creative portal and social-first digital brand experience for LogicNest.',
        thumbnail: null,
        url: 'https://logicnesttt.vercel.app/',
        date: '2026-09-23',
        views: 'Live',
        duration: 'Brand Portal',
    },
    {
        id: 'ln-ui',
        platform: 'project',
        title: 'LogicNest UI',
        description: 'UI-driven experiences and polished interface concepts for the LogicNest ecosystem.',
        thumbnail: null,
        url: 'https://logicnestui.vercel.app/',
        date: '2026-09-23',
        views: 'Live',
        duration: 'UI Hub',
    },
    {
        id: 'ln-yt',
        platform: 'youtube',
        title: 'LogicNest on YouTube',
        description: 'Creative build logs, UI experiments, and product showcases from LogicNest.',
        thumbnail: null,
        url: 'https://www.youtube.com/@logicnesstt',
        date: '2026-09-23',
        views: 'Live',
        duration: 'Channel',
    },
    {
        id: 'ln-discord',
        platform: 'discord',
        title: 'LogicNest Discord',
        description: 'Connect with the LogicNest community on Discord: logicnestt',
        thumbnail: null,
        url: 'https://discord.com/users/logicnestt',
        date: '2026-09-23',
        views: 'Online',
        duration: 'Community',
    },
    {
        id: 'ln-github',
        platform: 'blog',
        title: 'LogicNest GitHub',
        description: 'Follow LogicNest code, experiments, and project work on GitHub.',
        thumbnail: null,
        url: 'https://github.com/logicnestxvoidlure',
        date: '2026-09-23',
        views: 'Live',
        duration: 'Code',
    },
];

const ytTextures = ['/textures/studio/tvfront_filmikprojektdlamultiego.webp', '/textures/studio/tvfront_filmikedytowaniezdjec.webp'];
const ytPaintedTextures = ['/textures/studio/tvfront_filmikprojektdlamultiego_painted.webp', '/textures/studio/tvfront_filmikedytowaniezdjec_painted.webp'];
const blogTextures = ['/textures/studio/monitorfront_postnafbdoublewinner.webp'];
const blogPaintedTextures = ['/textures/studio/monitorfront_postnafbdoublewinner_painted.webp'];
const ttTextures = ['/textures/studio/phonefront_followmeontiktok.webp'];
const ttPaintedTextures = ['/textures/studio/phonefront_followmeontiktok_painted.webp'];

let ytIdx = 0, blogIdx = 0, ttIdx = 0;
let ytPIdx = 0, blogPIdx = 0, ttPIdx = 0;

export const CONTENT_DATA = RAW_CONTENT_DATA.map((item) => {
    return {
        ...item,
        frontTexture: item.frontTexture || (
            item.platform === 'youtube' ? ytTextures[ytIdx++ % ytTextures.length] :
                item.platform === 'blog' ? blogTextures[blogIdx++ % blogTextures.length] :
                    ttTextures[ttIdx++ % ttTextures.length]
        ),
        paintedFrontTexture: item.paintedFrontTexture || (
            item.platform === 'youtube' ? ytPaintedTextures[ytPIdx++ % ytPaintedTextures.length] :
                item.platform === 'blog' ? blogPaintedTextures[blogPIdx++ % blogPaintedTextures.length] :
                    ttPaintedTextures[ttPIdx++ % ttPaintedTextures.length]
        )
    };
});

export const getContentByPlatform = (platform) => {
    if (platform === 'all') return CONTENT_DATA;
    return CONTENT_DATA.filter(item => item.platform === platform);
};

export const getLatestContent = () => {
    return [...CONTENT_DATA].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
};
