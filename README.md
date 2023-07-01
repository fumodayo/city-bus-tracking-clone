# CITY DANABUS TRACKING

## Web Technical Information

City danang bus tracking is developed with Nextjs 13.

## How to use

1. git clone https://github.com/fumodayo/GMH-Application
2. npm i
3. npm run dev

## Config file

```
NEXT_PUBLIC_MAPBOX_KEY=
DATABASE_URL=
NODE_ENV=
```

## Crawl data by puppeteer
```
const browser = await puppeteer.launch({ headless: true, timeout: 0 });
const page = await browser.newPage();

await page.goto(`${WEB_URL}`,{ waitUntil: "networkidle0" });

await page.click("#direction-return");

await page.$$eval(".route-detail-station",
  (elements, code) => {
    return elements.map((element) => {
      const title = element.getAttribute("title");
      const lat = element
        .querySelector("[data-lat]")
        .getAttribute("data-lat");
      const lng = element
        .querySelector("[data-lng]")
        .getAttribute("data-lng");
      return {
        name: title,
        location: { lat: parseFloat(lat), lng: parseFloat(lng) },
        code: code,
      };
    });
  }, 
  code
);

await browser.close();
```
