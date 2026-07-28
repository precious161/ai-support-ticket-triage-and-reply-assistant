# AI Support Ticket Triage System

An AI-powered backend service designed to automatically triage, categorize, and route customer support tickets. Built with a focus on speed, modularity, and strict type safety.

## Architecture

This project utilizes a monorepo structure and relies on the following core technologies:

- **API Framework:** [Fastify](https://fastify.dev/) (Native ESM)
- **Database:** PostgreSQL (`postgres:16-alpine`)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Caching/Queues:** Redis
- **Infrastructure:** Docker & Docker Compose
- **Language:** Node.js / TypeScript

### Database Schema Overview

- `tickets`: Stores incoming customer support requests.
- `ai_runs`: Tracks the AI processing status and metadata for each ticket.
- `agent_actions`: Logs the specific actions recommended or taken by the AI agent.

---

## Setup & Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) or Docker Engine

### 1. Environment Variables

This project uses two separate environment files to maintain security and separation of concerns between infrastructure and application logic.

**Root Level (Infrastructure):**
Create a `.env` file in the root directory (where `docker-compose.yml` lives):

```env
POSTGRES_USERNAME=ai-support
POSTGRES_PASSWORD=<YOUR_LOCAL_PASSWORD>
DB_NAME=ai-support-db

```

**API Level (Application):**
Create a `.env` file in `apps/api`:

```env
PORT=5000
NODE_ENV="development"
DATABASE_URL="postgresql://ai-support:<YOUR_LOCAL_PASSWORD>@127.0.0.1:5438/ai-support-db"
REDIS_HOST="127.0.0.1"
REDIS_PORT=6379

```

> **Note:** The `DATABASE_URL` explicitly uses `127.0.0.1` rather than `localhost` to ensure stable Node.js networking with Docker.

### 2. Start Infrastructure

From the **root directory**, boot up the PostgreSQL and Redis containers in the background:

```bash
docker compose up -d

```

### 3. Database Migrations

Navigate to the API application, install the dependencies, and run the Drizzle migrations to generate the tables:

```bash
cd apps/api
npm install
npx drizzle-kit migrate

```

---

## Trade-offs & Architecture Decisions

- **Drizzle ORM vs. Prisma:** Opted for Drizzle to maintain edge-compatibility, avoid a heavy Rust-based query engine, and retain SQL-like syntax in TypeScript.
- **Dockerizing Postgres 16 Alpine:** Selected the Alpine image for a smaller footprint and faster container boot times during local development, pinning to v16 to avoid data directory mismatch issues seen in newer major releases.
