/**
 * 生成随机数
 * @param min - 最小值
 * @param max - 最大值
 * @param roundingType - 四舍五入类型
 * @returns 范围内的随机数
 */
export function getRandomNumber(
  min: number = 0,
  max: number = 100,
  roundingType: 'round' | 'ceil' | 'floor' = 'round'
) {
  return Math[roundingType](Math.random() * (max - min) + min)
}

/**
 * 生成随机布尔值
 */
export function getRandomBoolean() {
  const index = getRandomNumber(0, 1)
  return [true, false][index]
}
