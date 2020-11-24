FROM python:3.7
RUN mkdir /back
RUN mkdir /logs
WORKDIR /back
ADD requirements.txt /back/
RUN pip install -r requirements.txt
ADD . /back/
EXPOSE 8000
CMD ["/bin/bash", "/back/entrypoint.sh"]