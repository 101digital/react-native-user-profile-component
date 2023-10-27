import * as React from "react"
import Svg, { Path } from "react-native-svg"

const TickIcon = (props) => (
  <Svg
    width={10}
    height={8}
    fill="none"
  >
    <Path
      fill="#00BA88"
      fillRule="evenodd"
      d="M9.78.64a.75.75 0 0 1 0 1.06L4.11 7.36a.75.75 0 0 1-1.06 0L.22 4.53a.75.75 0 1 1 1.06-1.06l2.3 2.3L8.72.64a.75.75 0 0 1 1.06 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
export { TickIcon };
