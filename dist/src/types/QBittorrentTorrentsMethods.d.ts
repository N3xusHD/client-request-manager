export declare type QBittorrentTorrentState = 'error' | 'missingFiles' | 'uploading' | 'pausedUP' | 'queuedUP' | 'stalledUP' | 'checkingUP' | 'forcedUP' | 'allocating' | 'downloading' | 'metaDL' | 'pausedDL' | 'queuedDL' | 'stalledDL' | 'checkingDL' | 'forcedDL' | 'checkingResumeData' | 'moving' | 'unknown';
export interface QBittorrentTorrentInfo {
    added_on: number;
    amount_left: number;
    auto_tmm: boolean;
    availability: number;
    category: string;
    completed: number;
    completion_on: number;
    dl_limit: number;
    dlspeed: number;
    downloaded: number;
    downloaded_session: number;
    eta: number;
    f_l_piece_prio: boolean;
    force_start: boolean;
    hash: string;
    last_activity: number;
    magnet_uri: string;
    max_ratio: number;
    max_seeding_time: number;
    name: string;
    num_complete: number;
    num_incomplete: number;
    num_leechs: number;
    num_seeds: number;
    priority: number;
    progress: number;
    ratio: number;
    ratio_limit: number;
    save_path: string;
    seeding_time_limit: number;
    seen_complete: number;
    seq_dl: boolean;
    size: number;
    state: QBittorrentTorrentState;
    super_seeding: boolean;
    tags: string;
    time_active: number;
    total_size: number;
    tracker: string;
    up_limit: number;
    uploaded: number;
    uploaded_session: number;
    upspeed: number;
}
export declare type QBittorrentTorrentInfos = Array<QBittorrentTorrentInfo>;
export interface QBittorrentTorrentsAddOptions {
    savepath?: string;
    cookie?: string;
    category?: string;
    tags?: string;
    skip_checking?: boolean;
    paused?: boolean;
    root_folder?: boolean;
    contentLayout?: 'Original' | 'Subfolder' | 'NoSubfolder';
    rename?: string;
    upLimit?: number;
    dlLimit?: number;
    autoTMM?: boolean;
    sequentialDownload?: boolean;
    firstLastPiecePrio?: boolean;
}
export declare enum QBittorrentTorrentContentPriority {
    DO_NOT_DOWNLOAD = 0,
    NORMAL = 1,
    HIGH = 6,
    MAXIMUM = 7
}
export interface QBittorrentTorrentContent {
    name: string;
    size: number;
    progress: number;
    priority: QBittorrentTorrentContentPriority;
    is_seed: boolean;
    piece_range: Array<number>;
    availability: number;
}
export declare type QBittorrentTorrentContents = Array<QBittorrentTorrentContent>;
export interface QBittorrentTorrentProperties {
    save_path: string;
    creation_date: number;
    piece_size: number;
    comment: string;
    total_wasted: number;
    total_uploaded: number;
    total_uploaded_session: number;
    total_downloaded: number;
    total_downloaded_session: number;
    up_limit: number;
    dl_limit: number;
    time_elapsed: number;
    seeding_time: number;
    nb_connections: number;
    nb_connections_limit: number;
    share_ratio: number;
    addition_date: number;
    completion_date: number;
    created_by: string;
    dl_speed_avg: number;
    dl_speed: number;
    eta: number;
    last_seen: number;
    peers: number;
    peers_total: number;
    pieces_have: number;
    pieces_num: number;
    reannounce: number;
    seeds: number;
    seeds_total: number;
    total_size: number;
    up_speed_avg: number;
    up_speed: number;
}
export declare enum QBittorrentTorrentTrackerStatus {
    DISABLED = 0,
    NOT_CONTACTED = 1,
    CONTACTED = 2,
    UPDATING = 3,
    ERROR = 4
}
export interface QBittorrentTorrentTracker {
    url: string;
    status: QBittorrentTorrentTrackerStatus;
    tier: number;
    num_peers: number;
    num_seeds: number;
    num_leeches: number;
    num_downloaded: number;
    msg: string;
}
export declare type QBittorrentTorrentTrackers = Array<QBittorrentTorrentTracker>;
