import { Badge } from "@opencode/ui/badge"
import { useI18n } from "@opencode/ui/context/i18n"
import { Show } from "solid-js"
import type { adminInboxMessage } from "./admin-inbox"

export function AdminInboxNotice(props: { message: NonNullable<ReturnType<typeof adminInboxMessage>> }) {
  const i18n = useI18n()

  return (
    <div
      class="min-w-0 rounded-md bg-v2-background-bg-layer-02 px-3 py-2 text-v2-text-text-base"
      classList={{
        "border-s-2 border-v2-background-bg-accent": !props.message.response,
      }}
    >
      <div class="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-13-regular leading-text-compact">
        <Badge appearance="standard" variant={props.message.response ? "neutral" : "accent"} class="shrink-0">
          {i18n.t(props.message.response ? "ui.adminInbox.response" : "ui.adminInbox.request")}
        </Badge>
        <span class="min-w-0 [overflow-wrap:anywhere]">
          {" · "}
          <bdi>{props.message.sender}</bdi>
        </span>
        <Show when={props.message.project}>
          {(project) => (
            <span class="min-w-0 [overflow-wrap:anywhere]">
              {" · "}
              <bdi>{project()}</bdi>
            </span>
          )}
        </Show>
      </div>
      <div dir="auto" class="mt-1.5 whitespace-pre-wrap [overflow-wrap:anywhere] text-13-regular leading-text-base">
        {props.message.text}
      </div>
    </div>
  )
}
