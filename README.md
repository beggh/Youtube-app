# YouTube Latest Videos Fetcher

- Application to fetch the latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.

## Usage

- **Predefined Search Query**: "new"
- **Sample Curl Request**:
  ```bash
  curl --location 'localhost:3001/search?title=new&nextPageToken=40&description=new'
- `nextpageToken` takes an integer representing which page results to be returned, default page size is 10.

Features

- Scheduled Fetching: A cron job runs at 30 seconds interval to fetch new data records for predefined queries and inserts new records in the database. 30 second interval helps to reduce hits on YouTube API keys and prevents key exhaustion quickly.

- Support for Multiple API Keys: The application supports up to 5 API keys. If one API key is exhausted, the application automatically switches to the next key sequentially.

Running Steps

- Clone the project
  ```bash
  git:clone https://github.com/beggh/Youtube-app.git
- Install dependencies
  ```bash
  npm install

- Run in development mode
  ```bash
  npm run start

Running with Docker Compose

- Run
  ```bash
  docker-compose up -d
Server is running at http://localhost:3001
