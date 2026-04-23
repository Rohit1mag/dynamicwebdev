# dynamicwebdev

This repo contains my CSC 437 prototype work. Right now the main app is in `packages/proto`, which is a static HTML/CSS investment tracker prototype.

## Local run

From the repo root:

```bash
npm install
npm -w proto start
```

The `proto` server runs with `http-server` on port `3000`.

## Deploy notes for csse.dev

These are the basic steps I used / would use on the VPS:

```bash
ssh <calpoly-name>@<calpoly-name>-host.csse.dev
sudo apt update
curl -sL https://deb.nodesource.com/setup_20.x -o /tmp/nodesource_setup.sh
sudo bash /tmp/nodesource_setup.sh
sudo apt-get install nodejs -y
node -v
git clone https://github.com/Rohit1mag/dynamicwebdev.git
cd dynamicwebdev
npm install
nohup npm -w proto start &
exit
```

Then the site should be available at:

`https://<calpoly-name>.csse.dev/`

If I update the repo later, the VPS version can be refreshed with:

```bash
cd dynamicwebdev
git pull
npm install
nohup npm -w proto start &
```
