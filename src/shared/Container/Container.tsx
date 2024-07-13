import { Props } from "./types";

export const Container: React.FC<Props> = ({
  backgroundColor = 'white',
  flexDirection = 'column',
  padding = '20px',
  borderRadius = '10px',
  height = 'auto',
  width = '100%',
  children
}) => {
  return (
    <div style={{
      backgroundColor,
      display: 'flex',
      flexDirection,
      borderRadius,
      padding,
      height,
      width
    }}>
      {children}
    </div>
  )
}