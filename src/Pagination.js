function Pagination(props) {
  let { articlesCount, articlesPerPage, activePageIndex, updateCurrentPage } =
    props;

  let noOfPages = Math.ceil(articlesCount / articlesPerPage);
  let pagesArr = [];

  for (let i = 1; i <= noOfPages; i++) {
    pagesArr.push(i);
  }

  return (
    <>
      <div className="pagination flex-space">
        {activePageIndex !== 1 && noOfPages !== 0 && (
          <p
            onClick={() =>
              updateCurrentPage(
                activePageIndex - 1 < 1 ? 1 : activePageIndex - 1
              )
            }
          >
            Prev
          </p>
        )}
        {activePageIndex !== noOfPages && noOfPages !== 0 && (
          <p
            onClick={() =>
              updateCurrentPage(
                activePageIndex + 1 > noOfPages
                  ? noOfPages
                  : activePageIndex + 1
              )
            }
          >
            Next
          </p>
        )}
        <div className="flex ml10">
          {pagesArr.map((page) => (
            <span
              key={page}
              onClick={() => updateCurrentPage(page)}
              className={`click-box
                ${
                  activePageIndex === page
                    ? "pagination-count1"
                    : "pagination-count2"
                }`}
            >
              {page}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default Pagination;
