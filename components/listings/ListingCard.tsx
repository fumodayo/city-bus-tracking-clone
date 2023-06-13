"use client";

interface ListingCardProps {
  code: string | number | undefined;
  name: string | undefined;
  description: string | undefined;
  color?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  code,
  name,
  description,
  color,
}) => {
  return (
    <>
      <div className="flex flex-row cursor-pointer">
        <div
          className={`  
            bg-mainColor
            flex-[0_0_25%] 
            p-2
            rounded-lg 
            text-2xl
            font-semibold
            text-white
            mr-5
            justify-center 
            items-center
            flex
            
          `}
          style={{ backgroundColor: color }}
        >
          {code}
        </div>
        <div className="flex-[0_0_55%]">
          <p className="text-base font-bold hover:text-mainColor">{name}</p>
          <p className="text-sm font-semibold">{description}</p>
        </div>
        <div className="flex-[0_0_20%] items-center justify-center mt-4">
          <input
            type="checkbox"
            className="
              w-6 
              h-6
              border-4
              flex
              ml-6
            "
          />
        </div>
      </div>
      <hr className="border-1 border-solid my-5 w-full" />
    </>
  );
};

export default ListingCard;
