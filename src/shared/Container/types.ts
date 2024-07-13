import { ReactNode } from "react"

export type Props = {
  backgroundColor?: string,
  flexDirection?: 'row' | 'column',
  padding?: string,
  borderRadius?: string,
  height?: string,
  width?: string,
  children: ReactNode,
  backgroundImage?: string,
}