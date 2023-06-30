# HTML to PDF API

This project provides a simple API to convert HTML documents and web pages to PDF files using [Puppeteer](https://github.com/puppeteer/puppeteer).

## Features

- Convert a URL to a PDF
- Convert an HTML string to a PDF
- Caching of generated PDFs for a specified duration

## Requirements

- [Node.js](https://nodejs.org/en/) (v12 or later)

## Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/html-to-pdf-api.git
```

2. Change to the project directory:

```
cd html-to-pdf-api
```

3. Install dependencies:

```
npm install
```

## Usage

1. Start the server:

```
npm start
```

2. Make a `GET` request to the `/api/url-to-pdf` endpoint with a URL parameter to convert a web page to a PDF:

```
GET http://localhost:3000/api/url-to-pdf?url=https://example.com
```

3. Make a `POST` request to the `/api/html-to-pdf` endpoint with a JSON payload containing an `html` property to convert an HTML string to a PDF:

```
POST http://localhost:3000/api/html-to-pdf

{
  "html": "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Sample HTML</title></head><body><h1>Hello, World!</h1><p>This is a sample HTML document to be converted to a PDF.</p></body></html>"
}
```

## Configuration

You can adjust the following configurations in the `server.js` file:

- `port`: Change the server port (default: `3000`)
- `maxConcurrentJobs`: Set the maximum number of concurrent PDF generation jobs (default: `5`)
- `stdTTL`: Set the cache time-to-live in seconds (default: `3600`)

## License

This project is licensed under the [MIT License](LICENSE).

---

Replace `https://github.com/yourusername/html-to-pdf-api.git` with your actual repository URL. This `README.md` provides information about the project, its features, requirements, installation steps, usage, and configuration options.