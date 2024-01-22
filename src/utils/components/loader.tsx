import { Loader } from "rsuite"

export const loader = (content:string) => {
  return <Loader backdrop content={content} vertical />
}
