## Setup

- `npm install -g sequelize-cli sequelize pg`
- `docker volume create pg_data`
- `docker run -d --name postgres9.5 -p 5432:5432 --volume pg_data:/var/lib/postgresql/data --restart always -e POSTGRES_PASSWORD=<some password> postgres:9.5`
- Copy `config/config.json.template` to `config/config.json` and edit in correct values
- Create `time_tracker_dev` database

## Running Project

- `npm install`
- `sequelize db:migrate`
- `npm run dev`

## Adding a new model

- `sequelize model:create --name ModelName --attributes name:string,foo:integer,bar:date`
- Update model to correct format. Update migration as needed

## Creating new migration

- `sequelize migration:create --name MigrationName`
- Edit migration file
