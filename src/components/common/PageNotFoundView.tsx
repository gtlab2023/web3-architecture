import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
          <h2 className="mt-4 text-4xl font-bold text-gray-900">页面未找到</h2>
          <p className="mt-2 text-lg text-gray-600">
            抱歉，我们似乎无法找到您要查找的页面。
          </p>
        </div>

        <div className="mt-8">
          
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            返回首页
          </Link>
        </div>

        <div className="mt-6">
          <p className="text-base text-gray-500">
            如果您认为这是一个错误，请
            <a href="/contact" className="text-blue-600 hover:text-blue-500">
              联系我们
            </a>
            。
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
