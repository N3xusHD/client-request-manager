import type { infer as zodInfer } from 'zod';
declare const delugeConnectionSettingsSchema: import("zod").ZodObject<{
    client: import("zod").ZodLiteral<"Deluge">;
    type: import("zod").ZodLiteral<"rpc">;
    version: import("zod").ZodLiteral<1>;
    host: import("zod").ZodString;
    port: import("zod").ZodNumber;
    username: import("zod").ZodString;
    password: import("zod").ZodString;
}, "strict", import("zod").ZodTypeAny, {
    type: "rpc";
    client: "Deluge";
    version: 1;
    username: string;
    password: string;
    host: string;
    port: number;
}, {
    type: "rpc";
    client: "Deluge";
    version: 1;
    username: string;
    password: string;
    host: string;
    port: number;
}>;
export declare type DelugeConnectionSettings = zodInfer<typeof delugeConnectionSettingsSchema>;
declare const qBittorrentConnectionSettingsSchema: import("zod").ZodObject<{
    client: import("zod").ZodLiteral<"qBittorrent">;
    type: import("zod").ZodLiteral<"web">;
    version: import("zod").ZodLiteral<1>;
    url: import("zod").ZodString;
    username: import("zod").ZodString;
    password: import("zod").ZodString;
}, "strict", import("zod").ZodTypeAny, {
    type: "web";
    client: "qBittorrent";
    version: 1;
    url: string;
    username: string;
    password: string;
}, {
    type: "web";
    client: "qBittorrent";
    version: 1;
    url: string;
    username: string;
    password: string;
}>;
export declare type QBittorrentConnectionSettings = zodInfer<typeof qBittorrentConnectionSettingsSchema>;
declare const rTorrentTCPConnectionSettingsSchema: import("zod").ZodObject<{
    client: import("zod").ZodLiteral<"rTorrent">;
    type: import("zod").ZodLiteral<"tcp">;
    version: import("zod").ZodLiteral<1>;
    host: import("zod").ZodString;
    port: import("zod").ZodNumber;
}, "strict", import("zod").ZodTypeAny, {
    type: "tcp";
    client: "rTorrent";
    version: 1;
    host: string;
    port: number;
}, {
    type: "tcp";
    client: "rTorrent";
    version: 1;
    host: string;
    port: number;
}>;
export declare type RTorrentTCPConnectionSettings = zodInfer<typeof rTorrentTCPConnectionSettingsSchema>;
declare const rTorrentSocketConnectionSettingsSchema: import("zod").ZodObject<{
    client: import("zod").ZodLiteral<"rTorrent">;
    type: import("zod").ZodLiteral<"socket">;
    version: import("zod").ZodLiteral<1>;
    socket: import("zod").ZodString;
}, "strict", import("zod").ZodTypeAny, {
    type: "socket";
    client: "rTorrent";
    version: 1;
    socket: string;
}, {
    type: "socket";
    client: "rTorrent";
    version: 1;
    socket: string;
}>;
export declare type RTorrentSocketConnectionSettings = zodInfer<typeof rTorrentSocketConnectionSettingsSchema>;
declare const rTorrentConnectionSettingsSchema: import("zod").ZodUnion<[import("zod").ZodObject<{
    client: import("zod").ZodLiteral<"rTorrent">;
    type: import("zod").ZodLiteral<"tcp">;
    version: import("zod").ZodLiteral<1>;
    host: import("zod").ZodString;
    port: import("zod").ZodNumber;
}, "strict", import("zod").ZodTypeAny, {
    type: "tcp";
    client: "rTorrent";
    version: 1;
    host: string;
    port: number;
}, {
    type: "tcp";
    client: "rTorrent";
    version: 1;
    host: string;
    port: number;
}>, import("zod").ZodObject<{
    client: import("zod").ZodLiteral<"rTorrent">;
    type: import("zod").ZodLiteral<"socket">;
    version: import("zod").ZodLiteral<1>;
    socket: import("zod").ZodString;
}, "strict", import("zod").ZodTypeAny, {
    type: "socket";
    client: "rTorrent";
    version: 1;
    socket: string;
}, {
    type: "socket";
    client: "rTorrent";
    version: 1;
    socket: string;
}>]>;
export declare type RTorrentConnectionSettings = zodInfer<typeof rTorrentConnectionSettingsSchema>;
declare const transmissionConnectionSettingsSchema: import("zod").ZodObject<{
    client: import("zod").ZodLiteral<"Transmission">;
    type: import("zod").ZodLiteral<"rpc">;
    version: import("zod").ZodLiteral<1>;
    url: import("zod").ZodString;
    username: import("zod").ZodString;
    password: import("zod").ZodString;
}, "strict", import("zod").ZodTypeAny, {
    type: "rpc";
    client: "Transmission";
    version: 1;
    url: string;
    username: string;
    password: string;
}, {
    type: "rpc";
    client: "Transmission";
    version: 1;
    url: string;
    username: string;
    password: string;
}>;
export declare type TransmissionConnectionSettings = zodInfer<typeof transmissionConnectionSettingsSchema>;
export declare const clientConnectionSettingsSchema: import("zod").ZodUnion<[import("zod").ZodObject<{
    client: import("zod").ZodLiteral<"Deluge">;
    type: import("zod").ZodLiteral<"rpc">;
    version: import("zod").ZodLiteral<1>;
    host: import("zod").ZodString;
    port: import("zod").ZodNumber;
    username: import("zod").ZodString;
    password: import("zod").ZodString;
}, "strict", import("zod").ZodTypeAny, {
    type: "rpc";
    client: "Deluge";
    version: 1;
    username: string;
    password: string;
    host: string;
    port: number;
}, {
    type: "rpc";
    client: "Deluge";
    version: 1;
    username: string;
    password: string;
    host: string;
    port: number;
}>, import("zod").ZodObject<{
    client: import("zod").ZodLiteral<"qBittorrent">;
    type: import("zod").ZodLiteral<"web">;
    version: import("zod").ZodLiteral<1>;
    url: import("zod").ZodString;
    username: import("zod").ZodString;
    password: import("zod").ZodString;
}, "strict", import("zod").ZodTypeAny, {
    type: "web";
    client: "qBittorrent";
    version: 1;
    url: string;
    username: string;
    password: string;
}, {
    type: "web";
    client: "qBittorrent";
    version: 1;
    url: string;
    username: string;
    password: string;
}>, import("zod").ZodUnion<[import("zod").ZodObject<{
    client: import("zod").ZodLiteral<"rTorrent">;
    type: import("zod").ZodLiteral<"tcp">;
    version: import("zod").ZodLiteral<1>;
    host: import("zod").ZodString;
    port: import("zod").ZodNumber;
}, "strict", import("zod").ZodTypeAny, {
    type: "tcp";
    client: "rTorrent";
    version: 1;
    host: string;
    port: number;
}, {
    type: "tcp";
    client: "rTorrent";
    version: 1;
    host: string;
    port: number;
}>, import("zod").ZodObject<{
    client: import("zod").ZodLiteral<"rTorrent">;
    type: import("zod").ZodLiteral<"socket">;
    version: import("zod").ZodLiteral<1>;
    socket: import("zod").ZodString;
}, "strict", import("zod").ZodTypeAny, {
    type: "socket";
    client: "rTorrent";
    version: 1;
    socket: string;
}, {
    type: "socket";
    client: "rTorrent";
    version: 1;
    socket: string;
}>]>, import("zod").ZodObject<{
    client: import("zod").ZodLiteral<"Transmission">;
    type: import("zod").ZodLiteral<"rpc">;
    version: import("zod").ZodLiteral<1>;
    url: import("zod").ZodString;
    username: import("zod").ZodString;
    password: import("zod").ZodString;
}, "strict", import("zod").ZodTypeAny, {
    type: "rpc";
    client: "Transmission";
    version: 1;
    url: string;
    username: string;
    password: string;
}, {
    type: "rpc";
    client: "Transmission";
    version: 1;
    url: string;
    username: string;
    password: string;
}>]>;
export declare type ClientConnectionSettings = zodInfer<typeof clientConnectionSettingsSchema>;
export {};
