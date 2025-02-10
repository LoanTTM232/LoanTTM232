import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const Profile = (props: SvgProps) => (
  <Svg viewBox="0 0 20 20" fill="none" {...props} width="30" height="30">
    <Path
      d="M3.33331 15.5001C3.33331 14.616 3.6845 13.7682 4.30962 13.1431C4.93474 12.5179 5.78259 12.1667 6.66665 12.1667H13.3333C14.2174 12.1667 15.0652 12.5179 15.6903 13.1431C16.3155 13.7682 16.6666 14.616 16.6666 15.5001C16.6666 15.9421 16.4911 16.366 16.1785 16.6786C15.8659 16.9912 15.442 17.1667 15 17.1667H4.99998C4.55795 17.1667 4.13403 16.9912 3.82147 16.6786C3.50891 16.366 3.33331 15.9421 3.33331 15.5001Z"
      stroke="currentColor"
      strokeWidth={props.strokeWidth}
      strokeLinejoin="round"
    />
    <Path
      d="M10 8.83337C11.3807 8.83337 12.5 7.71409 12.5 6.33337C12.5 4.95266 11.3807 3.83337 10 3.83337C8.61929 3.83337 7.5 4.95266 7.5 6.33337C7.5 7.71409 8.61929 8.83337 10 8.83337Z"
      stroke="currentColor"
      strokeWidth={props.strokeWidth}
    />
  </Svg>
);

export default Profile;
