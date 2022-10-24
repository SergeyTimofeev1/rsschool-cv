export function storage(key, data = null) {
  const [obj, field] = key.split('.')
  const parsed = JSON.parse(localStorage.getItem(obj)) || {}
  if (!data) {
    return field ? parsed[field] : parsed
  }
  const dataToSet = field ? {...parsed, [field]: data} : data
  localStorage.setItem(obj, JSON.stringify(dataToSet))
}

export function isEmpty (value) {
  if (value !== null && typeof value === 'object') {
    return !Object.keys(value).length
  }
  return !value || (typeof value === 'string' && !value.trim().length)
}

export function capitalize (string) {
  if ((typeof string !== 'string') || !string) { return '' }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function humanReadableTime (timeObj) {
  if (isEmpty(timeObj)) { return ''}
  let {h, m, s} = timeObj
  if (s >= 60) {
    s = 0
    m++
  }
  if (m >= 60) {
    m = 0
    h++
  }

  return {
    timeObj: {h, m, s},
    time: `${addTrailingZero(h)} : ${addTrailingZero(m)} : ${addTrailingZero(s)}`
  }
}

export function getSizeText (size) {
  return `${size}x${size}`
}

function addTrailingZero (value) {
  let result = value.toString()
  if (value < 10) { result = '0' + value }
  return result
}
