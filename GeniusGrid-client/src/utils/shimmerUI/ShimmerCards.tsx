
function ShimmerCards() {
  return (
    <>
      <section className="text-gray-700 body-font mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="md:mx-24 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="w-full h-72">
                <div className="bg-white overflow-hidden h-full shadow-md rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                  <div className="w-full max-w-xs md:max-w-xs lg:max-w-xs object-cover h-3/6 bg-gray-400 animate-pulse"></div>
                  <div className="p-4">
                    <h5 className="mb-2 text-md font-semibold text-gray-800 font-roboto truncate bg-gray-400 animate-pulse h-4 w-1/4"></h5>
                    <div className='flex justify-between font-roboto text-sm'>
                      <p className="mb-2 text-gray-700 bg-gray-400 animate-pulse h-4 w-1/4"></p>
                      <p className="mb-2 text-gray-700 bg-gray-400 animate-pulse h-4 w-1/4"></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ShimmerCards;
