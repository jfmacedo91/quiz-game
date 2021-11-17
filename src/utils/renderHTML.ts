import { createElement } from "react"

export const Render = {
  question: (HTML: string) => {
    return createElement("span", { dangerouslySetInnerHTML: { __html: HTML } })
  },
  answer: (HTML: string) => {
    return createElement("span", { dangerouslySetInnerHTML: { __html: HTML } })
  }
}