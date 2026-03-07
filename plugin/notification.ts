type MessageSnapshot = { messageID: string | null; text: string | null };

const lastMessageBySession = new Map<string, MessageSnapshot>();
const isMainSessionCache = new Map<string, boolean>();

type CommandRunner = (strings: TemplateStringsArray, ...values: unknown[]) => Promise<unknown>;

type RuntimeEvent = {
    type: string;
    properties?: {
        sessionID?: string;
        info?: {
            id?: string;
            parentID?: string;
        };
        part?: {
            type?: string;
            sessionID?: string;
            messageID?: string | null;
            text?: string | null;
        };
    };
};

type PluginClient = {
    session?: {
        get?: (args: { path: { id: string } }) => Promise<{ data?: { parentID?: string } | null }>;
    };
};

export const NotificationPlugin = async ({ $, project, client, directory, worktree }: {
    $: CommandRunner;
    project?: unknown;
    client?: PluginClient;
    directory?: unknown;
    worktree?: unknown;
}) => {
    void project;
    void directory;
    void worktree;

    return {
        event: async ({ event }: { event: RuntimeEvent }) => {
            const platform = process.platform;
            const title = "opencode";

            if (event.type === "session.created" || event.type === "session.updated") {
                const sessionInfo = event.properties?.info;
                if (sessionInfo?.id) {
                    isMainSessionCache.set(sessionInfo.id, !sessionInfo.parentID);
                }
            }

            if (event.type === "message.part.updated") {
                const part = event.properties?.part;
                if (part?.type === "text") {
                    const sessionID = part.sessionID;
                    const { messageID = null, text = null } = part;
                    if (sessionID) {
                        lastMessageBySession.set(sessionID, { messageID, text });
                    }
                }
            }

            if (event.type === "session.idle") {
                const sessionID = event.properties?.sessionID;
                if (!sessionID) return;

                const shouldNotify = await isMainSession(sessionID, client);
                if (!shouldNotify) return;

                const msg = getIdleSummary(lastMessageBySession.get(sessionID)?.text ?? null) ?? "Idle";

                if (platform === "darwin") {
                    await $`osascript -e 'display notification ${JSON.stringify(msg)} with title "${title}"'`;
                } else if (platform === "linux") {
                    await $`notify-send ${title} ${msg}`;
                }
            }
        },
    }
}

function getIdleSummary(text: string | null) {
    if (!text) return;
    const idleMatch = text.match(/\[_\*\]Summary:\[_\*\]? (.*)\[_\*\]?$/m);
    if (idleMatch && idleMatch[1]) {
        return idleMatch[1].trim();
    }
    if (text.length > 80) {
        return text.slice(0, 80) + "...";
    }
    return text;
}

async function isMainSession(sessionID: string, client?: PluginClient) {
    const cached = isMainSessionCache.get(sessionID);
    if (cached !== undefined) return cached;

    const session = await client?.session?.get?.({ path: { id: sessionID } });
    const isMain = !session?.data?.parentID;
    isMainSessionCache.set(sessionID, isMain);

    if (!isMain) {
        lastMessageBySession.delete(sessionID);
    }

    if (isMainSessionCache.size > 200) {
        const oldestSessionID = isMainSessionCache.keys().next().value;
        if (oldestSessionID) {
            isMainSessionCache.delete(oldestSessionID);
            lastMessageBySession.delete(oldestSessionID);
        }
    }

    return isMain;
}
