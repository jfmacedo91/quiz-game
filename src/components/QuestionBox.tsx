import { createElement } from "react";
import { Box } from "@material-ui/system";
import { Button } from "@material-ui/core";

export function QuestionBox({ question }) {
  function renderQuestion(HTML: string) {
    return createElement("h2", { dangerouslySetInnerHTML: { __html: HTML } })
  }

  function renderAnswer(HTML: string) {
    return createElement("span", { dangerouslySetInnerHTML: { __html: HTML } })
  }

  return (
    <Box
      width="100%"
      maxWidth="700px"
      bgcolor="#FFFFFF03"
      textAlign="center"
      paddingX={ 2 }
      paddingY={ 4 }
      borderRadius="4px"
      boxShadow="1px 1px 10px -2px #00000066"
    >
      { renderQuestion(question.question) }
      <Box
        sx={ {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px"
        } }
      >
        { question.answers.map(answer => (
          <Button key={ answer }>{ renderAnswer(answer) }</Button>
        )) }
      </Box>
    </Box>
  )
}