FROM python:3.7
RUN mkdir /back
WORKDIR /back
ADD requirements.txt /back/
RUN pip install -r requirements.txt
ADD . /back/
WORKDIR /back/drf_backend
EXPOSE 8000
CMD ["gunicorn", "drf_backend.wsgi", "-b", "0.0.0.0:8000"]