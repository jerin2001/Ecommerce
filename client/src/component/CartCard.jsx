import React from "react";
import Text from "./Text";
import DeleteModal from "./DeleteModal";
import QuantityCount from "./QuantityCount";

export default function CartCard({
  saveHandler,
  deleteHandler,
  price,
  description,
  title,
  img,
  btnName,
  setactiveClass,
  activeClass,
 
}) {
  return (
    <div className="bg-[white] w-[100%] h-[200px] p-4 flex items-center border-b-[1px]">
      <DeleteModal
        title={"Remove Item"}
        alert={"Are you sure you want to remove this item?"}
        open={activeClass === "remove"}
        close={() => {
          setactiveClass("!remove");
        }}
        submitHandler={deleteHandler}
      />
      <div className=" h-[100%] w-[140px] p-2 flex-col flex items-center gap-2">
        <img src={img} className="object-contain h-[80%] w-[100%]" alt="" />

        <QuantityCount />
      </div>
      <div className="h-[100%] w-[80%] flex-col flex justify-between p-2 ">
        <div>
          <Text
            name={title}
            customClass={"text-md  cursor-pointer hover:text-[#2a6fed]"}
          />
          <Text
            name={description}
            customClass={"text-xs font-semibold  text-[gray]"}
          />
        </div>
        <div className="flex items-center gap-2 ">
          <Text
            name={"₹2000"}
            customClass={"text-xs line-through font-semibold  text-[gray]"}
          />
          <Text name={"₹" + price} customClass={"text-lg font-semibold "} />
        </div>
        <div className="flex items-center justify-between w-[40%]">
          <Text
            name={btnName ? btnName : "SAVE FOR LATER"}
            customClass={
              "cursor-pointer text-md font-semibold hover:text-[#2a6fed]"
            }
            onclick={saveHandler}
          />
          <Text
            name={"REMOVE"}
            customClass={
              "text-md font-semibold cursor-pointer hover:text-[#2a6fed]"
            }
            onclick={() => {
              setactiveClass("remove");
            }}
          />
        </div>
      </div>
    </div>
  );
}
