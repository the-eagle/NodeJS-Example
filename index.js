const http = require('http')
console.log(__dirname);

const fs = require('fs')
const path = require('path')

http
  .createServer((request, response) => {
    filePath = path.join(
      __dirname,
      'html_res',
      request.url === '/' ? 'index.html' : request.url
    )

    let extName = path.extname(filePath)

    // default content Type of a page
    let contentType = 'text/html'

    // set content Type according to requested file
    switch (extName) {
      case '.css':
        contentType = 'text/css'
        break
      case '.js':
        contentType = 'text/javascript'
        break
      case '.json':
        contentType = 'application/json'
        break
      case '.png':
        contentType = 'image/png'
        break
      case '.jpg':
        contentType = '.jpg'
        break
    }

    //handling the url by sending appropriate response file
    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code == 'ENOENT') {
          fs.readFile(path.join(__dirname, 'html_res', '404.html'), (err, data) => {
            response.writeHead(200, 'text/html')
            response.write(data);
            response.end();
          })
        } else {
          response.writeHead(500)
          response.write('Some server side error....')
          response.end()
        }
      } else {
        response.writeHead(200, contentType);
        response.write(content)
        response.end();
      }
    })
  })
  .listen(3000, _ => {
    console.log('Server is started at port 3000.....')
  })
