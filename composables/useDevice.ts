export default function () {
  const userAgent = import.meta.server
    ? useRequestHeaders()['user-agent'] || ''
    : navigator.userAgent
  const isMobile = ref(/mobile|android|iphone|ipad/i.test(userAgent))

  return { isMobile }
}
