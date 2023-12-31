import CartIcon from "@/src/component/Icons/CartIcon";
import LightningIcon from "@/src/component/Icons/LightningIcon";
import StartIcon from "@/src/component/Icons/StartIcon";
import ShortNavList from "@/src/component/ShortNavList";
import Text from "@/src/component/Text";
import { addCart, getCartById, getProductById } from "@/src/controller/User";
import Layout from "@/src/layout/Layout";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { PiShoppingCartFill } from "react-icons/pi";
import { useRouter } from "next/router";

export default function ProductPage() {
  const dispatch = useDispatch();
  // const router = useRouter();
  const router = useRouter();
  const windowsID =
    typeof window !== "undefined" && window.localStorage.getItem("ProductID");
  const ProductID = JSON.parse(windowsID);
  // console.log("QUERY", data._id);
  const fetchProductById = async () => {
    await dispatch(getProductById(ProductID));
  };
  useEffect(() => {
    fetchProductById();
  }, []);

  const productById = useSelector((state) => state.products.productById);
  // console.log("productById", productById);

  const windows =
    typeof window !== "undefined" && window.localStorage.getItem("userData");
  const userData = JSON.parse(windows);
  // console.log("UserData", userData);
  return (
    <Layout customChild={"gap-0"} customClass={"gap-0"}>
      <ShortNavList />
      <div className="h-[100%] w-[90%] flex ">
        <div className="bg-white h-[92vh] w-[40%] p-2 flex-col flex sticky top-14">
          <div className="w-[100%] flex items-center  p-2">
            <div className="w-[15%] h-[450px] "></div>
            <div className="w-[85%] flex-col flex gap-2">
              <div className="w-[100%] h-[450px] border-[1px] p-2 flex items-center justify-center">
                <img src={productById?.image?.url} alt="loading..." />
              </div>
              <div className="w-[100%]  flex items-center gap-2">
                <button
                  className="flex items-center justify-center gap-2 text-[white] bg-[#ff9f00] w-[50%] p-4 font-bold text-md"
                  onClick={async () => {
                    const product_id = productById?._id;
                    const user_id = userData?._id;
                    userData
                      ? (await addCart(product_id, user_id)) &&
                        router.push("/cartPage")
                      : toast.error("SignIn to your Account to access Cart!");
                  }}
                >
                  <PiShoppingCartFill className={"text-xl font-bold"} />
                  ADD TO CART
                </button>
                <button
                  className="flex items-center justify-center gap-2 text-[white] bg-[#fb641b] w-[50%] p-4 font-bold text-md"
                  onClick={() => {
                    toast.error("SignIn to your Account!");
                  }}
                >
                  <LightningIcon customClass={"text-lg font-bold"} />
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white h-[1000px] w-[60%] p-2 ">
          <div className="w-[100%] p-2 flex-col flex gap-2 ">
            <Text name={productById?.title} customClass={"text-xl"} />
            <div className="w-[100%] flex items-center gap-2">
              <div className="h-[20px] rounded-sm bg-[#388e3c] text-xs text-white flex justify-center items-center gap-1 w-[40px] cursor-pointer">
                <Text name={"1.4"} customClass={"font-semibold"} />
                <StartIcon />
              </div>
              <Text
                name={productById?.title}
                customClass={"text-sm text-[gray] font-semibold"}
              />
            </div>
            <Text
              name={"₹ " + productById?.price}
              customClass={"text-[30px] font-bold"}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
