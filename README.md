# DeployMaster

DeployMaster contains everything needed to run the Laven e‑commerce sample.
It includes a Spring Boot backend, a Next.js frontend, database scripts and a
Jenkins pipeline.  Docker Compose can be used to orchestrate the entire stack.

## Repository layout

- **LavenShopBackend/** – Spring Boot API service
- **LavenFontend/lavenshop/** – Next.js frontend application
- **database/** – MySQL initialization scripts
- **docker-compose.yml** – compose file bringing up the services
- **Jenkinsfile** – CI pipeline building and starting the stack

## Running the stack

Ensure Docker and Docker Compose are installed. From the repository root run:

```bash
docker-compose up --build
```

The services will be built and started:

- Backend available on [http://localhost:8080](http://localhost:8080)
- Frontend available on [http://localhost:3000](http://localhost:3000)
- Jenkins UI on [http://localhost:8081](http://localhost:8081)

MySQL is exposed on port `3307` and Redis on `6379`.

## Development

You can also run the services individually during development.

### Backend

```bash
cd LavenShopBackend
./mvnw spring-boot:run
```

### Frontend

```bash
cd LavenFontend/lavenshop
npm install
npm run dev
```

For a production build of the frontend use:

```bash
npm run build
npm start
```
