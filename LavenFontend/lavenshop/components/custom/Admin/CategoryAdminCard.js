const CategoryAdminCard = ({
    category,
    onSelected,
    className1,
    className2,
  }) => (
    <div
      className={`flex flex-col items-center w-fit p-[8px] hover:bg-blue-100 rounded-[16px] cursor-pointer ${className1}`}
      onClick={onSelected}
    >
      <div
        className={`border-[2px] hover:border-blue-200] w-fit p-[8px] rounded-[16px] ${className2}`}
      >
        <div className="p-[4px] text-white rounded-[12px] flex items-center justify-center bg-white">
          <img
            src={category.thumbnailUrl}
            className="w-[148px] h-[148px] rounded-[8px]"
                      />
        </div>
      </div>
      <div className="text-[15px] font-semibold max-w-[140px] line-clamp-1 mt-[4px]">
                {category.name}
      </div>
    </div>
  );
  
  export default CategoryAdminCard;