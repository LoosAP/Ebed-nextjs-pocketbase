import { pb } from "./pocketbase";

export const getPrice = async () => {
  const prices = await pb.collection("price").getOne("frr1his6oia58zd", {
    $autoCancel: false,
  });
  return prices;
};
