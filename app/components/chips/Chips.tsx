"use client";

const chipItems = [
  {
    id: "1",
    icon: "",
    name: "Nhà hàng",
    type: "restaurant",
  },
  {
    id: "2",
    icon: "Cà phê",
    name: "Cà phê",
  },
  {
    id: "3",
    icon: "",
    name: "Cửa hàng tạp hóa",
  },
  {
    id: "4",
    icon: "",
    name: "Trường học",
  },
];

export const Chip = ({ name }) => {
  return (
    <div
      className="
        bg-white 
        text-black 
        text-sm 
        font-semibold 
        shadow-[0_2px_3px_rgba(0,0,0,0.1607843137254902)] 
        cursor-pointer 
        px-3 
        py-1.5 
        rounded-3xl
        flex
        justify-center 
        items-center 
        w-fit
        h-10
        "
    >
      {name}
    </div>
  );
};

const Chips = () => {
  return (
    <div className="p-2 flex flex-row">
      {chipItems.map((chip) => (
        <Chip key={chip.id} name={chip.name} />
      ))}
    </div>
  );
};

export default Chips;
