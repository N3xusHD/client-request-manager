export interface QBittorrentTransferInfo {
    dl_info_speed: number;
    dl_info_data: number;
    up_info_speed: number;
    up_info_data: number;
    dl_rate_limit: number;
    up_rate_limit: number;
    dht_nodes: number;
    connection_status: 'connected' | 'firewalled' | 'disconnected';
}
