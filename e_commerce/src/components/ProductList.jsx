
import { FiPlus } from 'react-icons/fi';

const products = [
  { id: 1, name: 'Product 1', price: 100, image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
  { id: 2, name: 'Product 2', price: 200, image: 'data:image/jpeg;base64,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' },
  { id: 3, name: 'Product 3', price: 300, image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/66fb40da-e5dd-4624-a6de-8e6e48ea177a/waffle-debut-vintage-womens-shoes-rfRkv2.png' },
];

const ProductList = () => {
  return (
    <div className='min-h-screen min-w-full overflow-hidden'>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id} className="group relative border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="font-bold text-lg mb-2">{product.name}</h2>
            <p className="text-gray-700">${product.price}</p>
          </div>
          <button className="absolute top-0 right-0 p-2 m-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none hidden group-hover:block">
            <FiPlus className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>

    </div>
    
   
  );
};

export default ProductList;
