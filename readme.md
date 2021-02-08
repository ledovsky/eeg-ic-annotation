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

Set up dev db (optional)

```
docker exec -it eeg-ic-annotation_back_1 /bin/bash

# then inside the container
cd drf_backend
python manage.py init_dev_db
python manage.py update_component_plots --dataset test_dataset
python manage.py update_links --dataset test_dataset
python manage.py update_plots --dataset test_dataset
```


## Db dump

```
pg_dump --host localhost --port 5433 -U postgres postgres > eeg_ica_dump
```

```
psql --host=localhost --port 5433 -U postgres postgres_2 < eeg_ica_dump
```
