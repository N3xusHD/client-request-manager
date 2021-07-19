import axios from 'axios';
import FormData from 'form-data';
import {literal, string, strictObject} from 'zod';
import type {infer as zodInfer} from 'zod';

const qBittorrentConnectionSettingsSchema = strictObject({
  client: literal('qBittorrent'),
  type: literal('web'),
  version: literal(1),
  url: string().url(),
  username: string(),
  password: string(),
});

type QBittorrentConnectionSettings = zodInfer<typeof qBittorrentConnectionSettingsSchema>;

interface QBittorrentAppPreferences {
  dht: boolean;
  pex: boolean;
  // Default save path for torrents, separated by slashes
  save_path: string;
  // Maximum global number of simultaneous connections
  max_connec: number;
  // Maximum number of simultaneous connections per torrent
  max_connec_per_torrent: number;
  // Maximum number of upload slots
  max_uploads: number;
  // Maximum number of upload slots per torrent
  max_uploads_per_torrent: number;
  // IP announced to trackers
  announce_ip: string;
  // Port for incoming connections
  listen_port: number;
  // True if the port is randomly selected
  random_port: boolean;
  // Global download speed limit in KiB/s; `-1` means no limit is applied
  dl_limit: number;
  // Global upload speed limit in KiB/s; `-1` means no limit is applied
  up_limit: number;
}


interface QBittorrentCategory {
  name: string;
  savePath: string;
}

interface QBittorrentTorrentPeer {
  client: string;
  connection: string;
  country: string;
  country_code: string;
  dl_speed: number;
  downloaded: number;
  up_speed: number;
  uploaded: number;
  files: string;
  flags: string;
  flags_desc: string;
  ip: string;
  port: number;
  progress: number;
  relevance: number;
}

interface QBittorrentSyncMainData {
  rid: number;
  full_update?: boolean;
  categories?: {
    [name: string]: QBittorrentCategory;
  };
  categories_removed?: string[];
  server_state?: QBittorrentTransferInfo;
  tags?: string[];
  tags_removed?: string[];
  torrents?: {
    [hash: string]: QBittorrentTorrentInfo;
  };
  torrents_removed?: string[];
  trackers?: {
    [url: string]: string[];
  };
  trackers_removed: string[];
}

type QBittorrentMainData = Required<
  Pick<QBittorrentSyncMainData, 'categories' | 'server_state' | 'tags' | 'torrents' | 'trackers'>
>;

interface QBittorrentSyncTorrentPeers {
  rid: number;
  peers?: {
    [ip_and_port: string]: QBittorrentTorrentPeer;
  };
  peers_removed?: string[];
}

type QBittorrentTorrentPeers = Exclude<QBittorrentSyncTorrentPeers['peers'], undefined>;


interface QBittorrentTransferInfo {
  // Global download rate (bytes/s)
  dl_info_speed: number;
  // Data downloaded this session (bytes)
  dl_info_data: number;
  // Global upload rate (bytes/s)
  up_info_speed: number;
  // Data uploaded this session (bytes)
  up_info_data: number;
  // Download rate limit (bytes/s)
  dl_rate_limit: number;
  // Upload rate limit (bytes/s)
  up_rate_limit: number;
  // DHT nodes connected to
  dht_nodes: number;
  // Connection status
  connection_status: 'connected' | 'firewalled' | 'disconnected';
}
type QBittorrentTorrentState =
  | 'error'
  | 'missingFiles'
  | 'uploading'
  | 'pausedUP'
  | 'queuedUP'
  | 'stalledUP'
  | 'checkingUP'
  | 'forcedUP'
  | 'allocating'
  | 'downloading'
  | 'metaDL'
  | 'pausedDL'
  | 'queuedDL'
  | 'stalledDL'
  | 'checkingDL'
  | 'forcedDL'
  | 'checkingResumeData'
  | 'moving'
  | 'unknown';

interface QBittorrentTorrentInfo {
  // Time (Unix Epoch) when the torrent was added to the client
  added_on: number;
  // Amount of data left to download (bytes)
  amount_left: number;
  // Whether this torrent is managed by Automatic Torrent Management
  auto_tmm: boolean;
  // Percentage of file pieces currently available
  availability: number;
  // Category of the torrent
  category: string;
  // Amount of transfer data completed (bytes)
  completed: number;
  // Time (Unix Epoch) when the torrent completed
  completion_on: number;
  // Torrent download speed limit (bytes/s). -1 if unlimited.
  dl_limit: number;
  // Torrent download speed (bytes/s)
  dlspeed: number;
  // Amount of data downloaded
  downloaded: number;
  // Amount of data downloaded this session
  downloaded_session: number;
  // Torrent ETA (seconds)
  eta: number;
  // True if first last piece are prioritized
  f_l_piece_prio: boolean;
  // True if force start is enabled for this torrent
  force_start: boolean;
  // Torrent hash
  hash: string;
  // Last time (Unix Epoch) when a chunk was downloaded/uploaded
  last_activity: number;
  // Magnet URI corresponding to this torrent
  magnet_uri: string;
  // Maximum share ratio until torrent is stopped from seeding/uploading
  max_ratio: number;
  // Maximum seeding time (seconds) until torrent is stopped from seeding
  max_seeding_time: number;
  // Torrent name
  name: string;
  // Number of seeds in the swarm
  num_complete: number;
  // Number of leechers in the swarm
  num_incomplete: number;
  // Number of leechers connected to
  num_leechs: number;
  // Number of seeds connected to
  num_seeds: number;
  // Torrent priority. Returns -1 if queuing is disabled or torrent is in seed mode
  priority: number;
  // Torrent progress (percentage/100)
  progress: number;
  // Torrent share ratio. Max ratio value: 9999.
  ratio: number;
  // TODO (what is different from max_ratio?)
  ratio_limit: number;
  // Path where this torrent's data is stored
  save_path: string;
  // TODO (what is different from max_seeding_time?)
  seeding_time_limit: number;
  // Time (Unix Epoch) when this torrent was last seen complete
  seen_complete: number;
  // True if sequential download is enabled
  seq_dl: boolean;
  // Total size (bytes) of files selected for download
  size: number;
  // Torrent state
  state: QBittorrentTorrentState;
  // True if super seeding is enabled
  super_seeding: boolean;
  // Comma-concatenated tag list of the torrent
  tags: string;
  // Total active time (seconds)
  time_active: number;
  // Total size (bytes) of all file in this torrent (including unselected ones)
  total_size: number;
  // The first tracker with working status. Returns empty string if no tracker is working.
  tracker: string;
  // Torrent upload speed limit (bytes/s). -1 if unlimited.
  up_limit: number;
  // Amount of data uploaded
  uploaded: number;
  // Amount of data uploaded this session
  uploaded_session: number;
  // Torrent upload speed (bytes/s)
  upspeed: number;
}

type QBittorrentTorrentInfos = Array<QBittorrentTorrentInfo>;

interface QBittorrentTorrentsAddOptions {
  // Download folder
  savepath?: string;
  // Cookie sent to download the .torrent file
  cookie?: string;
  // Category for the torrent
  category?: string;
  // Tags for the torrent, split by ','
  tags?: string;
  // Skip hash checking. Possible values are true, false (default)
  skip_checking?: boolean;
  // Add torrents in the paused state. Possible values are true, false (default)
  paused?: boolean;
  // Create the root folder. Possible values are true, false, unset (default)
  root_folder?: boolean;
  // Content layout mode, replaces root_folder
  contentLayout?: 'Original' | 'Subfolder' | 'NoSubfolder';
  // Rename torrent
  rename?: string;
  // Set torrent upload speed limit. Unit in bytes/second
  upLimit?: number;
  // Set torrent download speed limit. Unit in bytes/second
  dlLimit?: number;
  // Whether Automatic Torrent Management should be used
  autoTMM?: boolean;
  // Enable sequential download. Possible values are true, false (default)
  sequentialDownload?: boolean;
  // Prioritize download first last piece. Possible values are true, false (default)
  firstLastPiecePrio?: boolean;
}

enum QBittorrentTorrentContentPriority {
  DO_NOT_DOWNLOAD = 0,
  NORMAL = 1,
  HIGH = 6,
  MAXIMUM = 7,
}

interface QBittorrentTorrentContent {
  // File name (including relative path)
  name: string;
  // File size (bytes)
  size: number;
  // File progress (percentage/100)
  progress: number;
  // File priority
  priority: QBittorrentTorrentContentPriority;
  // True if file is seeding/complete
  is_seed: boolean;
  // The first number is the starting piece index and the second number is the ending piece index (inclusive)
  piece_range: Array<number>;
  // Percentage of file pieces currently available
  availability: number;
}

type QBittorrentTorrentContents = Array<QBittorrentTorrentContent>;

interface QBittorrentTorrentProperties {
  // Torrent save path
  save_path: string;
  // Torrent creation date (Unix timestamp)
  creation_date: number;
  // Torrent piece size (bytes)
  piece_size: number;
  // Torrent comment
  comment: string;
  // Total data wasted for torrent (bytes)
  total_wasted: number;
  // Total data uploaded for torrent (bytes)
  total_uploaded: number;
  // Total data uploaded this session (bytes)
  total_uploaded_session: number;
  // Total data downloaded for torrent (bytes)
  total_downloaded: number;
  // Total data downloaded this session (bytes)
  total_downloaded_session: number;
  // Torrent upload limit (bytes/s)
  up_limit: number;
  // Torrent download limit (bytes/s)
  dl_limit: number;
  // Torrent elapsed time (seconds)
  time_elapsed: number;
  // Torrent elapsed time while complete (seconds)
  seeding_time: number;
  // Torrent connection count
  nb_connections: number;
  // Torrent connection count limit
  nb_connections_limit: number;
  // Torrent share ratio
  share_ratio: number;
  // When this torrent was added (unix timestamp)
  addition_date: number;
  // Torrent completion date (unix timestamp)
  completion_date: number;
  // Torrent creator
  created_by: string;
  // Torrent average download speed (bytes/second)
  dl_speed_avg: number;
  // Torrent download speed (bytes/second)
  dl_speed: number;
  // Torrent ETA (seconds)
  eta: number;
  // Last seen complete date (unix timestamp)
  last_seen: number;
  // Number of peers connected to
  peers: number;
  // Number of peers in the swarm
  peers_total: number;
  // Number of pieces owned
  pieces_have: number;
  // Number of pieces of the torrent
  pieces_num: number;
  // Number of seconds until the next announce
  reannounce: number;
  // Number of seeds connected to
  seeds: number;
  // Number of seeds in the swarm
  seeds_total: number;
  // Torrent total size (bytes)
  total_size: number;
  // Torrent average upload speed (bytes/second)
  up_speed_avg: number;
  // Torrent upload speed (bytes/second)
  up_speed: number;
}

enum QBittorrentTorrentTrackerStatus {
  // Tracker is disabled (used for DHT, PeX, and LSD)
  DISABLED = 0,
  // Tracker has not been contacted yet
  NOT_CONTACTED = 1,
  // Tracker has been contacted and is working
  CONTACTED = 2,
  // Tracker is updating
  UPDATING = 3,
  // Tracker has been contacted, but it is not working (or doesn't send proper replies)
  ERROR = 4,
}

interface QBittorrentTorrentTracker {
  // Tracker url
  url: string;
  // Tracker status
  status: QBittorrentTorrentTrackerStatus;
  // Tracker priority tier. Lower tier trackers are tried before higher tiers
  tier: number;
  // Number of peers for current torrent, as reported by the tracker
  num_peers: number;
  // Number of seeds for current torrent, as reported by the tracker
  num_seeds: number;
  // Number of leeches for current torrent, as reported by the tracker
  num_leeches: number;
  // Number of completed downloads for current torrent, as reported by the tracker
  num_downloaded: number;
  // Tracker message (there is no way of knowing what this message is - it's up to tracker admins)
  msg: string;
}

type QBittorrentTorrentTrackers = Array<QBittorrentTorrentTracker>;


const EMPTY_SERVER_STATE = {
  dl_info_speed: 0,
  dl_info_data: 0,
  up_info_speed: 0,
  up_info_data: 0,
  dl_rate_limit: 0,
  up_rate_limit: 0,
  dht_nodes: 0,
  connection_status: 'disconnected',
} as const;

class ClientRequestManager {
  private connectionSettings: QBittorrentConnectionSettings;
  private apiBase: string;
  private authCookie?: Promise<string | undefined>;
  private isMainDataPending = false;

  private syncRids: {
    mainData: Promise<number>;
  } = {
    mainData: Promise.resolve(0),
  };

  private syncStates: {
    mainData: QBittorrentMainData;
  } = {
    mainData: {
      categories: {},
      server_state: EMPTY_SERVER_STATE,
      tags: [],
      torrents: {},
      trackers: {},
    },
  };

  async authenticate(connectionSettings = this.connectionSettings): Promise<string | undefined> {
    const {url, username, password} = connectionSettings;

    return axios
      .get(`${url}/api/v2/auth/login`, {
        params: {
          username,
          password,
        },
      })
      .then((res) => {
        const cookies: Array<string> = res.headers['set-cookie'];

        if (Array.isArray(cookies)) {
          return cookies.filter((cookie) => cookie.includes('SID='))[0];
        }

        return undefined;
      });
  }

  async updateAuthCookie(connectionSettings?: QBittorrentConnectionSettings): Promise<void> {
    let authFailed = false;

    this.authCookie = new Promise((resolve) => {
      this.authenticate(connectionSettings).then(
        (authCookie) => {
          resolve(authCookie);
        },
        () => {
          authFailed = true;
          resolve(undefined);
        },
      );
    });

    await this.authCookie;

    return authFailed ? Promise.reject(new Error()) : Promise.resolve();
  }

  async getAppPreferences(): Promise<QBittorrentAppPreferences> {
    return axios
      .get(`${this.apiBase}/app/preferences`, {
        headers: {Cookie: await this.authCookie},
      })
      .then((json) => json.data);
  }

  async setAppPreferences(preferences: Partial<QBittorrentAppPreferences>): Promise<void> {
    return axios
      .post(`${this.apiBase}/app/setPreferences`, `json=${JSON.stringify(preferences)}`, {
        headers: {Cookie: await this.authCookie},
      })
      .then(() => {
        // returns nothing
      });
  }

  async getTorrentInfos(): Promise<QBittorrentTorrentInfos> {
    return axios
      .get(`${this.apiBase}/torrents/info`, {
        headers: {Cookie: await this.authCookie},
      })
      .then((json) => json.data);
  }

  async getTorrentContents(hash: string): Promise<QBittorrentTorrentContents> {
    return axios
      .get(`${this.apiBase}/torrents/files`, {
        params: {
          hash: hash.toLowerCase(),
        },
        headers: {Cookie: await this.authCookie},
      })
      .then((json) => json.data);
  }

  async getTorrentProperties(hash: string): Promise<QBittorrentTorrentProperties> {
    return axios
      .get(`${this.apiBase}/torrents/properties`, {
        params: {
          hash: hash.toLowerCase(),
        },
        headers: {Cookie: await this.authCookie},
      })
      .then((json) => json.data);
  }

  async getTorrentTrackers(hash: string): Promise<QBittorrentTorrentTrackers> {
    return axios
      .get(`${this.apiBase}/torrents/trackers`, {
        params: {
          hash: hash.toLowerCase(),
        },
        headers: {Cookie: await this.authCookie},
      })
      .then((json) => json.data);
  }

  async getTransferInfo(): Promise<QBittorrentTransferInfo> {
    return axios
      .get(`${this.apiBase}/transfer/info`, {
        headers: {Cookie: await this.authCookie},
      })
      .then((json) => json.data);
  }

  async syncMainData(): Promise<QBittorrentMainData> {
    const Cookie = await this.authCookie;

    if (this.isMainDataPending == false) {
      this.isMainDataPending = true;
      this.syncRids.mainData = this.syncRids.mainData.then((rid) =>
        axios
          .get<QBittorrentSyncMainData>(`${this.apiBase}/sync/maindata`, {
            params: {
              rid,
            },
            headers: {Cookie},
          })
          .then(({data}) => {
            const {
              rid: newRid = 0,
              full_update = false,
              categories = {},
              categories_removed = [],
              server_state = EMPTY_SERVER_STATE,
              tags = [],
              tags_removed = [],
              torrents = {},
              torrents_removed = [],
              trackers = {},
              trackers_removed = [],
            } = data;

            if (full_update) {
              this.syncStates.mainData = {
                categories,
                server_state,
                tags,
                torrents,
                trackers,
              };
            } else {
              // categories
              Object.keys(categories).forEach((category) => {
                this.syncStates.mainData.categories[category] = {
                  ...this.syncStates.mainData.categories[category],
                  ...categories[category],
                };
              });

              categories_removed.forEach((category) => {
                delete this.syncStates.mainData.categories[category];
              });

              // tags
              this.syncStates.mainData.tags.push(...tags);
              this.syncStates.mainData.tags = this.syncStates.mainData.tags.filter(
                (tag) => !tags_removed.includes(tag),
              );

              // torrents
              Object.keys(torrents).forEach((torrent) => {
                this.syncStates.mainData.torrents[torrent] = {
                  ...this.syncStates.mainData.torrents[torrent],
                  ...torrents[torrent],
                };
              });

              torrents_removed.forEach((torrent) => {
                delete this.syncStates.mainData.torrents[torrent];
              });

              // trackers
              Object.keys(trackers).forEach((tracker) => {
                this.syncStates.mainData.trackers[tracker] = {
                  ...this.syncStates.mainData.trackers[tracker],
                  ...trackers[tracker],
                };
              });

              trackers_removed.forEach((tracker) => {
                delete this.syncStates.mainData.trackers[tracker];
              });
            }

            return newRid;
          })
          .finally(() => {
            this.isMainDataPending = false;
          }),
      );
    }

    try {
      await this.syncRids.mainData;
    } catch (e) {
      this.syncRids.mainData = Promise.resolve(0);
      throw e;
    }

    return this.syncStates.mainData;
  }

  async syncTorrentPeers(hash: string): Promise<QBittorrentTorrentPeers> {
    return axios
      .get<QBittorrentSyncTorrentPeers>(`${this.apiBase}/sync/torrentPeers`, {
        params: {
          hash: hash.toLowerCase(),
          rid: 0,
        },
        headers: {Cookie: await this.authCookie},
      })
      .then(({data}) => data.peers as QBittorrentTorrentPeers);
  }

  async torrentsPause(hashes: Array<string>): Promise<void> {
    return axios
      .get(`${this.apiBase}/torrents/pause`, {
        params: {
          hashes: hashes.join('|').toLowerCase(),
        },
        headers: {Cookie: await this.authCookie},
      })
      .then(() => {
        // returns nothing
      });
  }

  async torrentsResume(hashes: Array<string>): Promise<void> {
    return axios
      .get(`${this.apiBase}/torrents/resume`, {
        params: {
          hashes: hashes.join('|').toLowerCase(),
        },
        headers: {Cookie: await this.authCookie},
      })
      .then(() => {
        // returns nothing
      });
  }

  async torrentsDelete(hashes: Array<string>, deleteFiles: boolean): Promise<void> {
    return axios
      .get(`${this.apiBase}/torrents/delete`, {
        params: {
          hashes: hashes.join('|').toLowerCase(),
          deleteFiles: deleteFiles ? 'true' : 'false',
        },
        headers: {Cookie: await this.authCookie},
      })
      .then(() => {
        // returns nothing
      });
  }

  async torrentsRecheck(hashes: Array<string>): Promise<void> {
    return axios
      .get(`${this.apiBase}/torrents/recheck`, {
        params: {
          hashes: hashes.join('|').toLowerCase(),
        },
        headers: {Cookie: await this.authCookie},
      })
      .then(() => {
        // returns nothing
      });
  }

  async torrentsSetLocation(hashes: Array<string>, location: string): Promise<void> {
    return axios
      .get(`${this.apiBase}/torrents/setLocation`, {
        params: {
          hashes: hashes.join('|').toLowerCase(),
          location,
        },
        headers: {Cookie: await this.authCookie},
      })
      .then(() => {
        // returns nothing
      });
  }

  async torrentsSetTopPrio(hashes: Array<string>): Promise<void> {
    return axios
      .get(`${this.apiBase}/torrents/topPrio`, {
        params: {
          hashes: hashes.join('|').toLowerCase(),
        },
        headers: {Cookie: await this.authCookie},
      })
      .then(() => {
        // returns nothing
      });
  }

  async torrentsSetBottomPrio(hashes: Array<string>): Promise<void> {
    return axios
      .get(`${this.apiBase}/torrents/bottomPrio`, {
        params: {
          hashes: hashes.join('|').toLowerCase(),
        },
        headers: {Cookie: await this.authCookie},
      })
      .then(() => {
        // returns nothing
      });
  }

  async torrentsAddFiles(files: Array<Buffer>, options: QBittorrentTorrentsAddOptions): Promise<void> {
    const form = new FormData();

    files.forEach((file, index) => {
      form.append('torrents', file, {
        filename: `${index}.torrent`,
        contentType: 'application/x-bittorrent',
      });
    });

    Object.keys(options).forEach((key) => {
      const property = key as keyof typeof options;
      form.append(property, `${options[property]}`);
    });

    const headers = form.getHeaders({
      Cookie: await this.authCookie,
      'Content-Length': form.getLengthSync(),
    });

    return axios
      .post(`${this.apiBase}/torrents/add`, form, {
        headers,
      })
      .then(() => {
        // returns nothing
      });
  }

  async torrentsAddURLs(urls: Array<string>, options: QBittorrentTorrentsAddOptions): Promise<void> {
    const form = new FormData();

    form.append('urls', urls.join('\n'));

    Object.keys(options).forEach((key) => {
      const property = key as keyof typeof options;
      form.append(property, `${options[property]}`);
    });

    const headers = form.getHeaders({
      Cookie: await this.authCookie,
      'Content-Length': form.getLengthSync(),
    });

    return axios
      .post(`${this.apiBase}/torrents/add`, form, {
        headers,
      })
      .then(() => {
        // returns nothing
      });
  }

  async torrentsAddTags(hashes: Array<string>, tags: Array<string>): Promise<void> {
    return axios
      .get(`${this.apiBase}/torrents/addTags`, {
        params: {
          hashes: hashes.join('|').toLowerCase(),
          tags: tags.join(','),
        },
        headers: {Cookie: await this.authCookie},
      })
      .then(() => {
        // returns nothing
      });
  }

  async torrentsRemoveTags(hashes: Array<string>, tags?: Array<string>): Promise<void> {
    return axios
      .get(`${this.apiBase}/torrents/removeTags`, {
        params: {
          hashes: hashes.join('|').toLowerCase(),
          tags: tags?.join(','),
        },
        headers: {Cookie: await this.authCookie},
      })
      .then(() => {
        // returns nothing
      });
  }

  async torrentsAddTrackers(hash: string, urls: Array<string>): Promise<void> {
    if (urls.length > 0) {
      return axios
        .get(`${this.apiBase}/torrents/addTrackers`, {
          params: {
            hash: hash.toLowerCase(),
            urls: urls.join('\n'),
          },
          headers: {Cookie: await this.authCookie},
        })
        .then(() => {
          // returns nothing
        });
    }
  }

  async torrentsReannounce(hashes: Array<string>): Promise<void> {
    if (hashes.length > 0) {
      return axios
        .get(`${this.apiBase}/torrents/reannounce`, {
          params: {
            hashes: hashes.join('|').toLowerCase(),
          },
          headers: {Cookie: await this.authCookie},
        })
        .then(() => {
          // returns nothing
        });
    }
  }

  async torrentsRemoveTrackers(hash: string, urls: Array<string>): Promise<void> {
    if (urls.length > 0) {
      return axios
        .get(`${this.apiBase}/torrents/removeTrackers`, {
          params: {
            hash: hash.toLowerCase(),
            urls: urls.join('|'),
          },
          headers: {Cookie: await this.authCookie},
        })
        .then(() => {
          // returns nothing
        });
    }
  }

  async torrentsSetSuperSeeding(hashes: Array<string>, value: boolean): Promise<void> {
    if (hashes.length > 0) {
      return axios
        .get(`${this.apiBase}/torrents/setSuperSeeding`, {
          params: {
            hashes: hashes.join('|').toLowerCase(),
            value: value ? 'true' : 'false',
          },
          headers: {Cookie: await this.authCookie},
        })
        .then(() => {
          // returns nothing
        });
    }
  }

  async torrentsToggleSequentialDownload(hashes: Array<string>): Promise<void> {
    if (hashes.length > 0) {
      return axios
        .get(`${this.apiBase}/torrents/toggleSequentialDownload`, {
          params: {
            hashes: hashes.join('|').toLowerCase(),
          },
          headers: {Cookie: await this.authCookie},
        })
        .then(() => {
          // returns nothing
        });
    }
  }

  async torrentsFilePrio(hash: string, ids: Array<number>, priority: QBittorrentTorrentContentPriority) {
    return axios
      .get(`${this.apiBase}/torrents/filePrio`, {
        params: {
          hash: hash.toLowerCase(),
          id: ids.join('|'),
          priority,
        },
        headers: {Cookie: await this.authCookie},
      })
      .then(() => {
        // returns nothing
      });
  }

  constructor(connectionSettings: QBittorrentConnectionSettings) {
    this.connectionSettings = connectionSettings;
    this.apiBase = `${connectionSettings.url}/api/v2`;
    this.updateAuthCookie().catch(() => undefined);
  }
}

export default ClientRequestManager;
