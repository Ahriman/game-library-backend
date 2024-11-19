export interface SteamGame {
    appid: number;
    name: string;
    playtime_forever: number;
    img_icon_url: string;
    content_descriptorids?: number[];
    has_community_visible_stats?: boolean;
}