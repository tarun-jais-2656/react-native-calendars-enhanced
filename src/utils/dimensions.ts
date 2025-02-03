import { Dimensions, PixelRatio, Platform } from 'react-native'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

export const DesignWidth = 393
export const DesignHeight = 852
const iphone6ScreenWidth = 375

// Exporting a constant named 'screenWidth' that holds the width of the device's window (screen).
export const screenWidth = Dimensions.get('window').width
export const smallDevice = screenWidth < iphone6ScreenWidth
export const mediumDevice = screenWidth <= iphone6ScreenWidth
export const largeDevice = screenWidth > iphone6ScreenWidth
export const isDeviceLarge = screenWidth > 600
// Exporting a constant named 'screenHeight' that holds the height of the device's window (screen).
export const screenHeight = Dimensions.get('window').height

export const platformVersion = Platform.Version
const { width: SCREEN_WIDTH } = Dimensions.get('window')
const scale = SCREEN_WIDTH / 375
export const isIOS = (): boolean => {
  return Platform.OS === 'ios'
}

export const isAndroid = (): boolean => {
  return Platform.OS === 'android'
}
export const isTablet = (): boolean => {
  const { width, height } = Dimensions.get('screen')
  // You can adjust the threshold based on your tablet's width
  return width >= 600 && height >= 600
}

export function normalize(size: number) {
  return PixelRatio.roundToNearestPixel(size * scale)
}

export const vw = (width: number) => {
  const percent = (width / DesignWidth) * 100
  const elemWidth = parseFloat(percent + '%')
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100)
}

export const vh = (height: number) => {
  const percent = (height / DesignHeight) * 100
  const elemHeight = parseFloat(percent + '%')
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100)
}
export const getDeviceOrientation = (): 'portrait' | 'landscape' => {
  const { width, height } = Dimensions.get('screen')
  return width > height ? 'landscape' : 'portrait'
}

export const getResponsiveDimension = (
  mobileValue: number,
  tabletPortraitValue: number,
  tabletLandscapeValue: number,
) => {
  const isTablet =
    (screenWidth >= 600 && screenHeight >= 600) ||
    (screenWidth >= 600 && screenHeight >= 960)

  if (isTablet) {
    return screenWidth > screenHeight
      ? tabletLandscapeValue
      : tabletPortraitValue
  }

  return mobileValue
}

export const getHp = (
  mobileHeight: number,
  tabletPortraitHeight: number,
  tabletLandscapeHeight: number,
) => {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height

  const isTablet =
    (screenWidth >= 600 && screenHeight >= 600) ||
    (screenWidth >= 600 && screenHeight >= 960)

  if (isTablet) {
    return screenWidth > screenHeight
      ? hp(`${(tabletLandscapeHeight / screenHeight) * 100}%`)
      : hp(`${(tabletPortraitHeight / screenHeight) * 100}%`)
  }

  return hp(`${(mobileHeight / screenHeight) * 100}%`)
}

export const getWp = (
  mobileWidth: number,
  tabletPortraitWidth: number,
  tabletLandscapeWidth: number,
) => {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height

  const isTablet =
    (screenWidth >= 600 && screenHeight >= 600) ||
    (screenWidth >= 600 && screenHeight >= 960)

  if (isTablet) {
    return screenWidth > screenHeight
      ? wp(`${(tabletLandscapeWidth / screenWidth) * 100}%`)
      : wp(`${(tabletPortraitWidth / screenWidth) * 100}%`)
  }

  return wp(`${(mobileWidth / screenWidth) * 100}%`)
}
