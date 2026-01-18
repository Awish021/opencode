let lastMessage: { messageID: string | null; text: string | null } = {
    messageID: null,
    text: null,
};

export const NotificationPlugin = async ({ project, client, $, directory, worktree }) => {
    return {
        event: async ({ event }) => {
            const platform = process.platform;
            const title = "opencode";

            if (event.type === "message.part.updated") {
                if (event.properties.part.type === "text") {
                    const { messageID, text } = event.properties.part;
                    lastMessage = { messageID, text };
                }
            }

            if (event.type === "session.idle") {
                const msg = getIdleSummary(lastMessage?.text) ?? "Idle";

                if (platform === "darwin") {
                    await $`osascript -e 'display notification ${JSON.stringify(msg)} with title "${title}"'`;
                    // await $`afplay /System/Library/Sounds/Blow.aiff 2>/dev/null || true`;
                } else if (platform === "linux") {
                    await $`notify-send "${title}" "${msg.replace(/'/g, "'\\''")}"`;
                    // await $`paplay /usr/share/sounds/freedesktop/stereo/complete.oga 2>/dev/null || true`;
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