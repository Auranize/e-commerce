import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import en from "../lang/en";
import ar from "../lang/ar";

export const useT = () => {
  const { language } = useContext(ShopContext);

  const dict = language === "ar" ? ar : en;

  return (key) => dict[key] || key;
};
