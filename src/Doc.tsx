import Markdown from "react-markdown";
import s from "./doc.module.less";

export default function Doc({ markdown = "" }: { markdown?: string }) {
  return (
    <div className={`${s.markdown}`}>
      <Markdown>{markdown}</Markdown>
    </div>
  );
}
