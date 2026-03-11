/**
 * Generates deep links for SNS platforms with web fallbacks.
 * Usage: getDeepLink('x', 'username')
 */
export const getDeepLink = (platform: 'x' | 'instagram' | 'tiktok' | 'youtube', id: string) => {
    const isMobile = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const links = {
        x: {
            app: `twitter://user?screen_name=${id}`,
            web: `https://x.com/${id}`
        },
        instagram: {
            app: `instagram://user?username=${id}`,
            web: `https://instagram.com/${id}`
        },
        tiktok: {
            app: `snssdk1233://user/profile/${id}`, // Note: TikTok IDs can be complex
            web: `https://www.tiktok.com/@${id}`
        },
        youtube: {
            app: `youtube://www.youtube.com/user/${id}`,
            web: `https://www.youtube.com/@${id}`
        }
    };

    const selected = links[platform];
    return isMobile ? selected.app : selected.web;
};

export const handleSnsClick = (platform: 'x' | 'instagram' | 'tiktok' | 'youtube', id: string) => {
    const url = getDeepLink(platform, id);
    window.location.href = url;
};
