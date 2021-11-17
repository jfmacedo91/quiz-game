import { createElement } from "react"

export function renderHTML(HTML: string) {
  return createElement("span", { dangerouslySetInnerHTML: { __html: HTML } })
}