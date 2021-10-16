import { useState } from "react";
import marked from "marked";
import DOMPurify from "dompurify";
import { defaultMarkdown } from "./defaultMarkdown";

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const createMarkup = () => {
    let rawMarkup = DOMPurify.sanitize(marked(markdown));
    return { __html: rawMarkup };
  };

  return (
    <>
      <header className="bg-dark">
        <div className="text-center p-3">
          <h1 className="text-info">Markdown Preview</h1>
        </div>
      </header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 p-3">
            <textarea
              className="form-control"
              id="editor"
              style={{ height: "85vh", width: "100%", resize: "none" }}
              placeholder="Type some markdown here!"
              value={markdown}
              onChange={(e) => {
                setMarkdown(e.target.value);
              }}
            ></textarea>
          </div>
          <div
            className="col-md-6 p-3 overflow-auto"
            style={{ height: "85vh" }}
          >
            <div id="preview" dangerouslySetInnerHTML={createMarkup()}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
