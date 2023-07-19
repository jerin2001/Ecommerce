import React, { useContext, useState } from "react";
import { classNames } from "../utils/Classname";
import SearchBar from "../component/SearchBar";
import Text from "../component/Text";
import { PiDotsThreeVertical } from "react-icons/pi";
import { BsCart3 } from "react-icons/bs";
import { PiUserBold } from "react-icons/pi";
import { CiShop } from "react-icons/ci";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useRouter } from "next/router";
import HoverCard from "./HoverCard";
import { TiPlusOutline } from "react-icons/ti";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { IoMdGift } from "react-icons/io";
import { TbGiftCard } from "react-icons/tb";
import { BiPackage } from "react-icons/bi";
import LoginModal from "./LoginModal";
import { MyContext } from "../context/MyContext";
import Loaders from "./Loaders";

export default function TopBar({
  navColor,
  CartOnclick,
  hoverIt,
  sethoverIt,
  loading,
  setloading,
}) {

  const [btnEffect, setbtnEffect] = useState("");
  const router = useRouter();
  const [login, setlogin] = useState(false);
  const signIN_Options = [
    {
      id: 0,
      title: "My Profile",
      icon: <PiUserBold />,
      to: "/",
    },
    {
      id: 1,
      title: "MrJkart Plus Zone",
      icon: <TiPlusOutline />,
      to: "/",
    },
    {
      id: 2,
      title: "Orders",
      icon: <BiPackage />,
      to: "/",
    },
    {
      id: 3,
      title: "Wishlist",
      icon: <MdOutlineFavoriteBorder />,
      to: "/",
    },
    {
      id: 4,
      title: "Rewards",
      icon: <IoMdGift />,
      to: "/",
    },
    {
      id: 5,
      title: "Gift Cards",
      icon: <TbGiftCard />,
      to: "/",
    },
  ];
  return (
    <div
      className={classNames(
        navColor ? navColor : "bg-[#2874f0] text-white",
        "h-[60px] w-[100%] flex items-center justify-between gap-2 pl-16 pr-9 p-2 sticky top-0 z-10"
      )}
    >
      <div className="flex items-center gap-[50px]">
        <div
          className="flex flex-col cursor-pointer"
          onClick={() => {
            setloading("true");
            router.push("/admin");
            setloading("");
          }}
        >
          <Text
            name={"MrJkart"}
            customClass={"text-[#2a55e5] font-bold italic text-xl pl-2"}
          />
          <Text
            name={
              <p>
                Explore <span className="text-[#ffc700]">Plus</span>
              </p>
            }
            customClass={"text-[#aa9e9e] font-semibold italic text-sm "}
          />
        </div>
        <div className="h-[40px] w-[730px]">
          <SearchBar />
        </div>
      </div>
      <div className="flex items-center justify-between h-[100%] w-[490px] relative">
        {"showBtn" === hoverIt ? (
          <button
            onClick={() => {
              setlogin(true);
            }}
            className="bg-white text-[blue] p-1 w-[100px] font-semibold"
          >
            Login
          </button>
        ) : (
          <>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setloading("true");
                router.push("/authReq");
                setloading("");
              }}
            >
              <div className="text-[25px]">
                <CiShop />
              </div>
              <Text
                name={"Become a Seller"}
                customClass={"text-md font-semibold "}
              />
            </div>

            <div
              className={classNames(
                btnEffect ? "bg-[#1c41d6] text-white" : null,
                "p-2 flex items-center gap-2 cursor-pointer  rounded-lg  "
              )}
              onMouseEnter={() => {
                setbtnEffect("SignIn");
              }}
              onClick={() => {
                setlogin(true);
              }}
            >
              <div className="text-[25px]">
                <PiUserBold />
              </div>
              <Text
                name={"Sign in"}
                customClass={"text-md font-semibold hover:text-white"}
              />

              <div className="text-[20px]">
                {"SignIn" === btnEffect ? <BiChevronUp /> : <BiChevronDown />}
              </div>
            </div>

            {"SignIn" === btnEffect ? (
              <HoverCard
                close={() => {
                  setbtnEffect("");
                }}
                customClass={
                  "h-[310px] w-[280px] top-12 left-[38%] flex flex-col items-center text-black"
                }
              >
                <div className="p-2 h-[50px] w-[100%] border-b-[1px]  border-b-[lavender] flex items-center justify-between">
                  <Text name={"New Customer?"} customClass={"font-semibold "} />
                  <Text
                    onclick={() => {
                      setloading("true");
                      router.push("/loginPage");
                      setloading("");
                    }}
                    name={"Sign Up"}
                    customClass={"font-semibold text-[#1c41d6] text-lg"}
                  />
                </div>
                <div className="k h-[83%]  w-[100%] flex flex-col gap-2 justify-between">
                  {signIN_Options.map((i) => (
                    <div
                      key={i.id}
                      className="p-[6px] pl-4 flex items-center gap-2 hover:bg-[#f1f2f4]"
                    >
                      <div>{i.icon}</div>
                      <Text
                        name={i.title}
                        customClass={"text-md font-[14px] "}
                      />
                    </div>
                  ))}
                </div>
              </HoverCard>
            ) : null}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={
                CartOnclick
                  ? CartOnclick
                  : () => {
                      setloading("true");
                      router.push("/authReq");
                      setloading("");
                    }
              }
            >
              <div className="text-[25px]">
                <BsCart3 />
              </div>
              <Text name={"Cart"} customClass={"text-md font-semibold "} />
            </div>
            <div className="h-[100%] flex items-center text-[25px] ">
              <PiDotsThreeVertical />
            </div>
          </>
        )}
      </div>
      <LoginModal
        open={login}
        close={() => {
          setlogin(false);
        }}
      />
    </div>
  );
}
