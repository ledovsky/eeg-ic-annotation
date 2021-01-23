Db dump

```
pg_dump --host localhost --port 5433 -U postgres postgres > eeg_ica_dump
```

```
psql --host=localhost --port 5433 -U postgres postgres_2 < eeg_ica_dump
```

```
docker run -p 5432:5432 -d -e POSTGRES_PASSWORD=pwd postgres
```


```
docker run -p 5434:5432 -d --env-file postgres/.env -v postgres_data:/var/lib/postgresql/data postgres
```