import type { SessionInfo, SessionMessageInfo } from "@opencode/client/promise"
import { Option, Schema } from "effect"

const channel = "cluster-admin-inbox-v1"

const admin = "cluster-admin"

const decodeLabel = Schema.decodeUnknownOption(Schema.Trim)

export function isAdminInboxSession(session: SessionInfo | undefined) {
  // Older bridge sessions have only the reserved title in the session list.
  return session?.metadata?.channel === channel || session?.title === "Inbox OpenCode — cluster-admin"
}

export function isAdminInboxMessage(
  message: SessionMessageInfo | undefined,
): message is Extract<SessionMessageInfo, { type: "synthetic" }> & { metadata: { channel: typeof channel } } {
  return message?.type === "synthetic" && message.metadata?.channel === channel
}

export function adminInboxMessage(message: SessionMessageInfo | undefined) {
  if (!isAdminInboxMessage(message)) return
  const sender = Option.getOrUndefined(decodeLabel(message.metadata.sender))
  const peer = Option.getOrUndefined(decodeLabel(message.metadata.peer))

  // The peer identifies the bridge counterpart, not the author.
  if (!sender || !peer) return

  return {
    response: sender === admin,
    sender,
    project: Option.getOrUndefined(decodeLabel(message.metadata.project)),
    text: message.description?.trim() || message.text,
  }
}
