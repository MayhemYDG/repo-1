FROM pypy:3.7-slim

ADD --chown=root:root beautysh.py /usr/local/bin/beautysh.py
ADD --chown=root:root beautysh.sh /usr/local/bin/beautysh.sh

RUN pip install colorama

ENTRYPOINT [ "beautysh.sh" ]
