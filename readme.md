# ALICE Annotation Tool

## How to set up dev

Create a docker network if not created

```
docker network create alice-network
```

Build and run docker-compose. You need at least 8 Gb RAM for the build

```
docker-compose build
docker-compose up -d
```

Set up .env files.

```
cp back/.env.sample back/.env
cp postgres/.env.sample postgres/.env
```

For production change secret key in back/.env and postgres password in postgres/.env.

### First start up

If you havn't already, build the image

```
docker-compose build
```

First, we need to init postgres db

```
docker-compose up postgres
```

After initialization is done exit docker-compose and start all the containers

```
docker-compose up
```

If everything is fine you can run it in the background mode

```
docker-compose up -d
```

### Updating

Use a regular docker-compose command sequence

```
docker-compose down
docker-compose build
docker-compose up -d
```


### For development

Set up dev db

```
docker exec -it eeg-ic-annotation_back_1 /bin/bash

# then inside the container
cd drf_backend
python manage.py init_dev_db
python manage.py update_component_plots --dataset test_dataset
python manage.py update_links --dataset test_dataset
python manage.py update_plots --dataset test_dataset
```

You can login as admin/admin


## Db dump

```
pg_dump --host localhost --port 5433 -U postgres postgres > eeg_ica_dump
```

```
psql --host=localhost --port 5433 -U postgres postgres_2 < eeg_ica_dump
```
