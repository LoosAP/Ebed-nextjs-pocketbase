import { pb } from "@/utils/pocketbase";
import Cors from "cors";

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    try {
      pb.authStore.clear();

      res.setHeader("set-cookie", pb.authStore.exportToCookie());
      res.status(200).json({ message: "Kilépve" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Hiba történt, Próbálkozzon újra" });
    }
  } else {
    res.status(400).json({ message: "Csak POST kérés engedélyezett" });
  }
}
