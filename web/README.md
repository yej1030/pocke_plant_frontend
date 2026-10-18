# Disease screen web execution

Run `npm ci`, copy `.env.example` to `.env.local`, configure the existing model URL and private token-file location, and run `npm run web`. Open `http://127.0.0.1:5173` or run the **질병 예측 웹 실행** task in VS Code.

This development entry point imports the production `DiseasePredict` and `DiseaseResult` React Native components through React Native for Web. Browser-only adapters supply the image picker and multipart request. The server-side Vite proxy adds model authentication; private values are not compiled into the browser bundle. The native application's request path remains mobile → authenticated AWS backend → model gateway.

The local web preview calls the model gateway directly through its loopback proxy. It does not represent a logged-in mobile session or implement other mobile screens, Bluetooth, native camera APIs, or account management. The memo is shown with the result but is not currently a model input. The status card performs live HTTP checks; an AWS 401/403 means the endpoint is reachable and still requires login.

Choose a species, add a JPEG/PNG/WebP photo using the image button, and press **진단하기**. Candidate percentages are explicitly relative model comparison scores, not validated disease probabilities. Monstera results have no fabricated percentage. A damaged leaf cannot display the classifier's conflicting healthy ranking.

`npm run web:build` checks the browser bundle. Its static output still needs an authenticated server-side API proxy; do not publish it with model secrets or expect it to serve inference by itself. Vite listens only on loopback for local execution.
