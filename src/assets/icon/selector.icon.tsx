import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SelectorIcon = (props) => (
  <Svg
    width={18}
    height={9}
    fill="none"
  >
    <Path
      fill="#EF24B8"
      fillRule="evenodd"
      d="M.55.419a.75.75 0 0 1 1.06 0l6.52 6.52a1.236 1.236 0 0 0 1.74 0l6.52-6.52a.75.75 0 0 1 1.06 1.06L10.93 8a2.736 2.736 0 0 1-3.86 0L.55 1.48a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </Svg>
)
export { SelectorIcon };
