import app from './app'

app.listen(
  {
    port: 3030,
    host: '0.0.0.0',
  },
  () => {
    console.log('Server is running on http://localhost:3030')
  },
)
