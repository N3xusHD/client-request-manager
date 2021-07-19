export interface QBittorrentAppPreferences {
    dht: boolean;
    pex: boolean;
    save_path: string;
    max_connec: number;
    max_connec_per_torrent: number;
    max_uploads: number;
    max_uploads_per_torrent: number;
    announce_ip: string;
    listen_port: number;
    random_port: boolean;
    dl_limit: number;
    up_limit: number;
}
