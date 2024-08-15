import { app } from "./app";
import { PORT, setup } from "./config/setup";

setup();

app.listen(PORT);

console.log(`Hypergate operational on port ${PORT}`);
