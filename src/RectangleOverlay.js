import { PropTypes } from 'prop-types';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const RectangleOverlay = ({ previewRatio, detectedRectangle, backgroundColor, borderColor, borderWidth }) => {
  if (!detectedRectangle) return null;
  const {
    topRight,
    topLeft,
    bottomRight,
    bottomLeft,
    dimensions,
  } = detectedRectangle;
  const deviceWindow = Dimensions.get('window');
  const commands = [];
  const plotCoordNode = (cmds, point, svgCMD) => { cmds.push(`${svgCMD}${point.x},${point.y} `); };
  plotCoordNode(commands, topLeft, 'M');
  plotCoordNode(commands, bottomLeft, 'L');
  plotCoordNode(commands, bottomRight, 'L');
  plotCoordNode(commands, topRight, 'L');
  commands.push('Z');
  const d = commands.join(' ');
  return (
    <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'rgba(0,0,0,0)' }}>
      <Svg height={deviceWindow.height * previewRatio.height} width={deviceWindow.width * previewRatio.width} viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
        <Path
          d={d}
          style={{ fill: backgroundColor, stroke: borderColor, strokeWidth: borderWidth, strokeLinejoin: 'round', strokeLinecap: 'round' }}
        />
      </Svg>
    </View>
  );
};

RectangleOverlay.propTypes = {
  detectedRectangle: PropTypes.oneOfType([PropTypes.shape({
    topRight: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    topLeft: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    bottomRight: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    bottomLeft: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    dimensions: PropTypes.shape({ height: PropTypes.number, width: PropTypes.number }),
  }), PropTypes.bool]),
  previewRatio: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
};

RectangleOverlay.defaultProps = {
  detectedRectangle: false,
  backgroundColor: 'rgba(255,203,6, 0.3)',
  borderColor: 'rgb(255,203,6)',
  borderWidth: 5,
  previewRatio: {
    height: 1,
    width: 1,
  },

};

export default RectangleOverlay;