export default {}
self.addEventListener('message', (event) =>
  // eslint-disable-next-line no-console
  console.log('Worker received:', event.data)
)
self.postMessage('ping from webworker')
