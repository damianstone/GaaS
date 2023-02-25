## Initialization

#### Create a virtual environment

```python
python3 -m venv venv-gaas
source venv-gaas/bin/activate
```

#### Install requirements.txt

```python
pip install -r requirements.txt
```

#### Create a .env file (if using postgreSQL)

```python
LOCAL_DB_NAME=name-of-the-database
LOCAL_DB_USER=db-user-name
LOCAL_DB_PASSWORD=db-password
LOCAL_DB_HOST=host-you-want-to-use
LOCAL_DB_PORT=post-you-want-to-use
```

#### Migrate models

```python
python manage.py makemigrations
python manage.py migrate
```

#### Run

```python
python manage.py runserver
```
