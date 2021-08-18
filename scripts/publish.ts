import { execSync } from "child_process";
import path from "path";

// execSync("npm run build", { stdio: "inherit" });

execSync("npm publish", {
  stdio: "inherit",
  //   cwd: path.join("packages", name, "dist"),
//   cwd: "dist",
});
