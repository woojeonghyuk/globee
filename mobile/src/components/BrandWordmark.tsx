import { Image, ImageStyle, StyleProp } from 'react-native';

type BrandWordmarkProps = {
  width?: number;
  style?: StyleProp<ImageStyle>;
};

const aspectRatio = 445 / 126;

export default function BrandWordmark({
  width = 150,
  style,
}: BrandWordmarkProps) {
  return (
    <Image
      accessibilityLabel="Globee"
      resizeMode="contain"
      source={require('@/assets/images/globee-wordmark.png')}
      style={[
        {
          width,
          height: width / aspectRatio,
        },
        style,
      ]}
    />
  );
}
